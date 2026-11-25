import type { Plan, Preference } from "./types";

export const plans: Plan[] = [
  { id: "box-6", meals: 6, pricePerMeal: 15.99, blurb: "Cover your busiest days" },
  { id: "box-8", meals: 8, pricePerMeal: 14.79, blurb: "Lunches plus training nights" },
  { id: "box-10", meals: 10, pricePerMeal: 13.99, badge: "Most Popular", blurb: "Lunch and dinner, Monday to Friday" },
  { id: "box-12", meals: 12, pricePerMeal: 13.49, blurb: "Workweek, plus the weekend" },
  { id: "box-16", meals: 16, pricePerMeal: 12.49, badge: "Best Value", blurb: "Full prep. Never cook again" },
];

export const DEFAULT_PLAN_ID = "box-10";
export const getPlan = (id: string): Plan => plans.find((p) => p.id === id) ?? plans[2];

export const preferenceInfo: Record<Preference, { label: string; detail: string }> = {
  "chefs-choice": { label: "Chef's Choice", detail: "Our kitchen's favourites" },
  "high-protein": { label: "High Protein", detail: "40 g or more per meal" },
  "calorie-smart": { label: "Calorie Smart", detail: "Under 550 kcal" },
  keto: { label: "Keto", detail: "15 g net carbs or less" },
  vegetarian: { label: "Vegetarian", detail: "No meat, no fish" },
};
