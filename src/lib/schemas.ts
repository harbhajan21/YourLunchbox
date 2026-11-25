import { z } from "zod";
import { checkZone, POSTAL_RE } from "./postal";

export const emailSchema = z.email("Enter a valid email address.");
export const postalSchema = z
  .string()
  .trim()
  .toUpperCase()
  .regex(POSTAL_RE, "Enter a full postal code, like M4Y 0E8.")
  .refine((v) => checkZone(v).ok, "Sorry, we only deliver in downtown Toronto right now.");

export const leadSchema = z.object({ postal: postalSchema, email: emailSchema });

export const deliverySchema = z.object({
  postal: postalSchema,
  deliveryDay: z.enum(["sunday", "wednesday"]),
  instructions: z.string().max(200, "Keep instructions under 200 characters."),
});

export const accountSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name."),
  email: emailSchema,
  phone: z.string().refine((v) => /^1?\d{10}$/.test(v.replace(/\D/g, "")), "Enter a 10-digit phone number."),
  address: z.string().trim().min(5, "Enter your street address."),
  city: z.string().trim().min(2, "Enter your city."),
});
export type Account = z.infer<typeof accountSchema>;

function luhn(num: string): boolean {
  let sum = 0;
  [...num].reverse().forEach((d, i) => {
    let n = Number(d);
    if (i % 2) n = n * 2 > 9 ? n * 2 - 9 : n * 2;
    sum += n;
  });
  return sum % 10 === 0;
}

/** Client-only. Replace with Stripe Elements so card data never touches this app. */
export const cardSchema = z.object({
  number: z.string().refine((v) => {
    const d = v.replace(/\D/g, "");
    return d.length >= 13 && d.length <= 19 && luhn(d);
  }, "Enter a valid card number."),
  expiry: z.string().refine((v) => {
    const m = /^(0[1-9]|1[0-2]) ?\/ ?(\d{2})$/.exec(v);
    return !!m && new Date(2000 + Number(m[2]), Number(m[1])) > new Date();
  }, "Enter a future date as MM / YY."),
  cvc: z.string().regex(/^\d{3,4}$/, "Enter the 3 or 4 digit code."),
});

const quantities = z.record(z.string(), z.number().int().min(1).max(40));

export const checkoutSchema = z.object({
  planId: z.string(),
  selections: quantities,
  addOns: quantities,
  promoCode: z.string().nullable(),
  delivery: deliverySchema,
  account: accountSchema,
});
export type CheckoutPayload = z.infer<typeof checkoutSchema>;

/** Flatten Zod issues to { field: message } for forms. */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const i of error.issues) {
    const key = i.path.join(".");
    if (!out[key]) out[key] = i.message;
  }
  return out;
}
