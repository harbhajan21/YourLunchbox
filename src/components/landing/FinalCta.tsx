import { LeadForm } from "../ui/LeadForm";

export function FinalCta() {
  return (
    <section className="bg-forest text-white">
      <div className="shell grid gap-8 py-20 lg:grid-cols-2 lg:items-center">
        <h2 className="text-5xl leading-none sm:text-7xl">Your next set of meals is ready.</h2>
        <LeadForm inverse />
      </div>
    </section>
  );
}
