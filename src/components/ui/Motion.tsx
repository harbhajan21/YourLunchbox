"use client";

import { motion, MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

export function MotionRoot({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

/** Content is always visible; it only drifts into place. */
export function Rise({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div className={className} initial={{ y: 22 }} whileInView={{ y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.55, delay, ease: [0.2, 0.8, 0.2, 1] }}>
      {children}
    </motion.div>
  );
}
