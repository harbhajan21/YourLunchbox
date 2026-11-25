"use client";

import Link from "next/link";
import { cx } from "@/lib/cx";
import { goalInfo, targets, type Goal } from "@/lib/macros";
import { useHydrated, useLunchbox } from "@/store/useLunchbox";
import { button } from "../ui/button";

const fallback = { weightKg: 80, goal: "build", sessions: 4 } as const;
const AVG_PROTEIN = 44;

export function MacroCalculator() {
  const hydrated = useHydrated();
  const stored = useLunchbox((s) => s.profile);
  const set = useLunchbox((s) => s.set);
  const p = hydrated ? stored : fallback;
  const target = targets(p);
  const share = Math.min(100, Math.round(((AVG_PROTEIN * 2) / target.protein) * 100));

  return (
    <section id="macros" className="bg-forest text-white">
      <div className="shell grid gap-12 py-20 lg:grid-cols-2 lg:items-center lg:gap-20 lg:py-24">
        <div>
          <h2 className="text-4xl sm:text-5xl">How much protein do you need?</h2>
          <p className="mt-4 max-w-md text-lg text-sage">Set your numbers. We&apos;ll carry the target into your box, so you see how each pick counts.</p>
          <div className="mt-8 space-y-7">
            <div>
              <label htmlFor="weight" className="flex justify-between font-semibold">Body weight <span className="tabular-nums">{p.weightKg} kg / {Math.round(p.weightKg * 2.2046)} lb</span></label>
              <input id="weight" type="range" min={45} max={140} value={p.weightKg} onChange={(e) => set({ profile: { ...p, weightKg: Number(e.target.value) } })} className="mt-2 h-8 w-full accent-saffron" />
            </div>
            <div>
              <label htmlFor="sessions" className="flex justify-between font-semibold">Training sessions a week <span className="tabular-nums">{p.sessions}</span></label>
              <input id="sessions" type="range" min={0} max={7} value={p.sessions} onChange={(e) => set({ profile: { ...p, sessions: Number(e.target.value) } })} className="mt-2 h-8 w-full accent-saffron" />
            </div>
            <div className="grid grid-cols-3 gap-2" role="group" aria-label="Goal">
              {(Object.keys(goalInfo) as Goal[]).map((g) => (
                <button key={g} type="button" aria-pressed={p.goal === g} onClick={() => set({ profile: { ...p, goal: g } })}
                  className={cx("h-12 rounded-full border font-semibold transition", p.goal === g ? "border-saffron bg-saffron text-espresso" : "border-white/40 hover:bg-white/10")}>
                  {goalInfo[g].label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="rounded-[2rem] bg-alabaster p-7 text-espresso sm:p-10" aria-live="polite">
          <p className="font-display text-[clamp(5rem,12vw,8rem)] font-extrabold leading-[0.85] tracking-tighter text-forest tabular-nums">{target.protein}<span className="text-4xl">g</span></p>
          <p className="mt-3 text-lg">protein a day, on about <b className="tabular-nums">{target.calories.toLocaleString("en-CA")} kcal</b></p>
          <div className="mt-7 h-4 overflow-hidden rounded-full bg-line"><div className="h-full rounded-full bg-saffron transition-[width] duration-500" style={{ width: `${share}%` }} /></div>
          <p className="mt-3">Two lunchboxes cover about <b className="tabular-nums">{share}%</b> of that.</p>
          <Link href="/build-box" className={button("primary", "lg", "mt-7 w-full")}>Build Your Box</Link>
          <p className="mt-4 text-sm text-slate-warm">Estimate only, at {goalInfo[p.goal].proteinPerKg} g per kg of body weight. Not medical advice.</p>
        </div>
      </div>
    </section>
  );
}
