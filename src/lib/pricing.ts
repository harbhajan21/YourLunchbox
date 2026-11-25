import { getAddOn } from "@/data/addons";
import { getPlan } from "@/data/plans";
import { findPromo } from "@/data/promos";
import { serviceArea } from "@/data/serviceArea";

export type Quantities = Record<string, number>;

export interface Quote {
  mealCount: number;
  pricePerMeal: number;
  mealsRegular: number;
  mealDiscount: number;
  addOns: number;
  subtotal: number;
  tax: number;
  taxLabel: string;
  total: number;
  /** What this exact first box would cost with no promo. */
  regularTotal: number;
  savings: number;
  /** Recurring weekly total, tax in. Add-ons are one-time. */
  weeklyTotal: number;
}

const cents = (n: number) => Math.round(n * 100) / 100;

export function quote(input: { planId: string; addOns: Quantities; promoCode: string | null }): Quote {
  const plan = getPlan(input.planId);
  const promo = findPromo(input.promoCode);

  const mealsRegular = cents(plan.meals * plan.pricePerMeal);
  const mealDiscount = cents(mealsRegular * (promo?.mealDiscount ?? 0));
  const addOns = cents(Object.entries(input.addOns).reduce((s, [id, q]) => s + (getAddOn(id)?.price ?? 0) * q, 0));

  const subtotal = cents(mealsRegular - mealDiscount + addOns);
  const tax = cents(subtotal * serviceArea.taxRate);
  const total = cents(subtotal + tax);
  const regularTotal = cents((mealsRegular + addOns) * (1 + serviceArea.taxRate));
  const weeklyTotal = cents(mealsRegular * (1 + serviceArea.taxRate));

  return {
    mealCount: plan.meals, pricePerMeal: plan.pricePerMeal, mealsRegular, mealDiscount, addOns,
    subtotal, tax, taxLabel: serviceArea.taxLabel, total, regularTotal,
    savings: cents(regularTotal - total), weeklyTotal,
  };
}
