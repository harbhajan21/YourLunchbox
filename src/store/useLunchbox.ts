"use client";

import { useSyncExternalStore } from "react";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { DEFAULT_PLAN_ID, getPlan } from "@/data/plans";
import { findPromo, LAUNCH_PROMO } from "@/data/promos";
import type { Preference } from "@/data/types";
import { addDays, firstDelivery, isPastDay, type DeliveryDay } from "@/lib/delivery";
import { autoFill, countOf, defaultFilters, type MenuFilters } from "@/lib/meals";
import type { MacroProfile } from "@/lib/macros";
import type { Quantities, Quote } from "@/lib/pricing";
import type { Account } from "@/lib/schemas";

export type Step = 1 | 2 | 3 | 4;

export interface Order {
  id: string;
  placedAt: string;
  deliveryDate: string;
  planId: string;
  selections: Quantities;
  addOns: Quantities;
  price: Quote;
  account: Account;
  postal: string;
  deliveryDay: DeliveryDay;
  instructions: string;
  promoCode: string | null;
}

export interface Week {
  date: string;
  selections: Quantities;
  skipped: boolean;
}

export interface Subscription {
  status: "active" | "paused" | "cancelled";
  planId: string;
  deliveryDay: DeliveryDay;
  preferences: Preference[];
  name: string;
  weeks: Week[];
  past: Week[];
  demo: boolean;
}

interface State {
  promoDismissed: boolean;
  step: Step;
  preferences: Preference[];
  planId: string;
  postal: string;
  email: string;
  deliveryDay: DeliveryDay;
  instructions: string;
  selections: Quantities;
  addOns: Quantities;
  promoCode: string | null;
  filters: MenuFilters;
  profile: MacroProfile;
  order: Order | null;
  subscription: Subscription | null;
}

interface Actions {
  set: (patch: Partial<State>) => void;
  setFilters: (patch: Partial<MenuFilters>) => void;
  togglePreference: (p: Preference) => void;
  addMeal: (id: string) => void;
  removeMeal: (id: string) => void;
  changeAddOn: (id: string, delta: number) => void;
  fillBox: () => void;
  clearBox: () => void;
  applyPromo: (code: string) => boolean;
  placeOrder: (order: Order) => void;
  startDemo: () => void;
  syncWeeks: () => void;
  setStatus: (s: Subscription["status"]) => void;
  toggleSkip: (date: string) => void;
  swapMeal: (date: string, from: string, to: string) => void;
}

const initial: State = {
  promoDismissed: false,
  step: 1,
  preferences: ["high-protein"],
  planId: DEFAULT_PLAN_ID,
  postal: "",
  email: "",
  deliveryDay: "sunday",
  instructions: "",
  selections: {},
  addOns: {},
  promoCode: LAUNCH_PROMO.code,
  filters: defaultFilters,
  profile: { weightKg: 80, goal: "build", sessions: 4 },
  order: null,
  subscription: null,
};

function bump(q: Quantities, id: string, delta: number): Quantities {
  const n = (q[id] ?? 0) + delta;
  const next = { ...q };
  if (n > 0) next[id] = n;
  else delete next[id];
  return next;
}

const SCHEDULE_WEEKS = 4;

function buildWeeks(first: string, size: number, prefs: Preference[], box: Quantities | null): Week[] {
  return Array.from({ length: SCHEDULE_WEEKS }, (_, i) => ({
    date: addDays(first, i * 7),
    selections: i === 0 && box ? box : autoFill({}, size, prefs, []),
    skipped: false,
  }));
}

const nextIn = <T,>(list: readonly T[], v: T): T[] => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

export const useLunchbox = create<State & Actions>()(
  persist(
    (set, get) => {
      const patchWeek = (date: string, fn: (w: Week) => Week) => {
        const sub = get().subscription;
        if (sub) set({ subscription: { ...sub, weeks: sub.weeks.map((w) => (w.date === date ? fn(w) : w)) } });
      };
      return {
        ...initial,
        set: (patch) => set(patch),
        setFilters: (patch) => set((s) => ({ filters: { ...s.filters, ...patch } })),
        togglePreference: (p) => set((s) => ({ preferences: nextIn(s.preferences, p) })),
        addMeal: (id) =>
          set((s) => (countOf(s.selections) < getPlan(s.planId).meals ? { selections: bump(s.selections, id, 1) } : s)),
        removeMeal: (id) => set((s) => ({ selections: bump(s.selections, id, -1) })),
        changeAddOn: (id, delta) => set((s) => ({ addOns: bump(s.addOns, id, delta) })),
        fillBox: () =>
          set((s) => ({ selections: autoFill(s.selections, getPlan(s.planId).meals, s.preferences, s.filters.exclude) })),
        clearBox: () => set({ selections: {} }),
        applyPromo: (code) => {
          const promo = findPromo(code);
          if (promo) set({ promoCode: promo.code });
          return !!promo;
        },
        placeOrder: (order) =>
          set((s) => ({
            order,
            subscription: {
              status: "active", planId: order.planId, deliveryDay: order.deliveryDay, preferences: s.preferences,
              name: order.account.name, past: [], demo: false,
              weeks: buildWeeks(order.deliveryDate, getPlan(order.planId).meals, s.preferences, order.selections),
            },
            selections: {}, addOns: {}, step: 1,
          })),
        startDemo: () => {
          const first = firstDelivery("sunday", new Date());
          const size = getPlan(DEFAULT_PLAN_ID).meals;
          const prefs: Preference[] = ["high-protein"];
          set({
            subscription: {
              status: "active", planId: DEFAULT_PLAN_ID, deliveryDay: "sunday", preferences: prefs, name: "Sam Demo", demo: true,
              weeks: buildWeeks(first, size, prefs, null),
              past: [
                { date: addDays(first, -7), selections: autoFill({}, size, ["chefs-choice"], []), skipped: false },
                { date: addDays(first, -14), selections: autoFill({}, size, ["calorie-smart"], []), skipped: false },
                { date: addDays(first, -21), selections: autoFill({}, size, ["keto"], []), skipped: true },
              ],
            },
          });
        },
        /** Roll delivered weeks into history and keep the schedule four weeks long. */
        syncWeeks: () => {
          const sub = get().subscription;
          if (!sub) return;
          const now = new Date();
          const gone = sub.weeks.filter((w) => isPastDay(w.date, now));
          if (gone.length === 0) return;
          const weeks = sub.weeks.filter((w) => !isPastDay(w.date, now));
          const size = getPlan(sub.planId).meals;
          let next = weeks.at(-1)?.date ?? firstDelivery(sub.deliveryDay, now);
          if (weeks.length === 0) next = addDays(next, -7);
          while (weeks.length < SCHEDULE_WEEKS) {
            next = addDays(next, 7);
            weeks.push({ date: next, selections: autoFill({}, size, sub.preferences, []), skipped: false });
          }
          const delivered = gone.map((w) => (sub.status === "active" ? w : { ...w, skipped: true }));
          set({ subscription: { ...sub, weeks, past: [...delivered.reverse(), ...sub.past] } });
        },
        setStatus: (status) => {
          const sub = get().subscription;
          if (sub) set({ subscription: { ...sub, status } });
        },
        toggleSkip: (date) => patchWeek(date, (w) => ({ ...w, skipped: !w.skipped })),
        swapMeal: (date, from, to) =>
          patchWeek(date, (w) => (w.selections[from] ? { ...w, selections: bump(bump(w.selections, from, -1), to, 1) } : w)),
      };
    },
    {
      name: "yourlunchbox",
      version: 1,
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    },
  ),
);

/** False on the server and first client render; true once localStorage is loaded. */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    (cb) => useLunchbox.persist?.onFinishHydration(cb) ?? (() => {}),
    () => useLunchbox.persist?.hasHydrated() ?? false,
    () => false,
  );
}
