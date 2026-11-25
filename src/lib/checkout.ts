import { getAddOn } from "@/data/addons";
import { getMeal } from "@/data/meals";
import { plans } from "@/data/plans";
import { firstDelivery } from "./delivery";
import { countOf } from "./meals";
import { quote, type Quote } from "./pricing";
import { checkoutSchema, type CheckoutPayload } from "./schemas";

export interface PlacedOrder {
  orderId: string;
  placedAt: string;
  deliveryDate: string;
  price: Quote;
}

/**
 * Demo checkout, run in the browser because GitHub Pages has no server.
 * For real orders, move this to a backend and create a Stripe Subscription
 * there: prices checked in the browser can be tampered with.
 */
export function submitOrder(payload: CheckoutPayload): PlacedOrder {
  const parsed = checkoutSchema.safeParse(payload);
  if (!parsed.success) throw new Error("Some details are missing or invalid.");
  const { planId, selections, addOns, promoCode, delivery } = parsed.data;
  const plan = plans.find((p) => p.id === planId);
  if (!plan) throw new Error("That plan is no longer available.");
  if (Object.keys(selections).some((id) => !getMeal(id)) || Object.keys(addOns).some((id) => !getAddOn(id)))
    throw new Error("An item in your box is no longer available.");
  if (countOf(selections) !== plan.meals) throw new Error(`Your box needs exactly ${plan.meals} meals.`);
  const now = new Date();
  return {
    orderId: `YLB-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
    placedAt: now.toISOString(),
    deliveryDate: firstDelivery(delivery.deliveryDay, now),
    price: quote({ planId, addOns, promoCode }),
  };
}
