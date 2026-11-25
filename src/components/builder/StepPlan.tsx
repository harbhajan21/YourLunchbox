"use client";

import { Check } from "lucide-react";
import { plans, preferenceInfo } from "@/data/plans";
import { findPromo } from "@/data/promos";
import { PREFERENCES } from "@/data/types";
import { cx } from "@/lib/cx";
import { formatCad } from "@/lib/format";
import { useLunchbox } from "@/store/useLunchbox";

export function StepPlan() {
  const { preferences, planId, promoCode, togglePreference, set } = useLunchbox();
  const off = 1 - (findPromo(promoCode)?.mealDiscount ?? 0);
  return (
    <div className="space-y-12">
      <section>
        <h1 className="text-4xl sm:text-5xl">How do you eat?</h1>
        <p className="mb-5 mt-2 text-slate-warm">Pick any that fit. We use these to sort the menu and fill your box.</p>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {PREFERENCES.map((p) => {
            const on = preferences.includes(p);
            return (
              <button key={p} type="button" aria-pressed={on} onClick={() => togglePreference(p)} className={cx("flex items-center justify-between gap-3 rounded-2xl border p-4 text-left transition", on ? "border-forest bg-sage ring-1 ring-forest" : "border-line bg-white hover:border-forest")}>
                <span><b className="block font-display text-lg">{preferenceInfo[p].label}</b><span className="text-sm text-slate-warm">{preferenceInfo[p].detail}</span></span>
                <span className={cx("grid size-6 shrink-0 place-items-center rounded-full border", on ? "border-forest bg-forest text-white" : "border-line-strong")}>{on && <Check className="size-4" />}</span>
              </button>
            );
          })}
        </div>
      </section>
      <fieldset>
        <legend className="mb-5 font-display text-3xl font-bold tracking-tight">How many meals a week?</legend>
        <div className="grid gap-3">
          {plans.map((p) => {
            const on = p.id === planId;
            return (
              <label key={p.id} className={cx("flex cursor-pointer items-center gap-4 rounded-2xl border p-4 transition has-focus-visible:outline-2 has-focus-visible:outline-saffron sm:px-6", on ? "border-forest bg-sage ring-1 ring-forest" : "border-line bg-white hover:border-forest")}>
                <input type="radio" name="plan" checked={on} onChange={() => set({ planId: p.id })} className="size-5 shrink-0 accent-forest" />
                <span className="w-12 font-display text-4xl font-extrabold tracking-tighter text-forest tabular-nums">{p.meals}</span>
                <span className="flex-1"><b className="block">meals / week</b>{p.badge && <span className="mt-1 inline-block rounded-full bg-saffron px-2.5 py-0.5 text-xs font-bold">{p.badge}</span>}</span>
                <span className="text-right tabular-nums">
                  <span className="block font-display text-xl font-bold">{formatCad(p.pricePerMeal * off)}</span>
                  <span className="text-sm text-slate-warm">{off < 1 && <s className="mr-1">{formatCad(p.pricePerMeal)}</s>}/ meal</span>
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>
    </div>
  );
}
