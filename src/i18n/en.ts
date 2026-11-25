/** English UI strings for the site shell and hero. Add fr.ts with the same shape to go bilingual. */
export const en = {
  nav: { menu: "Weekly Menu", how: "How It Works", plans: "Plans & Pricing", sustainability: "Sustainability", cta: "Get Started", account: "My box" },
  promo: { text: "Launch offer: 50% off your first box + free downtown Toronto delivery", code: "Code" },
  hero: {
    title: ["You lift.", "We prep."],
    body: "Chef-crafted lunches and dinners, ready in 2 minutes. Cooked fresh, never frozen, with the macros printed right on the sleeve.",
    cta: "Build Your Box",
    area: "Delivering in downtown Toronto",
    madeIn: "Made in Canada",
  },
  footer: { tagline: "High-protein, chef-cooked meal prep, made in Canada and delivered chilled in downtown Toronto." },
} as const;

type Widen<T> = { readonly [K in keyof T]: T[K] extends string ? string : T[K] extends readonly string[] ? readonly string[] : Widen<T[K]> };
export type Dictionary = Widen<typeof en>;
