import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agency Automation Blueprint | Seventeen Labs",
  description: "Get your Agency Automation Blueprint - 3 high-impact automation opportunities custom-built for your agency. Save 15+ hours per week and increase revenue by 30%. Delivered in 5-7 days.",
  keywords: ["agency automation", "automation blueprint", "AI for agencies", "workflow optimization", "agency efficiency"],
  openGraph: {
    title: "Agency Automation Blueprint | Seventeen Labs",
    description: "Get your custom Agency Automation Blueprint. 3 high-impact automations to save time and scale your agency.",
    type: "website",
  },
};

export default function AuditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
