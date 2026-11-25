"use client";

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { cx } from "@/lib/cx";
import { checkZone, formatPostal, isPostal } from "@/lib/postal";
import { fieldErrors, leadSchema } from "@/lib/schemas";
import { useLunchbox } from "@/store/useLunchbox";
import { t } from "@/i18n";
import { button } from "./button";
import { inputClass } from "./Field";

export function LeadForm({ inverse }: { inverse?: boolean }) {
  const router = useRouter();
  const set = useLunchbox((s) => s.set);
  const [postal, setPostal] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const zone = isPostal(postal) ? checkZone(postal) : null;

  function submit(e: FormEvent) {
    e.preventDefault();
    const r = leadSchema.safeParse({ postal, email });
    if (!r.success) return setErrors(fieldErrors(r.error));
    set({ postal: r.data.postal, email: r.data.email, step: 1 });
    router.push("/build-box");
  }

  const message = errors.postal ?? errors.email ?? zone?.message;
  const bad = !!(errors.postal ?? errors.email) || zone?.ok === false;
  return (
    <form onSubmit={submit} noValidate className="max-w-xl">
      <div className="grid gap-2.5 sm:grid-cols-[8.5rem_1fr]">
        <input aria-label="Postal code" name="postal" autoComplete="postal-code" placeholder="M4Y 0E8" value={postal} aria-invalid={errors.postal ? true : undefined}
          onChange={(e) => { setPostal(formatPostal(e.target.value)); setErrors({}); }} className={cx(inputClass, "h-14 font-semibold uppercase")} />
        <input aria-label="Email address" name="email" type="email" autoComplete="email" placeholder="you@email.com" value={email} aria-invalid={errors.email ? true : undefined}
          onChange={(e) => { setEmail(e.target.value); setErrors({}); }} className={cx(inputClass, "h-14")} />
        <button type="submit" className={button("primary", "lg", "sm:col-span-2")}>
          {t.hero.cta} <ArrowRight className="size-5" />
        </button>
      </div>
      <p role="status" className={cx("mt-2.5 min-h-6 text-sm font-medium", inverse ? (bad ? "text-[#ffb59b]" : "text-sage") : bad ? "text-danger" : "text-forest")}>
        {message}
      </p>
    </form>
  );
}
