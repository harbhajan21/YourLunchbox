"use client";

import { getMeal } from "@/data/meals";
import { targets } from "@/lib/macros";
import { sumNutrition } from "@/lib/meals";
import type { Quantities } from "@/lib/pricing";
import { useLunchbox } from "@/store/useLunchbox";

export function NutritionSummary({ selections }: { selections: Quantities }) {
  const profile = useLunchbox((s) => s.profile);
  const n = sumNutrition(selections);
  if (n.count === 0) return null;
  const avg = (v: number) => Math.round(v / n.count);
  const target = targets(profile).protein;
  const days = Math.round(((n.protein / (target * 7)) * 100));
  const bars = Object.entries(selections)
    .flatMap(([id, qty]) => { const m = getMeal(id); return m ? [{ name: m.name, qty, protein: m.nutrition.protein }] : []; })
    .sort((a, b) => b.protein - a.protein);
  const max = Math.max(...bars.map((b) => b.protein));
  const energy = n.protein * 4 + n.carbs * 4 + n.fat * 9;
  const split = [
    { k: "Protein", v: Math.round((n.protein * 400) / energy), g: avg(n.protein) },
    { k: "Carbs", v: Math.round((n.carbs * 400) / energy), g: avg(n.carbs) },
    { k: "Fat", v: Math.round((n.fat * 900) / energy), g: avg(n.fat) },
  ];

  return (
    <section className="rounded-3xl border border-line bg-white p-6 sm:p-8">
      <h2 className="text-2xl">Nutrition in this box</h2>
      <div className="mt-5 grid gap-8 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="font-display text-6xl font-extrabold leading-none tracking-tighter text-forest tabular-nums">{n.protein}<span className="text-2xl">g</span></p>
          <p className="mt-2 text-slate-warm">total protein, <b className="text-espresso tabular-nums">{days}%</b> of a week at {target} g a day</p>
          <dl className="mt-6 space-y-2 tabular-nums">
            <div className="flex justify-between border-b border-line pb-2"><dt className="text-slate-warm">Average meal</dt><dd className="font-semibold">{avg(n.calories)} kcal</dd></div>
            {split.map((s) => <div key={s.k} className="flex justify-between border-b border-line pb-2"><dt className="text-slate-warm">{s.k}</dt><dd><b>{s.g} g</b> <span className="text-slate-warm">{s.v}% of energy</span></dd></div>)}
          </dl>
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold">Protein per meal</p>
          <ul className="space-y-2.5">
            {bars.map((b) => (
              <li key={b.name}>
                <div className="flex justify-between gap-3 text-sm"><span className="truncate">{b.name}{b.qty > 1 && <span className="text-slate-warm"> × {b.qty}</span>}</span><b className="tabular-nums">{b.protein} g</b></div>
                <div className="mt-1 h-2 rounded-full bg-sand"><div className="h-full rounded-full bg-forest" style={{ width: `${(b.protein / max) * 100}%` }} /></div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
