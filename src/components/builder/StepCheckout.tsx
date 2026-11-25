"use client";

import { CreditCard, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { addOns as addOnList } from "@/data/addons";
import { getMeal } from "@/data/meals";
import { submitOrder } from "@/lib/checkout";
import { firstDelivery } from "@/lib/delivery";
import { formatCad, formatDay } from "@/lib/format";
import { accountSchema, cardSchema, fieldErrors, type CheckoutPayload } from "@/lib/schemas";
import { useLunchbox, type Step } from "@/store/useLunchbox";
import { button } from "../ui/button";
import { Field } from "../ui/Field";
import { FoodImage } from "../ui/FoodImage";
import { useQuote } from "./OrderSummary";

const TEST_CARD = { number: "4242 4242 4242 4242", expiry: "12 / 34", cvc: "123" };

function formatExpiry(raw: string): string {
  const d = raw.replace(/\D/g, "").slice(0, 4);
  return d.length > 2 ? `${d.slice(0, 2)} / ${d.slice(2)}` : d;
}

export function StepCheckout({ onGo, onPlaced }: { onGo: (s: Step) => void; onPlaced: () => void }) {
  const router = useRouter();
  const s = useLunchbox();
  const q = useQuote();
  const [account, setAccount] = useState({ name: "", email: s.email, phone: "", address: "", city: "" });
  const [card, setCard] = useState({ number: "", expiry: "", cvc: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [now] = useState(() => new Date());
  const acct = (k: keyof typeof account) => ({ value: account[k], error: errors[k], onChange: (e: { target: { value: string } }) => setAccount({ ...account, [k]: e.target.value }) });

  function submit(e: FormEvent) {
    e.preventDefault();
    const a = accountSchema.safeParse(account);
    const c = cardSchema.safeParse(card);
    if (!a.success || !c.success) {
      setErrors({ ...(a.success ? {} : fieldErrors(a.error)), ...(c.success ? {} : fieldErrors(c.error)) });
      requestAnimationFrame(() => document.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus());
      return;
    }
    setErrors({});
    setBusy(true);
    // Card details stay in this component. Only the order is passed on.
    const payload: CheckoutPayload = {
      planId: s.planId, selections: s.selections, addOns: s.addOns, promoCode: s.promoCode, account: a.data,
      delivery: { postal: s.postal, deliveryDay: s.deliveryDay, instructions: s.instructions },
    };
    try {
      const data = submitOrder(payload);
      onPlaced();
      s.placeOrder({
        id: data.orderId, placedAt: data.placedAt, deliveryDate: data.deliveryDate, price: data.price, account: a.data,
        planId: s.planId, selections: s.selections, addOns: s.addOns, promoCode: s.promoCode,
        postal: s.postal, deliveryDay: s.deliveryDay, instructions: s.instructions,
      });
      router.push("/order-confirmation");
    } catch (err) {
      setErrors({ form: (err instanceof Error && err.message) || "We couldn't place your order. Please try again." });
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} noValidate className="max-w-2xl space-y-10">
      <div>
        <h1 className="text-4xl sm:text-5xl">Review and pay</h1>
        <p className="mt-2 text-slate-warm">First delivery {formatDay(firstDelivery(s.deliveryDay, now))} to {s.postal}. <button type="button" onClick={() => onGo(2)} className="font-semibold text-forest underline underline-offset-4">Change</button></p>
      </div>
      <section>
        <div className="flex items-baseline justify-between"><h2 className="text-2xl">In your box</h2><button type="button" onClick={() => onGo(3)} className="py-2 font-semibold text-forest underline underline-offset-4">Edit meals</button></div>
        <ul className="mt-3 grid gap-x-8 sm:grid-cols-2">
          {Object.entries(s.selections).map(([id, n]) => {
            const m = getMeal(id);
            return m && (
              <li key={id} className="flex items-center gap-3 border-b border-line py-2.5">
                <div className="relative size-12 shrink-0 overflow-hidden rounded-xl"><FoodImage src={m.image} alt="" sizes="48px" /></div>
                <span className="flex-1 text-sm font-medium leading-snug">{m.name}</span><b className="tabular-nums">× {n}</b>
              </li>
            );
          })}
          {addOnList.filter((a) => s.addOns[a.id]).map((a) => (
            <li key={a.id} className="flex items-center gap-3 border-b border-line py-2.5">
              <div className="relative size-12 shrink-0 overflow-hidden rounded-xl"><FoodImage src={a.image} alt="" sizes="48px" /></div>
              <span className="flex-1 text-sm font-medium leading-snug">{a.name} <span className="text-slate-warm">add-on</span></span><b className="tabular-nums">× {s.addOns[a.id]}</b>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="mb-4 text-2xl">Your details</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Full name" autoComplete="name" {...acct("name")} />
          <Field label="Email" type="email" autoComplete="email" {...acct("email")} />
          <Field label="Phone" type="tel" autoComplete="tel" placeholder="416 555 0123" {...acct("phone")} />
          <Field label="City" autoComplete="address-level2" {...acct("city")} />
          <Field label="Street address and unit" autoComplete="street-address" className="sm:col-span-2" {...acct("address")} />
        </div>
      </section>
      <section>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <h2 className="flex items-center gap-2 text-2xl"><CreditCard className="size-6 text-forest" /> Payment</h2>
          <button type="button" onClick={() => setCard(TEST_CARD)} className={button("outline", "sm")}>Use test card</button>
        </div>
        <p className="mb-4 rounded-xl bg-saffron-soft px-4 py-3 text-sm text-saffron-ink"><b>Demo checkout.</b> No payment is taken. Please don&apos;t enter a real card.</p>
        <div className="grid grid-cols-2 gap-4 rounded-2xl border border-line bg-white p-5">
          <Field label="Card number" inputMode="numeric" autoComplete="off" placeholder="4242 4242 4242 4242" className="col-span-2" value={card.number} error={errors.number} onChange={(e) => setCard({ ...card, number: e.target.value.replace(/\D/g, "").slice(0, 19).replace(/(.{4})(?=.)/g, "$1 ") })} />
          <Field label="Expiry" inputMode="numeric" autoComplete="off" placeholder="MM / YY" value={card.expiry} error={errors.expiry} onChange={(e) => setCard({ ...card, expiry: formatExpiry(e.target.value) })} />
          <Field label="CVC" inputMode="numeric" autoComplete="off" placeholder="123" value={card.cvc} error={errors.cvc} onChange={(e) => setCard({ ...card, cvc: e.target.value.replace(/\D/g, "").slice(0, 4) })} />
        </div>
      </section>
      <div>
        <p className="mb-4 text-sm leading-relaxed text-slate-warm">
          This is a weekly subscription. You pay {formatCad(q.total)} today, then {formatCad(q.weeklyTotal)} a week, tax included. <b className="text-espresso">Skip, pause, or cancel anytime before Wednesday 11:59 PM EST.</b> Add-ons are charged once.
        </p>
        {errors.form && <p role="alert" className="mb-3 font-semibold text-danger">{errors.form}</p>}
        <button type="submit" disabled={busy} className={button("primary", "lg", "w-full tabular-nums")}><Lock className="size-4" /> {busy ? "Placing your order…" : `Start subscription · ${formatCad(q.total)}`}</button>
      </div>
    </form>
  );
}
