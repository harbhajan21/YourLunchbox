"use client";

import { Check } from "lucide-react";
import { cx } from "@/lib/cx";
import type { Step } from "@/store/useLunchbox";

const labels: Record<Step, string> = { 1: "Plan", 2: "Delivery", 3: "Meals", 4: "Checkout" };
const steps: Step[] = [1, 2, 3, 4];

interface Props {
  step: Step;
  allowed: Step;
  onGo: (s: Step) => void;
}

export function ProgressBar({ step, allowed, onGo }: Props) {
  return (
    <nav aria-label="Checkout progress" className="w-full max-w-xl">
      <ol className="grid grid-cols-4 gap-2">
        {steps.map((s) => (
          <li key={s}>
            <button type="button" disabled={s > allowed} aria-current={s === step ? "step" : undefined} onClick={() => onGo(s)} className="group w-full py-1 text-left">
              <span className={cx("block h-1.5 rounded-full transition-colors", s < step ? "bg-forest" : s === step ? "bg-saffron" : "bg-line")} />
              <span className={cx("mt-1.5 flex items-center gap-1 text-sm", s === step ? "font-bold" : "text-slate-warm")}>
                {s < step && <Check className="size-3.5 shrink-0 text-forest max-sm:hidden" />}{labels[s]}
              </span>
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
}
