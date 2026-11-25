"use client";

import { addOns } from "@/data/addons";
import { formatCad } from "@/lib/format";
import { countOf } from "@/lib/meals";
import { useLunchbox } from "@/store/useLunchbox";
import { button } from "../ui/button";
import { FoodImage } from "../ui/FoodImage";
import { QtyStepper } from "../ui/QtyStepper";
import { Sheet } from "../ui/Sheet";

interface Props {
  open: boolean;
  onClose: () => void;
  /** Null when the drawer was opened just to browse. */
  onContinue: (() => void) | null;
}

export function AddOnsSheet({ open, onClose, onContinue }: Props) {
  const chosen = useLunchbox((s) => s.addOns);
  const change = useLunchbox((s) => s.changeAddOn);
  const total = addOns.reduce((s, a) => s + a.price * (chosen[a.id] ?? 0), 0);
  return (
    <Sheet open={open} onClose={onClose} label="Add-ons">
      <div className="p-6 pt-8">
        <h2 className="pr-12 text-3xl">Anything extra?</h2>
        <p className="mt-2 text-slate-warm">Juice, oats and snacks, added to this box only.</p>
        <ul className="mt-6 divide-y divide-line">
          {addOns.map((a) => (
            <li key={a.id} className="flex items-center gap-4 py-4">
              <div className="relative size-20 shrink-0 overflow-hidden rounded-2xl bg-sand"><FoodImage src={a.image} alt="" sizes="80px" /></div>
              <div className="min-w-0 flex-1">
                <h3 className="text-base">{a.name}</h3>
                <p className="text-sm text-slate-warm">{a.detail}</p>
                <p className="mt-1 font-semibold tabular-nums">{formatCad(a.price)}</p>
              </div>
              <QtyStepper qty={chosen[a.id] ?? 0} full={(chosen[a.id] ?? 0) >= 12} label={a.name} onAdd={() => change(a.id, 1)} onRemove={() => change(a.id, -1)} />
            </li>
          ))}
        </ul>
      </div>
      <div className="sticky bottom-0 border-t border-line bg-white p-4">
        <button type="button" onClick={onContinue ?? onClose} className={button("primary", "lg", "w-full tabular-nums")}>
          {!onContinue ? "Done" : countOf(chosen) ? `Continue with ${formatCad(total)} in add-ons` : "Continue without add-ons"}
        </button>
      </div>
    </Sheet>
  );
}
