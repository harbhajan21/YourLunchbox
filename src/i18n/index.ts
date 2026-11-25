import { en, type Dictionary } from "./en";

export type Locale = "en" | "fr";
/** Register French by adding `fr` here; routes can then pick a locale from the URL or a cookie. */
const dictionaries: Partial<Record<Locale, Dictionary>> = { en };
export const getDictionary = (locale: Locale = "en"): Dictionary => dictionaries[locale] ?? en;
export const t = getDictionary();
