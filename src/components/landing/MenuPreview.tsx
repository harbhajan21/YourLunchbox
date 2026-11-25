"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { meals } from "@/data/meals";
import type { Preference } from "@/data/types";
import { cx } from "@/lib/cx";
import { defaultFilters, filterMeals } from "@/lib/meals";
import { MealGrid } from "../menu/MealGrid";
import { button } from "../ui/button";

const tabs: { label: string; pref: Preference | null }[] = [
  { label: "All Meals", pref: null },
  { label: "High Protein", pref: "high-protein" },
  { label: "Calorie Smart (<550 kcal)", pref: "calorie-smart" },
  { label: "Keto & Low Carb", pref: "keto" },
  { label: "Plant-Forward", pref: "vegetarian" },
  { label: "Chef's Specials", pref: "chefs-choice" },
];

export function MenuPreview() {
  const [pref, setPref] = useState<Preference | null>(null);
  const list = filterMeals({ ...defaultFilters, preferences: pref ? [pref] : [] }).slice(0, 8);
  return (
    <section id="menu" className="shell py-20 lg:py-24">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 className="max-w-xl text-4xl sm:text-5xl">On the menu this week</h2>
        <Link href="/menu" className={button("ghost", "sm")}>See all {meals.length} meals <ArrowRight className="size-4" /></Link>
      </div>
      <div className="no-scrollbar -mx-5 mb-7 mt-7 flex gap-2 overflow-x-auto px-5 py-1" role="group" aria-label="Filter meals">
        {tabs.map((tab) => (
          <button key={tab.label} type="button" aria-pressed={pref === tab.pref} onClick={() => setPref(tab.pref)}
            className={cx("h-11 shrink-0 rounded-full border px-5 text-sm font-semibold transition", pref === tab.pref ? "border-forest bg-forest text-white" : "border-line bg-white hover:border-forest")}>
            {tab.label}
          </button>
        ))}
      </div>
      <MealGrid meals={list} className="lg:grid-cols-4" />
    </section>
  );
}
