import type { Promo } from "./types";

export const promos: Promo[] = [
  { code: "LUNCH50", label: "50% off your first box", mealDiscount: 0.5 },
];
export const LAUNCH_PROMO = promos[0];
export const findPromo = (code: string | null): Promo | undefined =>
  code ? promos.find((p) => p.code === code.trim().toUpperCase()) : undefined;
