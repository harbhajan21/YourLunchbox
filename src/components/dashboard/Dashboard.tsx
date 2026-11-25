"use client";

import { CalendarX2, Pause, Play, Repeat2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getMeal } from "@/data/meals";
import { getPlan } from "@/data/plans";
import { cx } from "@/lib/cx";
import { cutoffFor, isLocked } from "@/lib/delivery";
import { formatCad, formatDay } from "@/lib/format";
import { sumNutrition } from "@/lib/meals";
import { useHydrated, useLunchbox, type Subscription } from "@/store/useLunchbox";
import { button } from "../ui/button";
import { FoodImage } from "../ui/FoodImage";
import { LogoMark } from "../ui/Logo";
import { NutritionSummary } from "./NutritionSummary";
import { SwapSheet } from "./SwapSheet";

const short = (iso: string) => formatDay(iso, { weekday: "short", month: "short", day: "numeric" });
const statusStyle = { active: "bg-sage text-forest", paused: "bg-saffron-soft text-saffron-ink", cancelled: "bg-line text-espresso" };
const statusLabel = { active: "Active", paused: "Paused", cancelled: "Cancelled" };

function Portal({ sub }: { sub: Subscription }) {
  const { setStatus, toggleSkip, swapMeal, syncWeeks } = useLunchbox();
  const [now] = useState(() => new Date());
  const [picked, setPicked] = useState<string | null>(null);
  const [swap, setSwap] = useState<string | null>(null);
  const [confirmCancel, setConfirmCancel] = useState(false);

  useEffect(() => syncWeeks(), [syncWeeks]);

  const plan = getPlan(sub.planId);
  const week = sub.weeks.find((w) => w.date === picked) ?? sub.weeks[0];
  if (!week) return null;
  const active = sub.status === "active";
  const locked = isLocked(week.date, now);
  const canEdit = active && !week.skipped && !locked;

  return (
    <div className="shell space-y-8 py-10 lg:py-14">
      {sub.demo && <p className="rounded-2xl bg-saffron-soft px-5 py-3 text-sm text-saffron-ink"><b>Preview account.</b> Sample subscription and delivery history. <Link href="/build-box" className="font-semibold underline">Build your own box</Link></p>}
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <span role="status" className={cx("inline-block rounded-full px-3 py-1 text-sm font-bold", statusStyle[sub.status])}>{statusLabel[sub.status]}</span>
          <h1 className="mt-3 text-4xl sm:text-5xl">Hi, {sub.name.split(" ")[0]}</h1>
          <p className="mt-2 text-slate-warm">{plan.meals} meals a week at {formatCad(plan.pricePerMeal)}, delivered {sub.deliveryDay === "sunday" ? "Sundays" : "Wednesdays"}</p>
        </div>
        {active ? (
          <button type="button" onClick={() => setStatus("paused")} className={button("outline")}><Pause className="size-4" /> Pause Subscription</button>
        ) : (
          <button type="button" onClick={() => { setStatus("active"); setConfirmCancel(false); }} className={button("primary")}><Play className="size-4" /> {sub.status === "paused" ? "Resume Subscription" : "Restart Subscription"}</button>
        )}
      </div>

      <div className="no-scrollbar -mx-5 flex gap-3 overflow-x-auto px-5 py-1" role="group" aria-label="Upcoming deliveries">
        {sub.weeks.map((w) => (
          <button key={w.date} type="button" aria-pressed={w.date === week.date} onClick={() => setPicked(w.date)} className={cx("min-w-36 shrink-0 rounded-2xl border p-4 text-left transition", w.date === week.date ? "border-forest bg-forest text-white" : "border-line bg-white hover:border-forest")}>
            <span className="block font-display text-lg font-bold">{short(w.date)}</span>
            <span className="text-sm">{!active ? statusLabel[sub.status] : w.skipped ? "Skipped" : isLocked(w.date, now) ? "Being cooked" : "Scheduled"}</span>
          </button>
        ))}
      </div>

      <section className="rounded-3xl border border-line bg-white p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl">{formatDay(week.date)}</h2>
            <p className="mt-1 text-slate-warm">
              {!active ? `Your subscription is ${sub.status}. Nothing will be sent or charged.` : week.skipped ? "You're skipping this week. Nothing will be sent or charged." : locked ? "This box is locked in and being cooked." : `Make changes until ${short(cutoffFor(week.date))}, 11:59 PM ET.`}
            </p>
          </div>
          <button type="button" disabled={!active || locked} onClick={() => toggleSkip(week.date)} className={button(week.skipped ? "dark" : "outline", "sm")}>
            <CalendarX2 className="size-4" /> {week.skipped ? "Unskip This Week" : "Skip This Week"}
          </button>
        </div>
        <ul className={cx("mt-6 grid gap-x-8 sm:grid-cols-2", (week.skipped || !active) && "opacity-50")}>
          {Object.entries(week.selections).map(([id, n]) => {
            const m = getMeal(id);
            return m && (
              <li key={id} className="flex items-center gap-4 border-b border-line py-3">
                <div className="relative size-16 shrink-0 overflow-hidden rounded-2xl"><FoodImage src={m.image} alt="" sizes="64px" /></div>
                <div className="min-w-0 flex-1"><h3 className="text-base leading-snug">{m.name}</h3><p className="text-sm tabular-nums text-slate-warm">{n} × {m.nutrition.protein} g protein</p></div>
                <button type="button" disabled={!canEdit} onClick={() => setSwap(id)} aria-label={`Swap ${m.name}`} className={button("ghost", "sm")}><Repeat2 className="size-4" /> Swap</button>
              </li>
            );
          })}
        </ul>
      </section>

      <NutritionSummary selections={week.selections} />

      <section>
        <h2 className="text-2xl">Past deliveries</h2>
        {sub.past.length === 0 ? (
          <p className="mt-3 text-slate-warm">Your delivered boxes will show up here after {short(sub.weeks[0].date)}.</p>
        ) : (
          <ul className="mt-4 divide-y divide-line rounded-3xl border border-line bg-white px-6">
            {sub.past.map((w) => {
              const n = sumNutrition(w.selections);
              return (
                <li key={w.date} className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 py-4">
                  <span className="w-40 font-display font-bold">{short(w.date)}</span>
                  <span className="flex-1 text-sm tabular-nums text-slate-warm">{w.skipped ? "Nothing sent" : `${n.count} meals · ${n.protein} g protein · ${n.calories.toLocaleString("en-CA")} kcal`}</span>
                  <span className={cx("rounded-full px-3 py-1 text-sm font-semibold", w.skipped ? "bg-line" : "bg-sage text-forest")}>{w.skipped ? "Skipped" : "Delivered"}</span>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      {sub.status !== "cancelled" && (
        <div className="border-t border-line pt-6">
          {confirmCancel ? (
            <div className="flex flex-wrap items-center gap-3"><p className="font-semibold">Cancel your subscription?</p><button type="button" onClick={() => setStatus("cancelled")} className={button("dark", "sm")}>Yes, cancel</button><button type="button" onClick={() => setConfirmCancel(false)} className={button("outline", "sm")}>Keep it</button></div>
          ) : (
            <button type="button" onClick={() => setConfirmCancel(true)} className="py-2 text-sm font-semibold text-slate-warm underline underline-offset-4 hover:text-espresso">Cancel subscription</button>
          )}
        </div>
      )}
      <SwapSheet from={swap} onClose={() => setSwap(null)} onPick={(to) => { if (swap) swapMeal(week.date, swap, to); setSwap(null); }} />
    </div>
  );
}

export function Dashboard() {
  const hydrated = useHydrated();
  const sub = useLunchbox((s) => s.subscription);
  const startDemo = useLunchbox((s) => s.startDemo);
  if (!hydrated) return <div className="grid min-h-[60vh] place-items-center"><LogoMark className="size-16 animate-pulse" /></div>;
  if (sub) return <Portal sub={sub} />;
  return (
    <div className="shell grid min-h-[65vh] place-content-center justify-items-center gap-4 text-center">
      <LogoMark className="size-20" />
      <h1 className="text-4xl sm:text-5xl">No box on the way yet</h1>
      <p className="max-w-md text-slate-warm">Build your first box, or look around with a sample account.</p>
      <div className="mt-2 flex flex-wrap justify-center gap-3">
        <Link href="/build-box" className={button("primary")}>Build Your Box</Link>
        <button type="button" onClick={startDemo} className={button("outline")}>Preview a sample account</button>
      </div>
    </div>
  );
}
