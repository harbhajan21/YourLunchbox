"use client";

import { motion } from "framer-motion";
import { getMeal } from "@/data/meals";
import type { Quantities } from "@/lib/pricing";
import { FoodImage } from "../ui/FoodImage";

/** One compartment per meal, filling up like a lunchbox. */
export function SlotMeter({ selections, size }: { selections: Quantities; size: number }) {
  const filled = Object.entries(selections).flatMap(([id, n]) => Array.from({ length: n }, (_, i) => ({ id, key: `${id}-${i}` })));
  return (
    <div className="grid gap-1.5" aria-hidden="true" style={{ gridTemplateColumns: `repeat(${size > 10 ? size / 2 : size}, minmax(0, 1fr))` }}>
      {Array.from({ length: Math.max(size, filled.length) }, (_, i) => {
        const slot = filled[i];
        const meal = slot && getMeal(slot.id);
        return (
          <div key={i} className="relative h-9 overflow-hidden rounded-lg border border-dashed border-line-strong/60 bg-sand sm:h-11">
            {meal && (
              <motion.div key={slot.key} initial={{ scale: 0.5 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 320, damping: 20 }} className="absolute inset-0 overflow-hidden rounded-lg">
                <FoodImage key={meal.id} src={meal.image} alt="" sizes="90px" />
              </motion.div>
            )}
          </div>
        );
      })}
    </div>
  );
}
