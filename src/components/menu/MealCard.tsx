"use client";

import { Timer } from "lucide-react";
import type { ReactNode } from "react";
import type { Meal } from "@/data/types";
import { cx } from "@/lib/cx";
import { FoodImage } from "../ui/FoodImage";
import { Macros } from "../ui/Macros";

interface Props {
  meal: Meal;
  onOpen: () => void;
  action?: ReactNode;
  selected?: boolean;
}

export function MealCard({ meal, onOpen, action, selected }: Props) {
  return (
    <article className={cx("group flex flex-col overflow-hidden rounded-2xl border bg-white transition duration-300 hover:shadow-lift", selected ? "border-forest ring-1 ring-forest" : "border-line")}>
      <button type="button" onClick={onOpen} tabIndex={-1} aria-hidden="true" className="relative block aspect-[4/3] w-full overflow-hidden bg-sand">
        <FoodImage src={meal.image} alt="" sizes="(min-width: 1280px) 19rem, (min-width: 640px) 45vw, 92vw" className="transition duration-500 group-hover:scale-[1.04]" />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-xs font-semibold"><Timer className="size-3.5 text-forest" /> 2 min</span>
        {meal.preferences.includes("chefs-choice") && <span className="absolute right-3 top-3 rounded-full bg-saffron px-2.5 py-1 text-xs font-semibold text-espresso">Chef&apos;s choice</span>}
      </button>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-lg leading-snug">{meal.name}</h3>
        <p className="mb-3 mt-1 text-sm text-slate-warm">{meal.subtitle}</p>
        <div className="mt-auto"><Macros n={meal.nutrition} /></div>
        <p className="mt-3 min-h-5 text-xs font-medium text-slate-warm">{meal.tags.join(" · ")}</p>
        <div className="mt-2 flex min-h-11 items-center justify-between gap-2 border-t border-line pt-3">
          <button type="button" onClick={onOpen} className="py-2 text-left text-sm font-semibold text-forest underline-offset-4 hover:underline">
            {action ? "Nutrition" : "View Nutrition & Ingredients"}<span className="sr-only"> for {meal.name}</span>
          </button>
          {action}
        </div>
      </div>
    </article>
  );
}
