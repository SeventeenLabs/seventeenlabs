import type { Metadata } from "next";
import { CompanyAboutPage } from "@/components/company/about-page";
export const metadata: Metadata = {
  title: "About SeventeenLabs",
  description:
    "An independent creative software company building tools for generative media. Filmmaking is our first chapter.",
  alternates: { canonical: "/about" },
};
export default CompanyAboutPage;
