"use client";

import { X } from "lucide-react";
import { useEffect, useRef, type ReactNode } from "react";
import { cx } from "@/lib/cx";

interface Props {
  open: boolean;
  onClose: () => void;
  label: string;
  children: ReactNode;
  className?: string;
}

/** Native dialog: focus trap, Escape and inert background come from the browser. */
export function Sheet({ open, onClose, label, children, className }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-label={label}
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className={cx(
        "sheet fixed inset-x-0 bottom-0 top-auto max-h-[92dvh] w-full overflow-y-auto overscroll-contain rounded-t-3xl bg-white p-0",
        "sm:inset-y-0 sm:left-auto sm:right-0 sm:h-dvh sm:max-h-dvh sm:w-[34rem] sm:rounded-none sm:rounded-l-3xl",
        className,
      )}
    >
      <button type="button" onClick={onClose} aria-label="Close" className="absolute right-4 top-4 z-20 grid size-11 place-items-center rounded-full bg-white/95 text-espresso shadow-md hover:bg-sand">
        <X className="size-5" />
      </button>
      {open && children}
    </dialog>
  );
}
