import type { Allergen, Meal, Nutrition, Preference } from "./types";

/**
 * Meal catalogue. This module is the only place that knows where meals come
 * from. Replace `meals` with a Prisma/Supabase query and keep the `Meal` type.
 *
 * Calories and the High Protein / Calorie Smart / Keto labels are derived from
 * the macros, so a label can never disagree with the nutrition panel.
 */

const photo = (id: string) => `https://images.unsplash.com/photo-${id}`;

/** [protein, carbs, fat, satFat, fibre, sugars, sodium, potassium, calcium, iron] */
type Row = [number, number, number, number, number, number, number, number, number, number];

interface MealInput {
  id: string;
  name: string;
  subtitle: string;
  cuisine: string;
  img: string;
  g: number;
  n: Row;
  ingredients: string[];
  allergens: Allergen[];
  vegetarian?: boolean;
  vegan?: boolean;
  spicy?: boolean;
  chef?: boolean;
  note: string;
  oven?: string;
  pop: number;
}

function toMeal(m: MealInput): Meal {
  const [protein, carbs, fat, saturatedFat, fibre, sugars, sodium, potassium, calcium, iron] = m.n;
  const nutrition: Nutrition = {
    calories: Math.round((protein * 4 + carbs * 4 + fat * 9) / 10) * 10,
    protein, carbs, fat, saturatedFat, fibre, sugars, sodium, potassium, calcium, iron,
  };
  const preferences: Preference[] = [];
  if (m.chef) preferences.push("chefs-choice");
  if (protein >= 40) preferences.push("high-protein");
  if (nutrition.calories < 550) preferences.push("calorie-smart");
  if (carbs - fibre <= 15) preferences.push("keto");
  if (m.vegetarian || m.vegan) preferences.push("vegetarian");

  const tags: string[] = [];
  if (m.vegan) tags.push("Vegan");
  else if (m.vegetarian) tags.push("Vegetarian");
  if (!m.allergens.includes("Gluten")) tags.push("GF");
  if (!m.allergens.includes("Dairy")) tags.push("Dairy-Free");
  if (m.spicy) tags.push("Spicy");

  return {
    id: m.id, name: m.name, subtitle: m.subtitle, cuisine: m.cuisine, image: photo(m.img),
    servingGrams: m.g, nutrition, ingredients: m.ingredients, allergens: m.allergens,
    preferences, tags, chefNote: m.note, popularity: m.pop,
    heating: {
      microwave: "Peel back one corner of the film. Heat on high for 2 minutes, then rest 30 seconds.",
      oven: m.oven ?? "Preheat to 350°F (175°C). Move to an oven-safe dish, cover, and heat 12 to 14 minutes.",
    },
  };
}

const FISH_OVEN = "Preheat to 325°F (165°C). Move to an oven-safe dish, cover loosely, and heat 9 to 11 minutes.";

export const meals: Meal[] = [
  {
    id: "maple-bourbon-salmon", name: "Maple Bourbon Glazed Salmon", subtitle: "Sesame greens, soba noodles, lime", cuisine: "Canadian",
    img: "1519708227418-c8fd9a32b7a2", g: 420, n: [42, 38, 22, 4, 5, 11, 690, 980, 110, 3.4],
    ingredients: ["Atlantic salmon", "Buckwheat soba (wheat)", "Spinach", "Ontario maple syrup", "Bourbon", "Tamari (soy)", "Toasted sesame", "Ginger", "Lime"],
    allergens: ["Fish", "Gluten", "Soy", "Sesame"], chef: true, pop: 99, oven: FISH_OVEN,
    note: "Amber maple is reduced with bourbon until it coats a spoon, then brushed on in two passes so the glaze holds through reheating.",
  },
  {
    id: "butter-chicken", name: "Butter Chicken & Basmati Bowl", subtitle: "Slow tomato makhani, cumin basmati, cilantro", cuisine: "Indian",
    img: "1588166524941-3bf61a9c41db", g: 450, n: [44, 54, 20, 9, 5, 9, 820, 760, 160, 3.2],
    ingredients: ["Chicken thigh", "Basmati rice", "Tomato", "Cream", "Yogurt", "Butter", "Fenugreek", "Garam masala", "Ginger", "Cilantro"],
    allergens: ["Dairy"], chef: true, pop: 98,
    note: "Chicken marinates overnight in yogurt and Kashmiri chili. Dried fenugreek goes in at the very end.",
  },
  {
    id: "steakhouse-medallions", name: "Herb-Crusted Steakhouse Medallions", subtitle: "Cast-iron potatoes, rosemary jus", cuisine: "Steakhouse",
    img: "1594041680534-e8c8cdebd659", g: 430, n: [48, 36, 21, 8, 4, 3, 610, 1240, 60, 5.6],
    ingredients: ["Alberta beef sirloin", "Baby potatoes", "Rosemary", "Thyme", "Garlic", "Beef stock", "Olive oil", "Black pepper"],
    allergens: [], chef: true, pop: 96,
    note: "Seared hard and pulled at 125°F, so two minutes of reheating lands at medium instead of grey.",
  },
  {
    id: "tuscan-garlic-chicken", name: "Tuscan Garlic Chicken", subtitle: "Blistered tomato, zucchini, parmesan, basil", cuisine: "Italian",
    img: "1604908176997-125f25cc6f3d", g: 400, n: [46, 16, 22, 8, 4, 7, 640, 890, 220, 2.6],
    ingredients: ["Chicken breast", "Cherry tomato", "Zucchini", "Parmesan", "Cream", "Roasted garlic", "Basil", "Olive oil"],
    allergens: ["Dairy"], pop: 94,
    note: "Roasted garlic is whisked into the cream instead of flour, so the sauce stays silky and gluten-free.",
  },
  {
    id: "beef-barbacoa", name: "Braised Beef Barbacoa Tacos", subtitle: "Corn tortillas, pickled radish, lime", cuisine: "Mexican",
    img: "1552332386-f8dd00dc2f85", g: 410, n: [43, 44, 19, 7, 7, 4, 780, 820, 130, 5.1],
    ingredients: ["Beef chuck", "Corn tortilla", "Chipotle", "Guajillo chili", "Radish", "Cabbage", "Cilantro", "Cumin", "Lime"],
    allergens: [], spicy: true, pop: 93,
    note: "Braised nine hours with guajillo and clove. Warm the tortillas separately for 20 seconds if you have time.",
  },
  {
    id: "gochujang-tofu", name: "Gochujang Tofu Bibimbap", subtitle: "Jasmine rice, sesame vegetables, soft egg", cuisine: "Korean",
    img: "1590301157890-4810ed352733", g: 440, n: [31, 58, 18, 3, 7, 10, 760, 780, 260, 5.4],
    ingredients: ["Pressed tofu (soy)", "Jasmine rice", "Egg", "Gluten-free gochujang (soy)", "Spinach", "Carrot", "Bean sprout", "Toasted sesame oil"],
    allergens: ["Soy", "Egg", "Sesame"], vegetarian: true, spicy: true, chef: true, pop: 90,
    note: "Tofu is pressed for an hour and roasted before glazing. Stir everything together before your first bite.",
  },
  {
    id: "piri-piri-chicken", name: "Piri-Piri Grilled Chicken", subtitle: "Double breast, garden vegetables, herbed mash", cuisine: "Portuguese",
    img: "1598515214211-89d3c73ae83b", g: 460, n: [54, 32, 13, 4, 7, 6, 650, 1080, 80, 2.7],
    ingredients: ["Chicken breast", "Potato", "Peas", "Carrot", "Bird's eye chili", "Red pepper", "Lemon", "Butter", "Paprika"],
    allergens: ["Dairy"], spicy: true, pop: 97,
    note: "Inspired by the churrasqueiras on Dundas West. Our highest-protein chicken dish.",
  },
  {
    id: "lemon-rosemary-chicken", name: "Lemon Rosemary Chicken", subtitle: "Charred artichoke, heirloom carrots", cuisine: "Mediterranean",
    img: "1532550907401-a500c9a57435", g: 380, n: [45, 19, 12, 2, 6, 7, 540, 910, 70, 2.3],
    ingredients: ["Chicken breast", "Artichoke", "Carrot", "Bell pepper", "Lemon", "Rosemary", "Garlic", "Olive oil"],
    allergens: [], pop: 88,
    note: "Brined in lemon and bay for four hours, which is why it stays juicy on day six.",
  },
  {
    id: "coconut-curry-salmon", name: "Coconut Curry Salmon", subtitle: "Turmeric broth, spinach, lemon", cuisine: "South Indian",
    img: "1574484284002-952d92456975", g: 400, n: [41, 13, 29, 14, 4, 5, 620, 1050, 120, 3.6],
    ingredients: ["Atlantic salmon", "Coconut milk", "Spinach", "Turmeric", "Curry leaf", "Black cumin", "Ginger", "Lemon", "Avocado oil"],
    allergens: ["Fish"], chef: true, pop: 89, oven: FISH_OVEN,
    note: "Curry leaves bloom in avocado oil first. Good over cauliflower rice, and good on its own.",
  },
  {
    id: "lemon-herb-haddock", name: "Lemon-Herb East Coast Haddock", subtitle: "Brown rice pilaf, broccoli", cuisine: "Canadian",
    img: "1539136788836-5699e78bfc75", g: 390, n: [40, 36, 10, 3, 6, 3, 560, 940, 90, 2.4],
    ingredients: ["Nova Scotia haddock", "Brown rice", "Broccoli", "Parsley", "Dill", "Lemon", "Butter"],
    allergens: ["Fish", "Dairy"], pop: 79, oven: FISH_OVEN,
    note: "Lean, light and high in protein. The one our cutting customers order in multiples.",
  },
  {
    id: "crispy-trout", name: "Crispy-Skin Trout & Barley", subtitle: "Herbed barley tabbouleh, saffron carrot", cuisine: "Canadian",
    img: "1580476262798-bddd9f4b7369", g: 390, n: [38, 34, 17, 4, 7, 6, 520, 960, 100, 3.1],
    ingredients: ["Ontario rainbow trout", "Pearl barley (gluten)", "Parsley", "Mint", "Cucumber", "Carrot", "Saffron", "Olive oil"],
    allergens: ["Fish", "Gluten"], chef: true, pop: 76, oven: "Preheat to 400°F (205°C). Heat the fish skin-side up, uncovered, 8 minutes to crisp. Warm the barley alongside.",
    note: "If you have an oven at work, use it. The skin crisps right back up.",
  },
  {
    id: "montreal-brisket", name: "Montréal-Spiced Beef Brisket", subtitle: "Coriander-pepper crust, braised cabbage", cuisine: "Canadian",
    img: "1529692236671-f1f6cf9683ba", g: 380, n: [47, 14, 27, 10, 5, 6, 790, 870, 90, 5.2],
    ingredients: ["Beef brisket", "Green cabbage", "Coriander seed", "Black pepper", "Mustard seed", "Garlic", "Apple cider vinegar"],
    allergens: ["Mustard"], chef: true, pop: 91,
    note: "The smoked-meat spice rub, applied to a 12-hour brisket. Low carb, no bread required.",
  },
  {
    id: "bison-meatballs", name: "Prairie Bison Meatballs", subtitle: "Peppered arugula, lemon, olive oil", cuisine: "Canadian",
    img: "1529042410759-befb1204b468", g: 340, n: [42, 10, 25, 9, 3, 3, 590, 760, 190, 6.2],
    ingredients: ["Saskatchewan bison", "Egg", "Parmesan", "Arugula", "Garlic", "Parsley", "Lemon", "Olive oil"],
    allergens: ["Egg", "Dairy"], pop: 84,
    note: "Egg and parmesan bind these instead of breadcrumbs. Toss the arugula in after heating.",
  },
  {
    id: "chili-shrimp-linguine", name: "Chili-Garlic Shrimp Linguine", subtitle: "Charred peppers, cherry tomato", cuisine: "Italian",
    img: "1563379926898-05f4575a45d8", g: 420, n: [40, 62, 14, 3, 6, 8, 740, 690, 130, 4.3],
    ingredients: ["Shrimp", "Durum linguine (wheat)", "Cherry tomato", "Bell pepper", "Garlic", "Calabrian chili", "Parsley", "Olive oil"],
    allergens: ["Shellfish", "Gluten"], spicy: true, pop: 86,
    note: "Pasta is cooked two minutes short of al dente, so it finishes in your microwave.",
  },
  {
    id: "lentil-penne", name: "Red Lentil Penne Arrabbiata", subtitle: "Legume pasta, San Marzano, basil", cuisine: "Italian",
    img: "1621996346565-e3dbc646d9a9", g: 400, n: [27, 64, 11, 2, 12, 10, 610, 980, 90, 6.8],
    ingredients: ["Red lentil penne", "San Marzano tomato", "Garlic", "Calabrian chili", "Nutritional yeast", "Basil", "Olive oil"],
    allergens: [], vegan: true, spicy: true, pop: 72,
    note: "27 g of plant protein from the pasta itself. Nutritional yeast does the work of cheese.",
  },
  {
    id: "turkey-bolognese", name: "Lean Turkey Bolognese", subtitle: "Spaghetti, slow soffritto, parmesan", cuisine: "Italian",
    img: "1622973536968-3ead9e780960", g: 440, n: [46, 60, 15, 5, 6, 9, 720, 870, 180, 4.6],
    ingredients: ["Ontario ground turkey", "Durum spaghetti (wheat)", "Tomato", "Carrot", "Celery", "Onion", "Parmesan", "Oregano"],
    allergens: ["Gluten", "Dairy"], pop: 92,
    note: "A bulking staple. Three hours on the soffritto is what keeps lean turkey from tasting lean.",
  },
  {
    id: "harvest-power-bowl", name: "Prairie Harvest Power Bowl", subtitle: "Spiced chickpeas, sweet potato, avocado", cuisine: "Plant-forward",
    img: "1512621776951-a57141f2eefd", g: 420, n: [20, 52, 22, 3, 16, 9, 480, 1260, 120, 5.0],
    ingredients: ["Saskatchewan chickpeas", "Sweet potato", "Avocado", "Cherry tomato", "Red cabbage", "Watermelon radish", "Pea shoots", "Tahini (sesame)", "Lemon"],
    allergens: ["Sesame"], vegan: true, chef: true, pop: 81,
    note: "Made to eat cold or warm. Lift the avocado out before heating.", oven: "Best warmed in a skillet over medium heat for 4 minutes, or eaten cold.",
  },
  {
    id: "salmon-poke", name: "Pacific Salmon Poke Bowl", subtitle: "Roasted salmon, edamame, pineapple, egg", cuisine: "West Coast",
    img: "1546069901-ba9599a7e63c", g: 430, n: [41, 42, 20, 4, 8, 10, 630, 1080, 120, 3.9],
    ingredients: ["Wild BC salmon", "Sushi rice", "Edamame (soy)", "Pineapple", "Cucumber", "Red cabbage", "Egg", "Tamari (soy)", "Sesame seed"],
    allergens: ["Fish", "Soy", "Egg", "Sesame"], pop: 95, oven: "Made to eat chilled. Heat the rice and salmon separately if you prefer it warm.",
    note: "No microwave needed. Straight from the fridge or a gym bag with an ice pack.",
  },
  {
    id: "orange-ginger-chicken", name: "Orange-Ginger Chicken & Broccoli", subtitle: "Sticky citrus glaze, steamed jasmine", cuisine: "Chinese-Canadian",
    img: "1525755662778-989d0524087e", g: 430, n: [42, 56, 12, 2, 5, 14, 750, 820, 80, 2.8],
    ingredients: ["Chicken thigh", "Jasmine rice", "Broccoli", "Orange juice", "Tamari (soy)", "Ginger", "Tapioca starch", "Scallion"],
    allergens: ["Soy"], pop: 87,
    note: "All the stick of takeout orange chicken with real juice and about a third of the sugar.",
  },
  {
    id: "thai-red-curry", name: "Thai Red Curry Chicken", subtitle: "Coconut, potato, Thai basil", cuisine: "Thai",
    img: "1455619452474-d2be8b1e70cd", g: 430, n: [40, 34, 24, 13, 5, 7, 810, 890, 80, 3.5],
    ingredients: ["Chicken thigh", "Coconut milk", "Potato", "Red curry paste (shrimp)", "Fish sauce", "Thai basil", "Lime leaf", "Lemongrass"],
    allergens: ["Fish", "Shellfish"], spicy: true, pop: 83,
    note: "The paste is pounded fresh weekly. This is a genuine three-chili dish.",
  },
  {
    id: "cider-pork-chop", name: "Apple-Cider Pork Chop", subtitle: "Caramelized apple, broccolini, roast potato", cuisine: "Canadian",
    img: "1432139555190-58524dae6a55", g: 440, n: [47, 33, 19, 6, 6, 13, 580, 1180, 90, 2.9],
    ingredients: ["Ontario pork loin chop", "Apple", "Broccolini", "Potato", "Apple cider", "Thyme", "Olive oil"],
    allergens: [], pop: 74,
    note: "Niagara cider, reduced by half, with apples kept chunky so they survive the trip.",
  },
  {
    id: "jerk-chicken-kale", name: "Jerk Chicken & Garlic Kale", subtitle: "Scotch bonnet, pomegranate, thyme", cuisine: "Caribbean",
    img: "1610057099443-fde8c4d50f91", g: 380, n: [45, 14, 23, 6, 5, 6, 670, 930, 170, 3.3],
    ingredients: ["Chicken thigh & drumstick", "Kale", "Scotch bonnet", "Allspice", "Thyme", "Scallion", "Pomegranate", "Garlic", "Olive oil"],
    allergens: [], spicy: true, chef: true, pop: 90,
    note: "Toronto-style jerk: more allspice, real scotch bonnet, finished under the broiler.",
  },
  {
    id: "steak-frites", name: "Striploin Steak Frites", subtitle: "Oven-roasted frites, herb butter", cuisine: "Québécois",
    img: "1600891964092-4316c288032e", g: 440, n: [50, 48, 28, 11, 5, 2, 640, 1390, 50, 5.4],
    ingredients: ["Alberta beef striploin", "Russet potato", "Butter", "Parsley", "Shallot", "Tarragon", "Canola oil"],
    allergens: ["Dairy"], chef: true, pop: 93, oven: "Preheat to 400°F (205°C). Spread frites on a tray 8 minutes; add steak for the last 4.",
    note: "Leg day reward. The frites are oven-roasted, and the oven is how you should bring them back.",
  },
  {
    id: "black-bean-quinoa", name: "Smoky Black Bean Quinoa Bowl", subtitle: "Avocado, roasted squash, pickled onion", cuisine: "Plant-forward",
    img: "1623428187969-5da2dcea5ebf", g: 410, n: [22, 50, 19, 3, 15, 6, 520, 1190, 110, 5.3],
    ingredients: ["Black beans", "Saskatchewan quinoa", "Avocado", "Butternut squash", "Tomato", "Kale", "Red onion", "Smoked paprika", "Lime"],
    allergens: [], vegan: true, pop: 78,
    note: "Complete plant protein from beans and quinoa, plus 15 g of fibre.",
  },
].map((m) => toMeal({ ...m, n: m.n as Row, allergens: m.allergens as Allergen[] }));

const byId = new Map(meals.map((m) => [m.id, m]));
export const getMeal = (id: string): Meal | undefined => byId.get(id);
