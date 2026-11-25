import { BadgeCheck } from "lucide-react";
import { reviews, REVIEWS_ARE_SAMPLES } from "@/data/reviews";

export function Reviews() {
  return (
    <section className="border-y border-line bg-white">
      <div className="shell py-20 lg:py-24">
        <h2 className="text-4xl sm:text-5xl">From the gym floor</h2>
        {REVIEWS_ARE_SAMPLES && <p className="mt-3 inline-block rounded-full bg-saffron-soft px-4 py-1.5 text-sm font-medium text-saffron-ink">Sample reviews, shown until launch</p>}
        <div className="mt-10 grid gap-x-12 gap-y-10 md:grid-cols-2">
          {reviews.map((r) => (
            <figure key={r.name} className="border-l-4 border-saffron pl-6">
              <blockquote className="font-display text-xl font-medium leading-snug sm:text-2xl">&ldquo;{r.quote}&rdquo;</blockquote>
              <figcaption className="mt-4 text-sm">
                <b>{r.name}</b>, {r.city}
                <span className="mt-1 flex items-center gap-1.5 text-slate-warm">{!REVIEWS_ARE_SAMPLES && <><BadgeCheck className="size-4 text-forest" /> Verified · </>}{r.plan}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
