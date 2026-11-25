"use client";

import { getMeal, meals } from "@/data/meals";
import { button } from "../ui/button";
import { FoodImage } from "../ui/FoodImage";
import { Sheet } from "../ui/Sheet";

export function SwapSheet({ from, onClose, onPick }: { from: string | null; onClose: () => void; onPick: (to: string) => void }) {
  const current = from ? getMeal(from) : undefined;
  return (
    <Sheet open={!!current} onClose={onClose} label="Swap meal">
      <div className="p-6 pt-8">
        <h2 className="pr-12 text-3xl">Swap {current?.name}</h2>
        <p className="mt-2 text-slate-warm">Replaces one portion. Protein difference shown on each meal.</p>
        <ul className="mt-5 divide-y divide-line">
          {meals.filter((m) => m.id !== from).map((m) => {
            const diff = m.nutrition.protein - (current?.nutrition.protein ?? 0);
            return (
              <li key={m.id} className="flex items-center gap-3 py-3">
                <div className="relative size-16 shrink-0 overflow-hidden rounded-xl"><FoodImage src={m.image} alt="" sizes="64px" /></div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base">{m.name}</h3>
                  <p className="text-sm tabular-nums text-slate-warm">{m.nutrition.protein} g protein ({diff > 0 ? "+" : diff < 0 ? "−" : "±"}{Math.abs(diff)}) · {m.nutrition.calories} kcal</p>
                </div>
                <button type="button" onClick={() => onPick(m.id)} className={button("outline", "sm")}>Swap in<span className="sr-only"> {m.name}</span></button>
              </li>
            );
          })}
        </ul>
      </div>
    </Sheet>
  );
}
