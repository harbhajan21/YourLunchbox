import type { Metadata } from "next";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

export const metadata: Metadata = { title: "My Box", robots: { index: false } };

export default function Page() {
  return (
    <>
      <Navbar />
      <main id="main"><Dashboard /></main>
      <Footer />
    </>
  );
}
