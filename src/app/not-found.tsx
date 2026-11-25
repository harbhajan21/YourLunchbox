import Link from "next/link";
import { button } from "@/components/ui/button";
import { LogoMark } from "@/components/ui/Logo";

export default function NotFound() {
  return (
    <main id="main" className="grid min-h-dvh place-content-center justify-items-center gap-4 p-6 text-center">
      <LogoMark className="size-20" />
      <h1 className="text-4xl">This page isn&apos;t on the menu</h1>
      <Link href="/menu" className={button("primary")}>See this week&apos;s menu</Link>
    </main>
  );
}
