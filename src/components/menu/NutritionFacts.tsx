import type { Meal } from "@/data/types";

/** Health Canada style table. Daily values: fat 75 g, saturates 20 g, fibre 28 g, sugars 100 g, sodium 2300 mg, potassium 3400 mg, calcium 1300 mg, iron 18 mg. */
export function NutritionFacts({ meal }: { meal: Meal }) {
  const n = meal.nutrition;
  const pct = (v: number, dv: number) => `${Math.round((v / dv) * 100)} %`;
  const rows: [label: string, amount: string, dv: string, indent?: boolean, heavy?: boolean][] = [
    ["Fat", `${n.fat} g`, pct(n.fat, 75)],
    ["Saturated", `${n.saturatedFat} g`, pct(n.saturatedFat, 20), true],
    ["+ Trans", "0 g", "", true],
    ["Carbohydrate", `${n.carbs} g`, "", false, true],
    ["Fibre", `${n.fibre} g`, pct(n.fibre, 28), true],
    ["Sugars", `${n.sugars} g`, pct(n.sugars, 100), true],
    ["Protein", `${n.protein} g`, "", false, true],
    ["Sodium", `${n.sodium} mg`, pct(n.sodium, 2300), false, true],
    ["Potassium", `${n.potassium} mg`, pct(n.potassium, 3400)],
    ["Calcium", `${n.calcium} mg`, pct(n.calcium, 1300)],
    ["Iron", `${n.iron} mg`, pct(n.iron, 18)],
  ];
  return (
    <div className="max-w-sm border-2 border-espresso bg-white p-3 text-sm tabular-nums">
      <p className="font-sans text-2xl font-extrabold leading-none">Nutrition Facts</p>
      <p className="mt-1">Per 1 meal ({meal.servingGrams} g)</p>
      <table className="mt-1 w-full">
        <thead>
          <tr className="border-b-4 border-t border-espresso align-bottom">
            <th scope="col" className="py-1 text-left text-xl font-extrabold">Calories {n.calories}</th>
            <th scope="col" className="text-right text-xs font-bold">% Daily Value*</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([label, amount, dv, indent, heavy]) => (
            <tr key={label} className={heavy ? "border-t-2 border-espresso" : "border-t border-espresso/30"}>
              <th scope="row" className={indent ? "py-0.5 pl-4 text-left font-normal" : "py-0.5 text-left font-bold"}>
                {label} <span className="font-normal">{amount}</span>
              </th>
              <td className="text-right">{dv}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-1 border-t-4 border-espresso pt-1.5 text-xs">*5% or less is <b>a little</b>, 15% or more is <b>a lot</b></p>
    </div>
  );
}
