import { getMeal, meals } from "@/data/meals";
import type { Allergen, Meal, Preference } from "@/data/types";
import type { Quantities } from "./pricing";

export type SortKey = "popular" | "protein" | "calories";
export const CALORIE_MAX = 800;
export const CALORIE_MIN = 350;

export interface MenuFilters {
  preferences: Preference[];
  exclude: Allergen[];
  maxCalories: number;
  sort: SortKey;
}
export const defaultFilters: MenuFilters = { preferences: [], exclude: [], maxCalories: CALORIE_MAX, sort: "popular" };

export function filterMeals(f: MenuFilters): Meal[] {
  const out = meals.filter(
    (m) =>
      f.preferences.every((p) => m.preferences.includes(p)) &&
      !f.exclude.some((a) => m.allergens.includes(a)) &&
      m.nutrition.calories <= f.maxCalories,
  );
  return out.sort((a, b) =>
    f.sort === "protein" ? b.nutrition.protein - a.nutrition.protein
    : f.sort === "calories" ? a.nutrition.calories - b.nutrition.calories
    : b.popularity - a.popularity,
  );
}

export const countOf = (q: Quantities): number => Object.values(q).reduce((s, n) => s + n, 0);

/** Fill remaining slots: matches the chosen preferences first, spreads variety, then repeats. */
export function autoFill(current: Quantities, size: number, prefs: Preference[], exclude: Allergen[]): Quantities {
  const next: Quantities = { ...current };
  const vegetarian = prefs.includes("vegetarian");
  const pool = meals.filter(
    (m) => !exclude.some((a) => m.allergens.includes(a)) && (!vegetarian || m.preferences.includes("vegetarian")),
  );
  if (pool.length === 0) return next;
  const score = (m: Meal) => prefs.filter((p) => m.preferences.includes(p)).length * 100 + m.popularity;
  for (let left = size - countOf(next); left > 0; left--) {
    const pick = [...pool].sort((a, b) => score(b) - (next[b.id] ?? 0) * 150 - (score(a) - (next[a.id] ?? 0) * 150))[0];
    next[pick.id] = (next[pick.id] ?? 0) + 1;
  }
  return next;
}

export function sumNutrition(q: Quantities) {
  const t = { calories: 0, protein: 0, carbs: 0, fat: 0, count: 0 };
  for (const [id, n] of Object.entries(q)) {
    const m = getMeal(id);
    if (!m) continue;
    t.count += n;
    t.calories += m.nutrition.calories * n;
    t.protein += m.nutrition.protein * n;
    t.carbs += m.nutrition.carbs * n;
    t.fat += m.nutrition.fat * n;
  }
  return t;
}
