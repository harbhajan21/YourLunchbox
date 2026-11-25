import type { Review } from "./types";

/**
 * PLACEHOLDER COPY. These are illustrative, not real customers.
 * Replace with collected reviews, then set REVIEWS_ARE_SAMPLES to false to
 * remove the on-page notice and show the "Verified" label. Publishing invented
 * reviews as genuine is prohibited under Canada's Competition Act.
 */
export const REVIEWS_ARE_SAMPLES = true;

export const reviews: Review[] = [
  { name: "Daniela R.", city: "King West, Toronto", plan: "10 meals · High Protein", quote: "I train at six and I'm at my desk by eight. Piri-piri chicken at noon, 54 grams, done. My Sunday is mine again." },
  { name: "Marcus T.", city: "Corktown, Toronto", plan: "16 meals · High Protein", quote: "I used to eat the same dry chicken and rice for weeks. Now my numbers are the same and I look forward to lunch." },
  { name: "Priya S.", city: "Church-Wellesley, Toronto", plan: "8 meals · Calorie Smart", quote: "Mid-cut, and the butter chicken still fits. I log the label as is and move on with my day." },
  { name: "Evan L.", city: "CityPlace, Toronto", plan: "12 meals · Keto", quote: "The brisket and jerk chicken are the first low-carb prepared meals I've had that taste cooked by a person." },
];
