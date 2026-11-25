"use client";

import { Tag, X } from "lucide-react";
import { useState, type FormEvent } from "react";
import { addOns as addOnList } from "@/data/addons";
import { getMeal } from "@/data/meals";
import { getPlan } from "@/data/plans";
import { findPromo } from "@/data/promos";
import { formatCad } from "@/lib/format";
import { countOf } from "@/lib/meals";
import { quote } from "@/lib/pricing";
import { useLunchbox } from "@/store/useLunchbox";
import { button } from "../ui/button";
import { inputClass } from "../ui/Field";

export function useQuote() {
  const planId = useLunchbox((s) => s.planId);
  const addOns = useLunchbox((s) => s.addOns);
  const promoCode = useLunchbox((s) => s.promoCode);
  return quote({ planId, addOns, promoCode });
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex justify-between gap-4 py-1 tabular-nums">
      <dt className={accent ? "text-saffron-ink" : "text-slate-warm"}>{label}</dt>
      <dd className={accent ? "font-semibold text-saffron-ink" : "font-medium"}>{value}</dd>
    </div>
  );
}

function PromoField() {
  const promo = useLunchbox((s) => findPromo(s.promoCode));
  const apply = useLunchbox((s) => s.applyPromo);
  const set = useLunchbox((s) => s.set);
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  function submit(e: FormEvent) {
    e.preventDefault();
    const ok = apply(code);
    setError(!ok);
    if (ok) setCode("");
  }
  if (promo)
    return (
      <div className="flex items-center justify-between gap-2 rounded-xl bg-saffron-soft py-1 pl-3 text-sm text-saffron-ink">
        <span className="flex items-center gap-2"><Tag className="size-4 shrink-0" /><span><b>{promo.code}</b> {promo.label}</span></span>
        <button type="button" aria-label={`Remove code ${promo.code}`} onClick={() => set({ promoCode: null })} className="grid size-10 shrink-0 place-items-center"><X className="size-4" /></button>
      </div>
    );
  return (
    <form onSubmit={submit}>
      <div className="flex gap-2">
        <input aria-label="Promo code" placeholder="Promo code" value={code} onChange={(e) => { setCode(e.target.value.toUpperCase()); setError(false); }} className={inputClass} />
        <button type="submit" className={button("outline")}>Apply</button>
      </div>
      {error && <p role="alert" className="mt-1.5 text-sm text-danger">That code isn&apos;t valid.</p>}
    </form>
  );
}

export function OrderSummary({ showItems = true }: { showItems?: boolean }) {
  const plan = useLunchbox((s) => getPlan(s.planId));
  const selections = useLunchbox((s) => s.selections);
  const addOns = useLunchbox((s) => s.addOns);
  const q = useQuote();
  const picked = countOf(selections);

  return (
    <div className="rounded-3xl border border-line bg-white p-6">
      <h2 className="text-xl">Your box</h2>
      <p className="mt-1 text-slate-warm">{plan.meals} meals a week at {formatCad(plan.pricePerMeal)}</p>
      {showItems && picked > 0 && (
        <ul className="mt-4 max-h-56 space-y-1.5 overflow-y-auto border-t border-line pt-4 text-sm">
          {Object.entries(selections).map(([id, n]) => <li key={id} className="flex gap-2"><span className="w-7 shrink-0 font-semibold tabular-nums">{n} ×</span>{getMeal(id)?.name}</li>)}
          {addOnList.filter((a) => addOns[a.id]).map((a) => <li key={a.id} className="flex gap-2"><span className="w-7 shrink-0 font-semibold tabular-nums">{addOns[a.id]} ×</span>{a.name}</li>)}
        </ul>
      )}
      <dl className="my-4 border-y border-line py-3 text-[0.95rem]">
        <Row label={`${plan.meals} meals`} value={formatCad(q.mealsRegular)} />
        {q.mealDiscount > 0 && <Row label="First box discount" value={`−${formatCad(q.mealDiscount)}`} accent />}
        {q.addOns > 0 && <Row label="Add-ons (one time)" value={formatCad(q.addOns)} />}
        <Row label="Delivery" value="Free" />
        <Row label="Subtotal" value={formatCad(q.subtotal)} />
        <Row label={q.taxLabel} value={formatCad(q.tax)} />
      </dl>
      <div className="space-y-1 tabular-nums" aria-live="polite">
        {q.savings > 0 && <p className="flex justify-between text-slate-warm"><span>Regular price</span><s>{formatCad(q.regularTotal)}</s></p>}
        <p className="flex items-baseline justify-between font-display text-lg font-bold"><span>Your first box</span><span className="text-3xl text-forest">{formatCad(q.total)}</span></p>
        {q.savings > 0 && <p className="rounded-full bg-sage px-3 py-1.5 text-center text-sm font-semibold text-forest">You save {formatCad(q.savings)}</p>}
      </div>
      <p className="my-4 text-sm text-slate-warm">Then {formatCad(q.weeklyTotal)} a week, tax included. Skip, pause or cancel anytime.</p>
      <PromoField />
    </div>
  );
}
