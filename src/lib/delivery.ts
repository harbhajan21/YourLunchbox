export type DeliveryDay = "sunday" | "wednesday";
const DOW: Record<DeliveryDay, number> = { sunday: 0, wednesday: 3 };
const MS_DAY = 86_400_000;

/** Today's calendar date in Toronto as a UTC-midnight timestamp. */
function torontoToday(now: Date): number {
  const iso = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Toronto", year: "numeric", month: "2-digit", day: "2-digit" }).format(now);
  return Date.parse(`${iso}T00:00:00Z`);
}
const toIso = (ms: number) => new Date(ms).toISOString().slice(0, 10);

export function addDays(iso: string, days: number): string {
  return toIso(Date.parse(`${iso}T00:00:00Z`) + days * MS_DAY);
}

/**
 * Orders close Wednesday 11:59 PM Eastern. An order ships on the Sunday after
 * that cutoff, or on the Wednesday one week after it.
 */
export function firstDelivery(day: DeliveryDay, now: Date): string {
  const today = torontoToday(now);
  const dow = new Date(today).getUTCDay();
  const cutoff = today + ((3 - dow + 7) % 7) * MS_DAY;
  return toIso(cutoff + (DOW[day] === 0 ? 4 : 7) * MS_DAY);
}

/** The Wednesday by which a given delivery must be changed. */
export function cutoffFor(deliveryIso: string): string {
  const dow = new Date(`${deliveryIso}T00:00:00Z`).getUTCDay();
  return addDays(deliveryIso, dow === 0 ? -4 : -7);
}

/** True once the cutoff date has fully passed in Toronto. */
export function isLocked(deliveryIso: string, now: Date): boolean {
  return torontoToday(now) > Date.parse(`${cutoffFor(deliveryIso)}T00:00:00Z`);
}

export const isPastDay = (iso: string, now: Date): boolean => Date.parse(`${iso}T00:00:00Z`) < torontoToday(now);
