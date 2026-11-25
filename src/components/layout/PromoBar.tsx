"use client";

import { X } from "lucide-react";
import { LAUNCH_PROMO } from "@/data/promos";
import { t } from "@/i18n";
import { useHydrated, useLunchbox } from "@/store/useLunchbox";

export function PromoBar() {
  const hydrated = useHydrated();
  const dismissed = useLunchbox((s) => s.promoDismissed);
  const set = useLunchbox((s) => s.set);
  if (hydrated && dismissed) return null;
  return (
    <div className="bg-forest text-white">
      <div className="shell flex min-h-11 items-center justify-center gap-3 px-12 py-1 text-center text-sm">
        <p>
          {t.promo.text}
          <span className="ml-2 inline-block whitespace-nowrap rounded-full bg-white/15 px-2.5 py-0.5 font-semibold">{t.promo.code} {LAUNCH_PROMO.code}</span>
        </p>
        <button type="button" onClick={() => set({ promoDismissed: true })} aria-label="Dismiss offer" className="absolute right-1 grid size-11 place-items-center rounded-full hover:bg-white/15 sm:right-3">
          <X className="size-4" />
        </button>
      </div>
    </div>
  );
}
