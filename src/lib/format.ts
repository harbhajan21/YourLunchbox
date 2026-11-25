const cad = new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD", currencyDisplay: "narrowSymbol" });
export const formatCad = (n: number): string => cad.format(n);

/** Dates are handled as local calendar days in YYYY-MM-DD form. */
export function formatDay(iso: string, opts: Intl.DateTimeFormatOptions = { weekday: "long", month: "long", day: "numeric" }): string {
  return new Intl.DateTimeFormat("en-CA", { ...opts, timeZone: "UTC" }).format(new Date(`${iso}T00:00:00Z`));
}
