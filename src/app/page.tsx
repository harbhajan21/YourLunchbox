import { Comparison } from "@/components/landing/Comparison";
import { FaqSection } from "@/components/landing/FaqSection";
import { FinalCta } from "@/components/landing/FinalCta";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { MacroCalculator } from "@/components/landing/MacroCalculator";
import { MenuPreview } from "@/components/landing/MenuPreview";
import { PlansSection } from "@/components/landing/PlansSection";
import { Reviews } from "@/components/landing/Reviews";
import { Sustainability } from "@/components/landing/Sustainability";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <HowItWorks />
        <MenuPreview />
        <MacroCalculator />
        <PlansSection />
        <Comparison />
        <Sustainability />
        <Reviews />
        <FaqSection />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
