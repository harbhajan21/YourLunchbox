import { Package, Sprout, Truck } from "lucide-react";
import { FoodImage } from "../ui/FoodImage";

const points = [
  { icon: Package, title: "Recyclable trays and sleeves", body: "Designed for the blue bin. Rinse, flatten, done." },
  { icon: Sprout, title: "Canadian first", body: "Alberta beef, Ontario chicken, Nova Scotia haddock and prairie pulses, in season wherever we can." },
  { icon: Truck, title: "Cooked to order", body: "We cook what was ordered by Wednesday night, so there's no shelf of unsold meals." },
];

export function Sustainability() {
  return (
    <section id="sustainability" className="shell grid gap-12 py-20 lg:grid-cols-2 lg:items-center lg:py-24">
      <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem]">
        <FoodImage src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd" alt="Grain bowl with avocado, chickpeas and vegetables" sizes="(min-width: 1024px) 37rem, 92vw" />
      </div>
      <div>
        <h2 className="text-4xl sm:text-5xl">Less waste than your meal-prep Sunday</h2>
        <ul className="mt-8 space-y-6">
          {points.map(({ icon: Icon, title, body }) => (
            <li key={title} className="flex gap-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-sage text-forest"><Icon className="size-6" /></span>
              <div><h3 className="text-xl">{title}</h3><p className="mt-1 text-slate-warm">{body}</p></div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
