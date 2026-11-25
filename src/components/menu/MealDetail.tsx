"use client";

import { ChefHat, Flame, Microwave } from "lucide-react";
import type { ReactNode } from "react";
import type { Meal } from "@/data/types";
import { FoodImage } from "../ui/FoodImage";
import { Macros } from "../ui/Macros";
import { Sheet } from "../ui/Sheet";
import { NutritionFacts } from "./NutritionFacts";

interface Props {
  meal: Meal | null;
  onClose: () => void;
  action?: ReactNode;
}

export function MealDetail({ meal, onClose, action }: Props) {
  return (
    <Sheet open={meal !== null} onClose={onClose} label={meal?.name ?? "Meal details"}>
      {meal && (
        <>
          <div className="relative h-60 sm:h-72"><FoodImage src={meal.image} alt={meal.name} sizes="(min-width: 640px) 34rem, 100vw" /></div>
          <div className="space-y-8 p-6 pb-28">
            <div>
              <p className="text-sm text-slate-warm">{meal.cuisine} · {meal.tags.join(" · ")}</p>
              <h2 className="mt-1 text-3xl">{meal.name}</h2>
              <p className="mb-4 mt-1.5 text-slate-warm">{meal.subtitle}</p>
              <Macros n={meal.nutrition} />
            </div>
            <div className="flex gap-3 rounded-2xl bg-sand p-4">
              <ChefHat className="size-5 shrink-0 text-forest" />
              <p className="text-sm leading-relaxed"><b>Chef&apos;s note.</b> {meal.chefNote}</p>
            </div>
            <section>
              <h3 className="text-xl">Ingredients</h3>
              <p className="mt-2 leading-relaxed">{meal.ingredients.join(", ")}.</p>
              <p className="mt-3 font-semibold">{meal.allergens.length ? `Contains: ${meal.allergens.join(", ")}` : "No priority allergens in the recipe"}</p>
              <p className="text-sm text-slate-warm">Made in a shared kitchen that handles all priority allergens.</p>
            </section>
            <section>
              <h3 className="mb-3 text-xl">Heating</h3>
              <dl className="space-y-3 text-[0.95rem]">
                <div className="flex gap-3"><dt className="flex w-32 shrink-0 gap-2 font-semibold"><Microwave className="size-5 text-forest" />Microwave</dt><dd>{meal.heating.microwave}</dd></div>
                <div className="flex gap-3"><dt className="flex w-32 shrink-0 gap-2 font-semibold"><Flame className="size-5 text-forest" />Oven</dt><dd>{meal.heating.oven}</dd></div>
              </dl>
            </section>
            <NutritionFacts meal={meal} />
          </div>
          {action && <div className="sticky bottom-0 flex items-center justify-between border-t border-line bg-white px-6 py-4">{action}</div>}
        </>
      )}
    </Sheet>
  );
}
