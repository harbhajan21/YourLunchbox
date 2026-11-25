"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** Logo link. On the landing page itself it returns to the top, which a same-URL navigation would not do. */
export function HomeLink({ children, className, onNavigate }: { children: ReactNode; className?: string; onNavigate?: () => void }) {
  const onHome = usePathname() === "/";
  return (
    <Link
      href="/"
      scroll={!onHome}
      aria-label="YourLunchbox home"
      className={className}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        onNavigate?.();
        if (onHome) window.scrollTo({ top: 0 });
      }}
    >
      {children}
    </Link>
  );
}
