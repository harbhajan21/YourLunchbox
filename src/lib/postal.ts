import { serviceArea } from "@/data/serviceArea";

/** Canada Post rules: no D, F, I, O, Q, U anywhere; no W or Z in first position. */
export const POSTAL_RE = /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z] ?\d[ABCEGHJ-NPRSTV-Z]\d$/;

export function formatPostal(raw: string): string {
  const s = raw.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6);
  return s.length > 3 ? `${s.slice(0, 3)} ${s.slice(3)}` : s;
}

export const isPostal = (v: string): boolean => POSTAL_RE.test(v.trim().toUpperCase());

export interface ZoneResult {
  ok: boolean;
  message: string;
}

export function checkZone(postal: string): ZoneResult {
  if (!isPostal(postal)) return { ok: false, message: "Enter a full postal code, like M4Y 0E8." };
  const prefix = postal.trim().slice(0, 3).toUpperCase();
  const area = serviceArea.prefixes[prefix];
  if (!area) return { ok: false, message: `Sorry, we only deliver in ${serviceArea.name} right now. ${prefix} is outside our area.` };
  return { ok: true, message: `We deliver to ${area}. Delivery is free.` };
}
