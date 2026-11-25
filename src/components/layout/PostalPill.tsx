"use client";

import { MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cx } from "@/lib/cx";
import { checkZone, formatPostal, isPostal } from "@/lib/postal";
import { inputClass } from "../ui/Field";
import { useHydrated, useLunchbox } from "@/store/useLunchbox";

export function PostalPill() {
  const hydrated = useHydrated();
  const saved = useLunchbox((s) => s.postal);
  const set = useLunchbox((s) => s.set);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const root = useRef<HTMLDivElement>(null);
  const zone = isPostal(value) ? checkZone(value) : null;

  useEffect(() => {
    if (!open) return;
    const close = (e: PointerEvent) => { if (!root.current?.contains(e.target as Node)) setOpen(false); };
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", esc);
    return () => { document.removeEventListener("pointerdown", close); document.removeEventListener("keydown", esc); };
  }, [open]);

  function change(raw: string) {
    const v = formatPostal(raw);
    setValue(v);
    if (isPostal(v) && checkZone(v).ok) set({ postal: v });
  }

  return (
    <div ref={root} className="relative">
      <button type="button" aria-expanded={open} onClick={() => { setValue(saved); setOpen(!open); }} className="inline-flex h-10 items-center gap-1.5 whitespace-nowrap rounded-full border border-line bg-white px-3.5 text-sm font-medium hover:border-forest">
        <MapPin className="size-4 text-forest" /> {hydrated && saved ? saved : "Check postal code"}
      </button>
      {open && (
        <div className="absolute right-0 top-12 z-50 w-72 rounded-2xl border border-line bg-white p-4 shadow-lift">
          <label htmlFor="pill-postal" className="mb-1.5 block text-sm font-semibold">Where are we delivering?</label>
          <input id="pill-postal" autoFocus placeholder="M4Y 0E8" value={value} onChange={(e) => change(e.target.value)} className={cx(inputClass, "font-semibold uppercase")} />
          <p role="status" className={cx("mt-2 text-sm", zone && !zone.ok ? "text-danger" : "text-forest")}>{zone?.message ?? "Enter your postal code."}</p>
        </div>
      )}
    </div>
  );
}
