import type { Nutrition } from "@/data/types";

/** Protein leads; everything else supports. */
export function Macros({ n }: { n: Nutrition }) {
  const rest: [string, string][] = [
    ["Carbs", `${n.carbs} g`],
    ["Fat", `${n.fat} g`],
    ["Energy", `${n.calories} kcal`],
  ];
  return (
    <dl className="flex items-stretch gap-3 tabular-nums">
      <div className="flex flex-col-reverse justify-center rounded-lg bg-sage px-2.5 py-1 text-forest">
        <dt className="text-xs">Protein</dt>
        <dd className="font-display text-lg font-bold leading-tight">{n.protein} g</dd>
      </div>
      {rest.map(([k, v]) => (
        <div key={k} className="flex flex-col-reverse justify-center">
          <dt className="text-xs text-slate-warm">{k}</dt>
          <dd className="whitespace-nowrap text-sm font-semibold">{v}</dd>
        </div>
      ))}
    </dl>
  );
}
