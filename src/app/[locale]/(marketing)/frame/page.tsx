import type { Metadata } from "next";
import { CompanyProductPage } from "@/components/company/product-page";

export const metadata: Metadata = {
  title: { absolute: "Frame — the generative video editor | SeventeenLabs" },
  description:
    "A new kind of timeline. Explore Frame, the generative video editor in development at SeventeenLabs.",
  alternates: { canonical: "/frame" },
};

export default CompanyProductPage;
