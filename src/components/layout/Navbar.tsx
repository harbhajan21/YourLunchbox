"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { t } from "@/i18n";
import { useHydrated, useLunchbox } from "@/store/useLunchbox";
import { button } from "../ui/button";
import { HomeLink } from "../ui/HomeLink";
import { Logo } from "../ui/Logo";
import { PostalPill } from "./PostalPill";
import { PromoBar } from "./PromoBar";

const links = [
  { href: "/menu", label: t.nav.menu },
  { href: "/#how-it-works", label: t.nav.how },
  { href: "/#plans", label: t.nav.plans },
  { href: "/#sustainability", label: t.nav.sustainability },
];

export function Navbar() {
  const path = usePathname().replace(/(.)\/$/, "$1");
  const [open, setOpen] = useState(false);
  const member = useLunchbox((s) => s.subscription !== null);
  const hasBox = useHydrated() && member;
  const cta = hasBox ? { href: "/dashboard", label: t.nav.account } : { href: "/build-box", label: t.nav.cta };

  return (
    <header className="sticky top-0 z-40">
      <PromoBar />
      <div className="border-b border-line bg-alabaster/95 backdrop-blur">
        <div className="shell flex h-16 items-center justify-between gap-4">
          <HomeLink onNavigate={() => setOpen(false)}><Logo /></HomeLink>
          <nav aria-label="Main" className="hidden items-center gap-6 lg:flex">
            {links.map((l) => (
              <Link key={l.href} href={l.href} aria-current={path === l.href ? "page" : undefined} className="whitespace-nowrap text-sm font-medium underline-offset-8 hover:text-forest hover:underline aria-[current=page]:text-forest aria-[current=page]:underline">
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <div className="hidden md:block"><PostalPill /></div>
            <Link href={cta.href} className={button("primary", "sm", "max-[26rem]:hidden")}>{cta.label}</Link>
            <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? "Close menu" : "Open menu"} className="grid size-11 place-items-center rounded-full hover:bg-sand lg:hidden">
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
        {open && (
          <nav aria-label="Mobile" className="shell flex flex-col border-t border-line pb-5 pt-2 lg:hidden">
            {links.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="border-b border-line py-3.5 font-display text-lg font-semibold">{l.label}</Link>
            ))}
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Link href={cta.href} onClick={() => setOpen(false)} className={button("primary", "sm")}>{cta.label}</Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
