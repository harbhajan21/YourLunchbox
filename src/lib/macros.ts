export type Goal = "cut" | "maintain" | "build";
export interface MacroProfile {
  weightKg: number;
  goal: Goal;
  sessions: number;
}

export const goalInfo: Record<Goal, { label: string; proteinPerKg: number; kcalShift: number }> = {
  cut: { label: "Cut", proteinPerKg: 2.2, kcalShift: -400 },
  maintain: { label: "Maintain", proteinPerKg: 1.8, kcalShift: 0 },
  build: { label: "Build", proteinPerKg: 2.0, kcalShift: 300 },
};

/** Rule-of-thumb estimate: 28 kcal/kg base + 2 kcal/kg for weekly training sessions. */
export function targets(p: MacroProfile): { protein: number; calories: number } {
  const g = goalInfo[p.goal];
  return {
    protein: Math.round((p.weightKg * g.proteinPerKg) / 5) * 5,
    calories: Math.round((p.weightKg * (28 + p.sessions) + g.kcalShift) / 50) * 50,
  };
}
