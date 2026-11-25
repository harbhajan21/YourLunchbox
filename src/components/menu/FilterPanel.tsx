"use client";

import { preferenceInfo } from "@/data/plans";
import { ALLERGENS, PREFERENCES } from "@/data/types";
import { cx } from "@/lib/cx";
import { CALORIE_MAX, CALORIE_MIN, defaultFilters, type SortKey } from "@/lib/meals";
import { useLunchbox } from "@/store/useLunchbox";

const chip = (on: boolean) =>
  cx("h-10 rounded-full border px-3.5 text-sm font-medium transition", on ? "border-forest bg-forest text-white" : "border-line bg-white hover:border-forest");

const toggle = <T,>(list: T[], v: T): T[] => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

export function FilterPanel() {
  const f = useLunchbox((s) => s.filters);
  const setFilters = useLunchbox((s) => s.setFilters);
  const { sort: _sort, ...clean } = defaultFilters;
  void _sort;
  const active = f.preferences.length + f.exclude.length + (f.maxCalories < CALORIE_MAX ? 1 : 0);

  return (
    <div className="space-y-7">
      <fieldset>
        <legend className="mb-2.5 font-display font-bold">Dietary preference</legend>
        <div className="flex flex-wrap gap-2">
          {PREFERENCES.map((p) => (
            <button key={p} type="button" aria-pressed={f.preferences.includes(p)} onClick={() => setFilters({ preferences: toggle(f.preferences, p) })} className={chip(f.preferences.includes(p))}>
              {preferenceInfo[p].label}
            </button>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend className="mb-2.5 font-display font-bold">Leave out</legend>
        <div className="flex flex-wrap gap-2">
          {ALLERGENS.map((a) => (
            <button key={a} type="button" aria-pressed={f.exclude.includes(a)} onClick={() => setFilters({ exclude: toggle(f.exclude, a) })} className={cx(chip(f.exclude.includes(a)), f.exclude.includes(a) && "line-through")}>
              {a}
            </button>
          ))}
        </div>
      </fieldset>
      <div>
        <label htmlFor="cal" className="flex justify-between font-display font-bold">
          Calories <span className="font-sans text-sm font-medium tabular-nums text-slate-warm">up to {f.maxCalories} kcal</span>
        </label>
        <input id="cal" type="range" min={CALORIE_MIN} max={CALORIE_MAX} step={10} value={f.maxCalories} onChange={(e) => setFilters({ maxCalories: Number(e.target.value) })} className="mt-2 h-8 w-full accent-forest" />
      </div>
      {active > 0 && (
        <button type="button" onClick={() => setFilters(clean)} className="text-sm font-semibold text-saffron-ink underline underline-offset-4">Clear {active} {active === 1 ? "filter" : "filters"}</button>
      )}
    </div>
  );
}

export function SortSelect() {
  const sort = useLunchbox((s) => s.filters.sort);
  const setFilters = useLunchbox((s) => s.setFilters);
  return (
    <label className="inline-flex items-center gap-2 text-sm">
      <span className="text-slate-warm">Sort by</span>
      <select value={sort} onChange={(e) => setFilters({ sort: e.target.value as SortKey })} className="h-11 rounded-full border border-line-strong bg-white px-4 text-sm font-semibold">
        <option value="popular">Most popular</option>
        <option value="protein">Highest protein</option>
        <option value="calories">Lowest calorie</option>
      </select>
    </label>
  );
}
