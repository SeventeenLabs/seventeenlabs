import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function WorkflowsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import WorkflowsHeader from "@/components/workflows-header";
import WorkflowsFooter from "@/components/workflows-footer";
import { PurchaseProvider } from "@/contexts/purchase-context";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Workflows | SeventeenLabs - Professional N8N Templates",
  description: "Browse our collection of proven N8N workflow templates. Professional automation solutions for sales, marketing, e-commerce, and more. Copy, customize, and deploy workflows that work.",
  keywords: "N8N workflows, automation templates, workflow database, business automation, sales workflows, marketing automation, CRM integration, e-commerce automation",
  authors: [{ name: "SeventeenLabs" }],
  creator: "SeventeenLabs",
  publisher: "SeventeenLabs",
  openGraph: {
    title: "Workflows | SeventeenLabs - Professional N8N Templates",
    description: "Browse our collection of proven N8N workflow templates. Professional automation solutions for your business.",
    url: "https://workflows.seventeenlabs.io",
    siteName: "SeventeenLabs Workflows",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Workflows | SeventeenLabs - Professional N8N Templates",
    description: "Browse our collection of proven N8N workflow templates. Professional automation solutions for your business.",
  },
};

export default function WorkflowsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${plusJakartaSans.variable} font-sans`}>
      <PurchaseProvider>
        <div className="flex min-h-screen flex-col">
          <WorkflowsHeader />
          <div className="flex-1">
            {children}
          </div>
          <WorkflowsFooter />
        </div>
      </PurchaseProvider>
    </div>
  );
}