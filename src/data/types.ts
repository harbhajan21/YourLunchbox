export const ALLERGENS = ["Nuts", "Dairy", "Gluten", "Soy", "Egg", "Fish", "Shellfish", "Sesame", "Mustard"] as const;
export type Allergen = (typeof ALLERGENS)[number];

export const PREFERENCES = ["chefs-choice", "high-protein", "calorie-smart", "keto", "vegetarian"] as const;
export type Preference = (typeof PREFERENCES)[number];

export interface Nutrition {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  saturatedFat: number;
  fibre: number;
  sugars: number;
  /** mg from here down */
  sodium: number;
  potassium: number;
  calcium: number;
  iron: number;
}

export interface Meal {
  id: string;
  name: string;
  subtitle: string;
  cuisine: string;
  image: string;
  servingGrams: number;
  nutrition: Nutrition;
  ingredients: string[];
  allergens: Allergen[];
  preferences: Preference[];
  /** Short badges for cards: GF, Dairy-Free, Spicy… */
  tags: string[];
  chefNote: string;
  heating: { microwave: string; oven: string };
  /** 0–100, used for "Most popular" sorting and auto-fill. */
  popularity: number;
}

export interface Plan {
  id: string;
  meals: number;
  pricePerMeal: number;
  badge?: "Most Popular" | "Best Value";
  blurb: string;
}

export interface AddOn {
  id: string;
  name: string;
  detail: string;
  category: "Juice" | "Protein bites" | "Breakfast" | "Sparkling";
  price: number;
  image: string;
}

export interface Promo {
  code: string;
  label: string;
  mealDiscount: number;
}

export interface Faq {
  q: string;
  a: string;
}

export interface Review {
  name: string;
  city: string;
  plan: string;
  quote: string;
}
