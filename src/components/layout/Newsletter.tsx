"use client";

import { useState, type FormEvent } from "react";
import { emailSchema } from "@/lib/schemas";
import { button } from "../ui/button";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "error" | "done">("idle");
  /** Connect to your email provider here. */
  function submit(e: FormEvent) {
    e.preventDefault();
    setState(emailSchema.safeParse(email).success ? "done" : "error");
  }
  return (
    <form onSubmit={submit} noValidate>
      <label htmlFor="news" className="font-display text-lg font-bold">Next week&apos;s menu, every Thursday</label>
      <div className="mt-3 flex gap-2">
        <input id="news" type="email" autoComplete="email" placeholder="you@email.com" value={email} onChange={(e) => { setEmail(e.target.value); setState("idle"); }} className="h-12 w-full min-w-0 rounded-full border border-white/40 bg-white/10 px-5 text-white placeholder:text-white/70" />
        <button type="submit" className={button("light")}>Sign up</button>
      </div>
      <p role="status" className="mt-2 min-h-5 text-sm text-sage">{state === "done" ? "Thanks. You're on the list." : state === "error" ? "Enter a valid email address." : ""}</p>
    </form>
  );
}
