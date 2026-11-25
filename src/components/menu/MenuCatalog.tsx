"use client";

import { ArrowRight, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { getPlan } from "@/data/plans";
import { countOf, defaultFilters, filterMeals } from "@/lib/meals";
import { useHydrated, useLunchbox } from "@/store/useLunchbox";
import { button } from "../ui/button";
import { Sheet } from "../ui/Sheet";
import { FilterPanel, SortSelect } from "./FilterPanel";
import { MealGrid } from "./MealGrid";

export function MenuCatalog() {
  const hydrated = useHydrated();
  const stored = useLunchbox((s) => s.filters);
  const setFilters = useLunchbox((s) => s.setFilters);
  const picked = useLunchbox((s) => countOf(s.selections));
  const size = useLunchbox((s) => getPlan(s.planId).meals);
  const [sheet, setSheet] = useState(false);
  const filters = hydrated ? stored : defaultFilters;
  const list = filterMeals(filters);
  const activeCount = filters.preferences.length + filters.exclude.length;

  return (
    <div className="shell grid gap-10 pb-28 pt-8 lg:grid-cols-[16.5rem_1fr]">
      <aside className="hidden lg:block">
        <div className="sticky top-36"><FilterPanel /></div>
      </aside>
      <div>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <p role="status" className="font-semibold tabular-nums">{list.length} {list.length === 1 ? "meal" : "meals"}</p>
          <div className="flex flex-wrap items-center gap-2">
            <button type="button" onClick={() => setSheet(true)} className={button("outline", "sm", "lg:hidden")}><SlidersHorizontal className="size-4" /> Filters{activeCount > 0 && ` (${activeCount})`}</button>
            <SortSelect />
          </div>
        </div>
        {list.length > 0 ? (
          <MealGrid meals={list} pickable className="xl:grid-cols-3" />
        ) : (
          <div className="rounded-2xl border border-line bg-white p-10 text-center">
            <h2 className="text-2xl">No meals match all of that</h2>
            <p className="mb-5 mt-2 text-slate-warm">Raise the calorie limit or remove a filter.</p>
            <button type="button" onClick={() => setFilters(defaultFilters)} className={button("dark")}>Clear filters</button>
          </div>
        )}
      </div>
      <Sheet open={sheet} onClose={() => setSheet(false)} label="Filters">
        <div className="p-6 pt-16">
          <FilterPanel />
          <button type="button" onClick={() => setSheet(false)} className={button("dark", "md", "mt-8 w-full")}>Show {list.length} meals</button>
        </div>
      </Sheet>
      {hydrated && picked > 0 && (
        <div className="fixed inset-x-3 bottom-3 z-30 mx-auto flex max-w-lg items-center justify-between gap-3 rounded-full bg-forest-deep py-2 pl-6 pr-2 text-white shadow-lift">
          <p className="font-semibold tabular-nums">{picked} of {size} meals</p>
          <Link href="/build-box" className={button("primary", "sm")}>Continue box <ArrowRight className="size-4" /></Link>
        </div>
      )}
    </div>
  );
}
