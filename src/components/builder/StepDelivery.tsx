"use client";

import { useState } from "react";
import { cx } from "@/lib/cx";
import { cutoffFor, firstDelivery, type DeliveryDay } from "@/lib/delivery";
import { formatDay } from "@/lib/format";
import { checkZone, formatPostal, isPostal } from "@/lib/postal";
import { useLunchbox } from "@/store/useLunchbox";
import { Field, inputClass } from "../ui/Field";

const days: { id: DeliveryDay; label: string }[] = [{ id: "sunday", label: "Sunday" }, { id: "wednesday", label: "Wednesday" }];

export function StepDelivery({ showErrors }: { showErrors: boolean }) {
  const { postal, deliveryDay, instructions, set } = useLunchbox();
  const [now] = useState(() => new Date());
  const zone = checkZone(postal);
  const showZone = isPostal(postal) || showErrors;
  return (
    <div className="max-w-2xl space-y-9">
      <div>
        <h1 className="text-4xl sm:text-5xl">Where and when?</h1>
        <p className="mt-2 text-slate-warm">Free delivery in downtown Toronto, to your home, office or front desk.</p>
      </div>
      <Field label="Postal code" placeholder="M4Y 0E8" autoComplete="postal-code" value={postal} onChange={(e) => set({ postal: formatPostal(e.target.value) })} className="max-w-xs"
        error={showZone && !zone.ok ? zone.message : undefined} hint={showZone && zone.ok ? zone.message : undefined} />
      <fieldset>
        <legend className="mb-2 text-sm font-semibold">Delivery day</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {days.map((d) => {
            const first = firstDelivery(d.id, now);
            const on = d.id === deliveryDay;
            return (
              <label key={d.id} className={cx("cursor-pointer rounded-2xl border p-5 transition has-focus-visible:outline-2 has-focus-visible:outline-saffron", on ? "border-forest bg-sage ring-1 ring-forest" : "border-line bg-white hover:border-forest")}>
                <span className="flex items-center justify-between font-display text-xl font-bold">{d.label}<input type="radio" name="day" checked={on} onChange={() => set({ deliveryDay: d.id })} className="size-5 accent-forest" /></span>
                <span className="mt-2 block text-sm">First box {formatDay(first, { weekday: "short", month: "long", day: "numeric" })}</span>
                <span className="block text-sm text-slate-warm">Order by {formatDay(cutoffFor(first), { weekday: "short", month: "short", day: "numeric" })}, 11:59 PM ET</span>
              </label>
            );
          })}
        </div>
      </fieldset>
      <div>
        <label htmlFor="notes" className="mb-1.5 block text-sm font-semibold">Delivery instructions <span className="font-normal text-slate-warm">(optional)</span></label>
        <textarea id="notes" rows={3} maxLength={200} placeholder="Leave with concierge" value={instructions} onChange={(e) => set({ instructions: e.target.value })} className={cx(inputClass, "h-auto py-3")} />
      </div>
    </div>
  );
}
