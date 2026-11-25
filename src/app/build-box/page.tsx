import type { Metadata } from "next";
import { BuilderFlow } from "@/components/builder/BuilderFlow";

export const metadata: Metadata = { title: "Build Your Box" };

export default function BuildBoxPage() {
  return <BuilderFlow />;
}
