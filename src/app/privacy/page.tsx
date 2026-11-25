import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";

export const metadata: Metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return <LegalPage title="Privacy" sections={[
    ["What this version stores", "Your box, filters, delivery details and sample order are kept in this browser's local storage. Clearing site data removes them."],
    ["What is sent", "Nothing you enter is sent to us in this version. Meal photos load from Unsplash and the site is hosted on GitHub Pages, so both can see standard connection details such as your IP address."],
    ["Payment", "This is a demo checkout. Card details never leave the page and are not stored."],
  ]} />;
}
