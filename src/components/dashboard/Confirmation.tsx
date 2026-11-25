"use client";

import { Check } from "lucide-react";
import Link from "next/link";
import { getAddOn } from "@/data/addons";
import { getMeal } from "@/data/meals";
import { formatCad, formatDay } from "@/lib/format";
import { useHydrated, useLunchbox } from "@/store/useLunchbox";
import { button } from "../ui/button";
import { LogoMark } from "../ui/Logo";

export function Confirmation() {
  const hydrated = useHydrated();
  const order = useLunchbox((s) => s.order);
  if (!hydrated) return <div className="grid min-h-[60vh] place-items-center"><LogoMark className="size-16 animate-pulse" /></div>;
  if (!order)
    return (
      <div className="shell grid min-h-[60vh] place-content-center justify-items-center gap-4 text-center">
        <h1 className="text-4xl">No order yet</h1>
        <p className="text-slate-warm">Build a box and your confirmation will show up here.</p>
        <Link href="/build-box" className={button("primary")}>Build Your Box</Link>
      </div>
    );
  return (
    <div className="shell grid gap-10 py-12 lg:grid-cols-[1.1fr_1fr] lg:items-start lg:py-16">
      <div>
        <span className="grid size-16 place-items-center rounded-full bg-forest text-white"><Check className="size-8" /></span>
        <h1 className="mt-6 text-5xl sm:text-6xl">You&apos;re set, {order.account.name.split(" ")[0]}.</h1>
        <p className="mt-4 text-lg">Your first box arrives</p>
        <p className="font-display text-3xl font-bold text-forest">{formatDay(order.deliveryDate)}</p>
        <p className="mt-3 max-w-md text-slate-warm">Between 8 AM and 8 PM, to {order.account.address}, {order.account.city} {order.postal}.{order.instructions && ` “${order.instructions}”`}</p>
        <p className="mt-6 text-sm text-slate-warm">Order <b className="text-espresso">{order.id}</b>. This was a demo checkout, so no card was charged and no email was sent.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/dashboard" className={button("primary", "lg")}>Go to my dashboard</Link>
          <Link href="/menu" className={button("outline", "lg")}>See the menu</Link>
        </div>
      </div>
      <div className="rounded-3xl border border-line bg-white p-6 sm:p-8">
        <h2 className="text-2xl">In your box</h2>
        <ul className="my-4 divide-y divide-line border-y border-line">
          {Object.entries(order.selections).map(([id, n]) => <li key={id} className="flex justify-between gap-4 py-2.5"><span>{getMeal(id)?.name}</span><b className="tabular-nums">× {n}</b></li>)}
          {Object.entries(order.addOns).map(([id, n]) => <li key={id} className="flex justify-between gap-4 py-2.5"><span>{getAddOn(id)?.name} <span className="text-sm text-slate-warm">add-on</span></span><b className="tabular-nums">× {n}</b></li>)}
        </ul>
        <dl className="space-y-1 tabular-nums">
          {order.price.mealDiscount > 0 && <div className="flex justify-between text-saffron-ink"><dt>First box discount</dt><dd>−{formatCad(order.price.mealDiscount)}</dd></div>}
          <div className="flex justify-between text-slate-warm"><dt>{order.price.taxLabel}</dt><dd>{formatCad(order.price.tax)}</dd></div>
          <div className="flex justify-between font-display text-xl font-bold"><dt>Total</dt><dd>{formatCad(order.price.total)}</dd></div>
          <div className="flex justify-between text-slate-warm"><dt>Weekly from box two</dt><dd>{formatCad(order.price.weeklyTotal)}</dd></div>
        </dl>
      </div>
    </div>
  );
}
