"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useId, useState } from "react";
import { faqs } from "@/data/faqs";
import { cx } from "@/lib/cx";

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);
  const id = useId();
  return (
    <section id="faq" className="shell grid gap-10 py-20 lg:grid-cols-[1fr_1.7fr] lg:py-24">
      <h2 className="text-4xl sm:text-5xl">Good questions</h2>
      <div className="border-t border-line">
        {faqs.map((f, i) => (
          <div key={f.q} className="border-b border-line">
            <h3>
              <button type="button" aria-expanded={open === i} aria-controls={`${id}-${i}`} onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-4 py-5 text-left text-lg font-semibold">
                {f.q}<Plus className={cx("size-5 shrink-0 text-saffron-ink transition-transform", open === i && "rotate-45")} />
              </button>
            </h3>
            <div id={`${id}-${i}`}>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                    <p className="max-w-2xl pb-6 leading-relaxed text-slate-warm">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
