"use client";

import { SlidersHorizontal, Wand2 } from "lucide-react";
import { useState } from "react";
import { getPlan } from "@/data/plans";
import { countOf, filterMeals, sumNutrition } from "@/lib/meals";
import { targets } from "@/lib/macros";
import { useLunchbox } from "@/store/useLunchbox";
import { FilterPanel, SortSelect } from "../menu/FilterPanel";
import { MealGrid } from "../menu/MealGrid";
import { button } from "../ui/button";
import { Sheet } from "../ui/Sheet";
import { SlotMeter } from "./SlotMeter";

export function remainingMessage(picked: number, size: number): string {
  const left = size - picked;
  if (left === 0) return "Your box is full. Ready when you are.";
  if (left < 0) return `Remove ${-left} ${left === -1 ? "meal" : "meals"} to fit your plan.`;
  return `Add ${left} more ${left === 1 ? "meal" : "meals"} to continue.`;
}

export function StepFill({ showErrors, onAddOns }: { showErrors: boolean; onAddOns: () => void }) {
  const { selections, planId, preferences, filters, profile, fillBox, clearBox } = useLunchbox();
  const [sheet, setSheet] = useState(false);
  const size = getPlan(planId).meals;
  const picked = countOf(selections);
  const n = sumNutrition(selections);
  const perMeal = n.count ? Math.round(n.protein / n.count) : 0;
  const target = targets(profile).protein;
  const match = (prefs: string[]) => preferences.filter((p) => prefs.includes(p)).length;
  const list = filterMeals(filters);
  if (filters.sort === "popular") list.sort((a, b) => match(b.preferences) - match(a.preferences) || b.popularity - a.popularity);
  const activeFilters = filters.preferences.length + filters.exclude.length;

  return (
    <div>
      <h1 className="text-4xl sm:text-5xl">Fill your box</h1>
      <div className="sticky top-[4.6rem] z-20 -mx-5 mb-6 mt-4 border-b border-line bg-alabaster/97 px-5 py-3 sm:top-20">
        <div className="mb-2.5 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <div>
            <p role="status" className="font-display text-xl font-bold tabular-nums">Selected {picked} of {size} meals</p>
            <p className={showErrors && picked !== size ? "text-sm font-semibold text-danger" : "text-sm text-slate-warm"}>
              {picked > 0 && !showErrors ? <span className="tabular-nums">{perMeal} g protein per meal. Two a day covers {Math.min(100, Math.round((perMeal * 2 * 100) / target))}% of your {target} g target.</span> : remainingMessage(picked, size)}
            </p>
          </div>
          <div className="flex gap-2">
            {picked > 0 && <button type="button" onClick={clearBox} className={button("ghost", "sm")}>Clear</button>}
            <button type="button" disabled={picked >= size} onClick={fillBox} className={button("dark", "sm")}><Wand2 className="size-4" /> Auto-Fill My Box</button>
          </div>
        </div>
        <SlotMeter selections={selections} size={size} />
      </div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
        <button type="button" onClick={() => setSheet(true)} className={button("outline", "sm")}><SlidersHorizontal className="size-4" /> Filters{activeFilters > 0 && ` (${activeFilters})`}</button>
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" onClick={onAddOns} className={button("ghost", "sm")}>Browse add-ons</button>
          <SortSelect />
        </div>
      </div>
      {list.length ? <MealGrid meals={list} pickable className="xl:grid-cols-3" /> : <p className="rounded-2xl border border-line bg-white p-8 text-center">No meals match those filters. Open Filters to clear one.</p>}
      <Sheet open={sheet} onClose={() => setSheet(false)} label="Filters">
        <div className="p-6 pt-16"><FilterPanel /><button type="button" onClick={() => setSheet(false)} className={button("dark", "md", "mt-8 w-full")}>Show {list.length} meals</button></div>
      </Sheet>
    </div>
  );
}
