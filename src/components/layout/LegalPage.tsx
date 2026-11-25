import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

export function LegalPage({ title, sections }: { title: string; sections: [string, string][] }) {
  return (
    <>
      <Navbar />
      <main id="main" className="shell max-w-3xl! py-16">
        <h1 className="text-5xl">{title}</h1>
        <p className="mt-4 rounded-xl bg-saffron-soft px-4 py-3 text-sm text-saffron-ink">Draft for review. Have a lawyer confirm this before launch.</p>
        {sections.map(([h, p]) => <section key={h} className="mt-8"><h2 className="text-2xl">{h}</h2><p className="mt-2 leading-relaxed text-slate-warm">{p}</p></section>)}
      </main>
      <Footer />
    </>
  );
}
