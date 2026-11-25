"use client";

import { useState } from "react";
import { getPlan } from "@/data/plans";
import type { Meal } from "@/data/types";
import { cx } from "@/lib/cx";
import { countOf } from "@/lib/meals";
import { useHydrated, useLunchbox } from "@/store/useLunchbox";
import { QtyStepper } from "../ui/QtyStepper";
import { MealCard } from "./MealCard";
import { MealDetail } from "./MealDetail";

/** Meal cards plus the detail sheet. `pickable` wires + / - to the box in the store. */
export function MealGrid({ meals, pickable, className }: { meals: Meal[]; pickable?: boolean; className?: string }) {
  const [open, setOpen] = useState<Meal | null>(null);
  const hydrated = useHydrated();
  const stored = useLunchbox((s) => s.selections);
  const size = useLunchbox((s) => getPlan(s.planId).meals);
  const addMeal = useLunchbox((s) => s.addMeal);
  const removeMeal = useLunchbox((s) => s.removeMeal);
  const selections = hydrated ? stored : {};
  const full = hydrated && countOf(selections) >= size;

  const stepper = (m: Meal) =>
    pickable ? <QtyStepper qty={selections[m.id] ?? 0} full={full} label={m.name} onAdd={() => addMeal(m.id)} onRemove={() => removeMeal(m.id)} /> : undefined;

  return (
    <>
      <div className={cx("grid gap-5 sm:grid-cols-2", className)}>
        {meals.map((m) => (
          <MealCard key={m.id} meal={m} onOpen={() => setOpen(m)} action={stepper(m)} selected={pickable && (selections[m.id] ?? 0) > 0} />
        ))}
      </div>
      <MealDetail meal={open} onClose={() => setOpen(null)} action={open && pickable ? <><span className="font-semibold">In your box</span>{stepper(open)}</> : undefined} />
    </>
  );
}
