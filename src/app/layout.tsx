import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import type { ReactNode } from "react";
import { MotionRoot } from "@/components/ui/Motion";
import { StoreHydrator } from "@/components/ui/StoreHydrator";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL ?? "https://yourlunchbox.ca"),
  title: { default: "YourLunchbox | High-protein meal prep, delivered in downtown Toronto", template: "%s | YourLunchbox" },
  description: "Chef-cooked, high-protein lunches and dinners made in Canada and delivered fresh in downtown Toronto. Full macros on every meal. Ready in 2 minutes.",
  // Remove this line at launch so search engines can list the site.
  robots: { index: false, follow: false },
  openGraph: { type: "website", locale: "en_CA", siteName: "YourLunchbox", images: [{ url: "/og.png", width: 1200, height: 630, alt: "YourLunchbox. You lift. We prep." }] },
  twitter: { card: "summary_large_image" },
};
export const viewport: Viewport = { themeColor: "#1B4332" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-CA" data-scroll-behavior="smooth" className={`${inter.variable} ${outfit.variable}`}>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2">Skip to content</a>
        <StoreHydrator />
        <MotionRoot>{children}</MotionRoot>
      </body>
    </html>
  );
}
