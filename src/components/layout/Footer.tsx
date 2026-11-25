import { ShieldCheck } from "lucide-react";
import Link from "next/link";
import { t } from "@/i18n";
import { HomeLink } from "../ui/HomeLink";
import { Logo } from "../ui/Logo";
import { MadeInCanada } from "../ui/MadeInCanada";
import { Newsletter } from "./Newsletter";

const columns = [
  { title: "Eat", links: [["Weekly Menu", "/menu"], ["Plans & Pricing", "/#plans"], ["Build Your Box", "/build-box"]] },
  { title: "Learn", links: [["How It Works", "/#how-it-works"], ["Macro calculator", "/#macros"], ["Sustainability", "/#sustainability"], ["FAQ", "/#faq"]] },
  { title: "Account", links: [["My box", "/dashboard"], ["Terms", "/terms"], ["Privacy", "/privacy"]] },
];
/** Point these at your handles once they exist. */
const socials = [["Instagram", "https://www.instagram.com/"], ["TikTok", "https://www.tiktok.com/"], ["YouTube", "https://www.youtube.com/"]];

export function Footer() {
  return (
    <footer className="bg-forest-deep text-white">
      <div className="shell grid gap-12 py-16 lg:grid-cols-[1.3fr_1.7fr]">
        <div className="max-w-md">
          <HomeLink className="inline-block"><Logo inverse /></HomeLink>
          <p className="mb-8 mt-4 text-sage">{t.footer.tagline}</p>
          <Newsletter />
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {columns.map((c) => (
            <nav key={c.title} aria-label={c.title}>
              <p className="font-display font-bold">{c.title}</p>
              <ul className="mt-2">
                {c.links.map(([label, href]) => <li key={href}><Link href={href} className="inline-block py-1.5 text-sm text-sage hover:text-white hover:underline">{label}</Link></li>)}
              </ul>
            </nav>
          ))}
          <nav aria-label="Social">
            <p className="font-display font-bold">Follow</p>
            <ul className="mt-2">
              {socials.map(([label, href]) => <li key={href}><a href={href} target="_blank" rel="noreferrer" className="inline-block py-1.5 text-sm text-sage hover:text-white hover:underline">{label}</a></li>)}
            </ul>
          </nav>
        </div>
      </div>
      <div className="border-t border-white/15">
        <div className="shell flex flex-wrap items-center justify-between gap-4 py-6 text-sm text-sage">
          <p className="inline-flex items-center gap-2"><ShieldCheck className="size-5 text-saffron" /> Prepared to Canadian food safety standards</p>
          <MadeInCanada className="text-white" />
          <p>© 2026 YourLunchbox · Prices in CAD</p>
        </div>
      </div>
    </footer>
  );
}
