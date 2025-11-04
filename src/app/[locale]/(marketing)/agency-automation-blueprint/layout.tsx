import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://seventeenlabs.io';

export const metadata: Metadata = {
  title: "Agency Automation Blueprint - Save 15+ Hours/Week | Seventeen Labs",
  description: "Get your Agency Automation Blueprint - 3 high-impact automation opportunities custom-built for your agency. Save 15+ hours per week and increase revenue by 30%. Delivered in 5-7 days. $499 early adopter pricing.",
  keywords: [
    "agency automation",
    "automation blueprint",
    "AI for agencies",
    "workflow optimization",
    "agency efficiency",
    "marketing agency automation",
    "agency AI tools",
    "workflow automation",
    "agency productivity",
    "automation consulting"
  ],
  authors: [{ name: "Seventeen Labs" }],
  creator: "Seventeen Labs",
  publisher: "Seventeen Labs",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Agency Automation Blueprint - Save 15+ Hours/Week",
    description: "Get your custom Agency Automation Blueprint. 3 high-impact automations to save time and scale your agency. $499 early adopter pricing.",
    url: `${baseUrl}/agency-automation-blueprint`,
    siteName: "Seventeen Labs",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${baseUrl}/agency-automation-blueprint/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Agency Automation Blueprint - Seventeen Labs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Agency Automation Blueprint - Save 15+ Hours/Week",
    description: "Get 3 custom automation opportunities to save time and scale your agency. $499 early adopter pricing.",
    creator: "@seventeenlabs",
    images: [`${baseUrl}/agency-automation-blueprint/opengraph-image`],
  },
  alternates: {
    canonical: `${baseUrl}/agency-automation-blueprint`,
    languages: {
      'en': `${baseUrl}/en/agency-automation-blueprint`,
      'de': `${baseUrl}/de/agency-automation-blueprint`,
    },
  },
};

export default function AuditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
