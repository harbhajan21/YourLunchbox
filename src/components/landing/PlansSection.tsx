"use client";

import Link from "next/link";
import { plans } from "@/data/plans";
import { LAUNCH_PROMO } from "@/data/promos";
import { cx } from "@/lib/cx";
import { formatCad } from "@/lib/format";
import { useLunchbox } from "@/store/useLunchbox";
import { button } from "../ui/button";

export function PlansSection() {
  const set = useLunchbox((s) => s.set);
  return (
    <section id="plans" className="shell py-20 lg:py-24">
      <h2 className="text-4xl sm:text-5xl">Bigger box, smaller price</h2>
      <p className="mt-3 max-w-xl text-lg text-slate-warm">Your first box is half price with code {LAUNCH_PROMO.code}. Downtown delivery is always free.</p>
      <ul className="mt-10 grid gap-3">
        {plans.map((p) => (
          <li key={p.id} className={cx("grid grid-cols-[4.5rem_1fr] items-center gap-x-5 gap-y-4 rounded-3xl border p-5 sm:grid-cols-[7rem_1fr_auto_auto] sm:px-8", p.badge === "Most Popular" ? "border-forest bg-sage" : "border-line bg-white")}>
            <p className="font-display text-6xl font-extrabold leading-none tracking-tighter text-forest tabular-nums">{p.meals}</p>
            <div>
              <p className="text-lg font-semibold">meals a week {p.badge && <span className="ml-1 inline-block rounded-full bg-saffron px-2.5 py-0.5 text-xs font-bold">{p.badge}</span>}</p>
              <p className="text-slate-warm">{p.blurb}</p>
            </div>
            <p className="tabular-nums sm:text-right">
              <span className="font-display text-2xl font-bold">{formatCad(p.pricePerMeal * (1 - LAUNCH_PROMO.mealDiscount))}</span>
              <span className="block text-sm text-slate-warm">a meal, then {formatCad(p.pricePerMeal)}</span>
            </p>
            <Link href="/build-box" onClick={() => set({ planId: p.id, step: 1 })} className={button(p.badge === "Most Popular" ? "primary" : "outline", "md", "max-sm:w-full")}>Choose {p.meals}<span className="sr-only"> meals</span></Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
