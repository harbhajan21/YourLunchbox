import type { Metadata } from "next";
import { Confirmation } from "@/components/dashboard/Confirmation";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

export const metadata: Metadata = { title: "Order Confirmed", robots: { index: false } };

export default function Page() {
  return (
    <>
      <Navbar />
      <main id="main"><Confirmation /></main>
      <Footer />
    </>
  );
}
