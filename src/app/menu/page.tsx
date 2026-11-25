import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { MenuCatalog } from "@/components/menu/MenuCatalog";
import { meals } from "@/data/meals";

export const metadata: Metadata = { title: "Weekly Menu", description: "Every meal this week, with full macros, ingredients and allergens." };

export default function MenuPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <div className="border-b border-line bg-sand">
          <div className="shell py-12 sm:py-16">
            <h1 className="text-4xl sm:text-6xl">This week&apos;s menu</h1>
            <p className="mt-3 max-w-xl text-lg text-slate-warm">{meals.length} chef-cooked meals. Filter by how you eat, sort by protein, and start filling your box.</p>
          </div>
        </div>
        <MenuCatalog />
      </main>
      <Footer />
    </>
  );
}
