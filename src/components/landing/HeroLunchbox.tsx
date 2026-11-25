"use client";

import { motion } from "framer-motion";
import { getMeal } from "@/data/meals";
import { FoodImage } from "../ui/FoodImage";

const shots = {
  main: getMeal("maple-bourbon-salmon"),
  side: getMeal("piri-piri-chicken"),
  low: getMeal("steakhouse-medallions"),
};

const ease = [0.2, 0.8, 0.2, 1] as const;
const compartment = "relative overflow-hidden rounded-[1.35rem]";

/** The brand mark at full size: an open lunchbox whose compartments hold the product and its numbers. */
export function HeroLunchbox() {
  const { main, side, low } = shots;
  if (!main || !side || !low) return null;
  return (
    <motion.div initial={{ y: 40, rotate: 1.5 }} animate={{ y: 0, rotate: 0 }} transition={{ duration: 0.9, ease }} className="relative mx-auto w-full max-w-[36rem] pt-12">
      <div aria-hidden="true" className="absolute left-1/2 top-0 h-24 w-44 -translate-x-1/2 rounded-t-[2.5rem] border-[16px] border-b-0 border-forest" />
      <div className="relative rounded-[2.4rem] bg-forest p-3.5 shadow-lift sm:p-4">
        <div className="grid grid-cols-3 gap-3 sm:gap-3.5">
          <div className={`${compartment} col-span-2 aspect-[1.2]`}>
            <FoodImage src={main.image} alt={main.name} sizes="(min-width: 1024px) 24rem, 62vw" preload />
            <p className="absolute bottom-2.5 left-2.5 rounded-full bg-white px-3 py-1 text-xs font-semibold sm:text-sm">{main.name}</p>
          </div>
          <div className={`${compartment} flex flex-col justify-end bg-saffron p-3 text-espresso sm:p-4`}>
            <motion.p initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ delay: 0.4, type: "spring", stiffness: 160, damping: 12 }} className="origin-bottom-left font-display text-5xl font-extrabold leading-none tracking-tighter tabular-nums sm:text-7xl">
              {main.nutrition.protein}<span className="text-2xl sm:text-3xl">g</span>
            </motion.p>
            <p className="mt-1 font-semibold">protein</p>
          </div>
        </div>
        {/* barbell seam */}
        <div aria-hidden="true" className="relative -mx-3.5 my-3 flex h-9 items-center justify-between px-6 sm:-mx-4">
          <span className="absolute inset-x-0 h-2 bg-alabaster" />
          <span className="relative flex items-center gap-1"><i className="h-9 w-3.5 rounded-full bg-saffron" /><i className="h-6 w-2.5 rounded-full bg-saffron" /></span>
          <span className="relative flex items-center gap-1"><i className="h-6 w-2.5 rounded-full bg-saffron" /><i className="h-9 w-3.5 rounded-full bg-saffron" /></span>
        </div>
        <div className="grid grid-cols-3 gap-3 sm:gap-3.5">
          <div className={`${compartment} flex aspect-[0.8] flex-col sm:aspect-[0.92] justify-between bg-alabaster p-3 tabular-nums sm:p-4`}>
            <p><b className="block font-display text-xl font-bold leading-none sm:text-4xl">{main.nutrition.calories}</b><span className="text-xs text-slate-warm sm:text-sm">kcal</span></p>
            <p><b className="block font-display text-xl font-bold leading-none sm:text-4xl">2:00</b><span className="text-xs text-slate-warm sm:text-sm">to ready</span></p>
          </div>
          <div className={compartment}><FoodImage src={side.image} alt={side.name} sizes="(min-width: 1024px) 12rem, 30vw" /></div>
          <div className={compartment}><FoodImage src={low.image} alt={low.name} sizes="(min-width: 1024px) 12rem, 30vw" /></div>
        </div>
      </div>
    </motion.div>
  );
}
