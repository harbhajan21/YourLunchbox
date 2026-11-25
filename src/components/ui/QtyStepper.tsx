"use client";

import { Minus, Plus } from "lucide-react";

interface Props {
  qty: number;
  onAdd: () => void;
  onRemove: () => void;
  label: string;
  full?: boolean;
}

export function QtyStepper({ qty, onAdd, onRemove, label, full }: Props) {
  if (qty === 0) {
    return (
      <button type="button" disabled={full} onClick={onAdd} aria-label={`Add ${label}`} className="inline-flex h-11 items-center gap-1.5 rounded-full border border-forest bg-white px-4 text-sm font-semibold text-forest transition hover:bg-forest hover:text-white disabled:border-line disabled:text-slate-warm disabled:opacity-60">
        <Plus className="size-4" /> Add
      </button>
    );
  }
  return (
    <div className="inline-flex h-11 items-center rounded-full bg-forest text-white" role="group" aria-label={`${label} quantity`}>
      <button type="button" onClick={onRemove} aria-label={`Remove one ${label}`} className="grid size-11 place-items-center rounded-full hover:bg-white/15">
        <Minus className="size-4" />
      </button>
      <span className="w-5 text-center text-sm font-semibold tabular-nums" aria-live="polite">{qty}</span>
      <button type="button" disabled={full} onClick={onAdd} aria-label={`Add one more ${label}`} className="grid size-11 place-items-center rounded-full hover:bg-white/15 disabled:opacity-35">
        <Plus className="size-4" />
      </button>
    </div>
  );
}
