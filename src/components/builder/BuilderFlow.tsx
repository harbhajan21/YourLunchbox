"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { HomeLink } from "../ui/HomeLink";
import { useEffect, useState } from "react";
import { getPlan } from "@/data/plans";
import { formatCad } from "@/lib/format";
import { countOf } from "@/lib/meals";
import { checkZone } from "@/lib/postal";
import { useHydrated, useLunchbox, type Step } from "@/store/useLunchbox";
import { button } from "../ui/button";
import { Logo, LogoMark } from "../ui/Logo";
import { AddOnsSheet } from "./AddOnsSheet";
import { OrderSummary, useQuote } from "./OrderSummary";
import { ProgressBar } from "./ProgressBar";
import { StepCheckout } from "./StepCheckout";
import { StepDelivery } from "./StepDelivery";
import { remainingMessage, StepFill } from "./StepFill";
import { StepPlan } from "./StepPlan";

const nextLabel: Record<Step, string> = { 1: "Continue to delivery", 2: "Continue to meals", 3: "Continue to checkout", 4: "" };

function Flow() {
  const step = useLunchbox((s) => s.step);
  const postal = useLunchbox((s) => s.postal);
  const picked = useLunchbox((s) => countOf(s.selections));
  const size = useLunchbox((s) => getPlan(s.planId).meals);
  const set = useLunchbox((s) => s.set);
  const q = useQuote();
  const [tried, setTried] = useState(false);
  const [placed, setPlaced] = useState(false);
  const [drawer, setDrawer] = useState<"closed" | "browse" | "gate">("closed");

  const allowed: Step = !checkZone(postal).ok ? 2 : picked !== size ? 3 : 4;
  const current = Math.min(step, allowed) as Step;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [current]);

  function go(s: Step) {
    setTried(false);
    setDrawer("closed");
    set({ step: s });
  }
  function next() {
    if (current === 1) return go(2);
    if (current === 2 && allowed >= 3) return go(3);
    if (current === 3 && allowed === 4) return setDrawer("gate");
    setTried(true);
  }

  if (placed)
    return <main id="main" className="grid min-h-dvh place-items-center"><p role="status" className="text-center font-display text-xl font-bold"><LogoMark className="mx-auto mb-4 size-16 animate-pulse" />Confirming your box…</p></main>;

  const blocked = current === 3 && allowed < 4;
  return (
    <>
      <header className="sticky top-0 z-30 border-b border-line bg-alabaster">
        <div className="shell flex h-[4.6rem] items-center justify-between gap-5 sm:h-20">
          <HomeLink className="shrink-0"><span className="sm:hidden"><LogoMark className="size-9" /></span><Logo className="max-sm:hidden" /></HomeLink>
          <ProgressBar step={current} allowed={allowed} onGo={go} />
        </div>
      </header>
      <main id="main" className="shell grid gap-10 pb-40 pt-8 lg:grid-cols-[1fr_21.5rem] lg:pb-16 lg:pt-12">
        <div className="min-w-0">
          {current === 1 && <StepPlan />}
          {current === 2 && <StepDelivery showErrors={tried} />}
          {current === 3 && <StepFill showErrors={tried && blocked} onAddOns={() => setDrawer("browse")} />}
          {current === 4 && <StepCheckout onGo={go} onPlaced={() => setPlaced(true)} />}
          {current > 1 && <button type="button" onClick={() => go((current - 1) as Step)} className={button("ghost", "md", "-ml-5 mt-8")}><ArrowLeft className="size-4" /> Back</button>}
        </div>
        <aside aria-label="Order summary">
          <div className="space-y-4 lg:sticky lg:top-28">
            <OrderSummary showItems={current !== 4} />
            {current < 4 && (
              <div className="max-lg:hidden">
                <button type="button" aria-disabled={blocked} onClick={next} className={button("primary", "lg", "w-full")}>{nextLabel[current]} <ArrowRight className="size-5" /></button>
                {blocked && <p className="mt-2 text-center text-sm text-slate-warm">{remainingMessage(picked, size)}</p>}
              </div>
            )}
          </div>
        </aside>
      </main>
      {current < 4 && (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white px-5 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 lg:hidden">
          {tried && current < 4 && (current === 2 || blocked) && <p role="alert" className="mb-2 text-center text-sm font-semibold text-danger">{current === 2 ? checkZone(postal).message : remainingMessage(picked, size)}</p>}
          <div className="flex items-center justify-between gap-3">
            <div className="tabular-nums">
              <p className="font-display text-lg font-bold leading-tight">{current === 3 ? `${picked} of ${size} meals` : formatCad(q.total)}</p>
              <p className="text-sm text-slate-warm">{current === 3 ? `${formatCad(q.total)} first box` : "first box"}</p>
            </div>
            <button type="button" aria-disabled={blocked} onClick={next} className={button("primary", "md")}>Continue <ArrowRight className="size-4" /></button>
          </div>
          {current === 3 && <div aria-hidden="true" className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-line"><div className="h-full bg-forest transition-[width] duration-300" style={{ width: `${Math.min(100, (picked / size) * 100)}%` }} /></div>}
        </div>
      )}
      <AddOnsSheet open={drawer !== "closed"} onClose={() => setDrawer("closed")} onContinue={drawer === "gate" ? () => go(4) : null} />
    </>
  );
}

export function BuilderFlow() {
  const hydrated = useHydrated();
  if (!hydrated) return <main id="main" className="grid min-h-dvh place-items-center"><LogoMark className="size-16 animate-pulse" /></main>;
  return <Flow />;
}
