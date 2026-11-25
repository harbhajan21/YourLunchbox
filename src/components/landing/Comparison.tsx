import { plans } from "@/data/plans";
import { formatCad } from "@/lib/format";

const low = formatCad(Math.min(...plans.map((p) => p.pricePerMeal)));
const high = formatCad(Math.max(...plans.map((p) => p.pricePerMeal)));
const heads = ["YourLunchbox", "Meal kits", "Takeout & apps"];
const rows: [string, string, string, string][] = [
  ["Time to eat", "2 minutes", "30 to 45 minutes", "30 to 60 minutes"],
  ["Cost per meal (CAD)", `${low} to ${high}, delivery included`, "$11 to $15, plus your time", "$20 to $30 with fees and tip"],
  ["Fresh or frozen", "Fresh, never frozen", "Fresh, you cook it", "Varies"],
  ["Macros", "Full label on every meal", "Usually listed", "Rarely listed"],
  ["Protein", "Up to 54 g a meal", "Depends on the recipe", "Anyone's guess"],
  ["Packaging", "Recyclable trays and sleeves", "Many small pouches", "Mixed, often landfill"],
  ["Dishes", "None", "A sink full", "None"],
];

export function Comparison() {
  return (
    <section className="border-t border-line bg-sand">
      <div className="shell py-20 lg:py-24">
        <h2 className="text-4xl sm:text-5xl">Why YourLunchbox?</h2>
        <div className="relative mt-10 overflow-x-auto rounded-3xl border border-line bg-white" role="region" aria-label="Comparison table" tabIndex={0}>
          <table className="w-full min-w-[46rem] text-left">
            <thead>
              <tr>
                <td className="p-5" />
                {heads.map((h, i) => <th key={h} scope="col" className={i === 0 ? "bg-forest p-5 font-display text-lg text-white" : "p-5 font-display text-lg"}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {rows.map(([label, ...cells]) => (
                <tr key={label} className="border-t border-line">
                  <th scope="row" className="p-5 text-sm font-medium text-slate-warm">{label}</th>
                  {cells.map((c, i) => <td key={i} className={i === 0 ? "bg-sage p-5 font-semibold text-forest" : "p-5"}>{c}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm text-slate-warm">Kit and takeout figures are typical ranges, not quotes from a specific company.</p>
      </div>
    </section>
  );
}
