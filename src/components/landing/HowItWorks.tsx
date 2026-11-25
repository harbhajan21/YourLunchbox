import { FoodImage } from "../ui/FoodImage";
import { Rise } from "../ui/Motion";

const photo = (id: string) => `https://images.unsplash.com/photo-${id}`;
const steps = [
  { title: "Pick your plan and meals", body: "Choose 6 to 16 meals a week. Filter by protein, calories or diet, or let us fill the box.", img: photo("1498837167922-ddd27525d352"), alt: "Bowls of fresh vegetables, grains and fish" },
  { title: "We cook, you train", body: "Cooked fresh by Canadian chefs, chilled the same day, and delivered to your home, office or condo desk.", img: photo("1577219491135-ce391730fb2c"), alt: "Chef plating food at a restaurant pass" },
  { title: "Heat 2 minutes and eat", body: "Microwave or oven. Log the macros from the sleeve. No prep, no containers, no dishes.", img: photo("1517836357463-d25dfeac3438"), alt: "Athlete setting up for a deadlift" },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-y border-line bg-sand">
      <div className="shell py-20 lg:py-24">
        <h2 className="max-w-2xl text-4xl sm:text-5xl">Get your Sundays back</h2>
        <ol className="mt-10 grid gap-8 md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title}>
              <Rise delay={i * 0.08}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-line">
                  <FoodImage src={s.img} alt={s.alt} sizes="(min-width: 768px) 25rem, 92vw" />
                  <span className="absolute bottom-3 left-3 grid size-12 place-items-center rounded-full bg-saffron font-display text-xl font-bold">{i + 1}</span>
                </div>
                <h3 className="mt-5 text-2xl">{s.title}</h3>
                <p className="mt-2 max-w-sm leading-relaxed text-slate-warm">{s.body}</p>
              </Rise>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
