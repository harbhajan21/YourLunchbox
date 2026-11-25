import { t } from "@/i18n";
import { MapPin } from "lucide-react";
import { MadeInCanada } from "../ui/MadeInCanada";
import { LeadForm } from "../ui/LeadForm";
import { HeroLunchbox } from "./HeroLunchbox";

export function Hero() {
  return (
    <section className="overflow-hidden">
      <div className="shell grid items-center gap-12 pb-20 pt-12 lg:grid-cols-[1.02fr_1fr] lg:gap-16 lg:pb-24 lg:pt-14">
        <div>
          <h1 className="text-[clamp(3.6rem,9vw,7.2rem)] font-extrabold leading-[0.92] tracking-[-0.03em] [word-spacing:0.06em] text-forest">
            {t.hero.title.map((line) => <span key={line} className="block">{line}</span>)}
          </h1>
          <p className="mb-7 mt-6 max-w-xl text-lg leading-relaxed sm:text-xl">{t.hero.body}</p>
          <LeadForm />
          <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-3">
            <MadeInCanada />
            <p className="inline-flex items-center gap-2 font-semibold"><MapPin className="size-5 text-forest" /> {t.hero.area}</p>
          </div>
        </div>
        <HeroLunchbox />
      </div>
    </section>
  );
}
