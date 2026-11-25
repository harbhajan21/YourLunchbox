"use client";

import { useId, type InputHTMLAttributes } from "react";
import { cx } from "@/lib/cx";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
}

export const inputClass =
  "h-12 w-full rounded-xl border border-line-strong bg-white px-4 text-base text-espresso placeholder:text-slate-warm/80 focus:border-forest focus:outline-2 focus:outline-forest aria-invalid:border-danger";

export function Field({ label, error, hint, className, ...input }: Props) {
  const id = useId();
  const note = error ?? hint;
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold">{label}</label>
      <input id={id} aria-invalid={error ? true : undefined} aria-describedby={note ? `${id}-note` : undefined} className={inputClass} {...input} />
      {note && <p id={`${id}-note`} className={cx("mt-1.5 text-sm", error ? "text-danger" : "text-slate-warm")}>{note}</p>}
    </div>
  );
}
