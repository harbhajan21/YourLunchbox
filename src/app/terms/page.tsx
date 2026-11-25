import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";

export const metadata: Metadata = { title: "Terms" };

export default function TermsPage() {
  return <LegalPage title="Terms" sections={[
    ["Your subscription", "YourLunchbox is a weekly subscription in Canadian dollars. It renews each week until you pause or cancel."],
    ["Changes and cancellation", "Skip, pause or cancel before Wednesday at 11:59 PM Eastern and it applies to your next delivery. Boxes past the cutoff are already being prepared and can't be refunded for a change of mind."],
    ["Introductory offer", "LUNCH50 takes 50% off the meals in your first box. Add-ons are not discounted. Later boxes are charged at the regular price shown at checkout."],
    ["Delivery area", "We currently deliver only in downtown Toronto. Delivery is free."],
    ["Allergens", "All meals are made in a shared kitchen that handles every priority allergen. We can't guarantee any meal is free of traces."],
  ]} />;
}
