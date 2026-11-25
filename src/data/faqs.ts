import { serviceArea } from "./serviceArea";
import type { Faq } from "./types";

export const faqs: Faq[] = [
  { q: "How long do meals stay fresh?", a: "Up to 7 days in the fridge from the day they arrive. Every sleeve is stamped with a best-before date. Meals are cooked fresh and chilled, never frozen." },
  { q: "Can I skip, pause or cancel?", a: "Yes. Skip a single week, pause for as long as you like, or cancel from your dashboard. Make changes before Wednesday at 11:59 PM Eastern and they apply to your next delivery." },
  { q: "How accurate are the macros?", a: "Calories, protein, carbs and fat are calculated per recipe from weighed ingredients, and listed on every meal with a full Nutrition Facts table. Log them straight into your tracker." },
  { q: "Can I order the same meal more than once?", a: "As many times as you want. If you eat the same lunch five days running, add five of it. No box needs to be balanced." },
  { q: "What about allergens?", a: "Every meal lists its priority allergens, and you can exclude them on the menu. Our meals share one kitchen, so we cannot guarantee any dish is free of traces. If you have a severe allergy, please do not order." },
  { q: "Where do you deliver?", a: `Downtown Toronto only for now, roughly Bathurst to the Don River and Bloor to the lake. That includes ${serviceArea.neighbourhoods.join(", ")}. Enter your postal code to check your address.` },
  { q: "When does my box arrive?", a: "Choose Sunday or Wednesday. Boxes arrive between 8 AM and 8 PM in insulated packaging that keeps meals chilled for hours, so you do not need to be home. Office and condo concierge drop-offs are welcome." },
  { q: "How do I recycle the packaging?", a: "Rinse trays and put them in your blue bin, flatten the box and sleeves, and drain the non-toxic gel packs into the garbage before recycling the pouch film where your municipality accepts it." },
];
