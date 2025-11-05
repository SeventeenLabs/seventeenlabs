import type { Metadata } from "next";
import AppsPageClient from "./AppsPageClient";

interface AppsPageProps {
  params: Promise<{
    locale: string;
  }>;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://seventeenlabs.io";

export async function generateMetadata({ params }: AppsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const isGerman = locale === "de";
  const pagePath = isGerman ? "/de/apps" : "/apps";

  const title = isGerman
    ? "AI-gestützte Kunden- & Automatisierungstools"
    : "AI Apps & Automation Tools for Agencies";

  const description = isGerman
    ? "Entdecken Sie AI-gestützte Produkte von SeventeenLabs für Feedback-Analyse, Kundenkommunikation und automatisierte Workflows."
    : "Explore SeventeenLabs AI-powered apps for feedback analysis, customer responses, and automated workflows.";

  return {
    title,
    description,
    keywords: isGerman
      ? [
          "AI Tools",
          "Automatisierung Apps",
          "Kundenfeedback Plattform",
          "Agentur Software",
          "KI Produkte",
        ]
      : [
          "AI tools",
          "automation apps",
          "customer feedback platform",
          "agency software",
          "AI products",
        ],
    alternates: {
      canonical: `${baseUrl}${pagePath}`,
      languages: {
        en: `${baseUrl}/apps`,
        de: `${baseUrl}/de/apps`,
      },
    },
    openGraph: {
      title: `${title} | SeventeenLabs`,
      description,
      url: `${baseUrl}${pagePath}`,
      type: "website",
      siteName: "SeventeenLabs",
      locale: isGerman ? "de_DE" : "en_US",
      images: [
        {
          url: `${baseUrl}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: "SeventeenLabs Apps",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | SeventeenLabs`,
      description,
      images: [`${baseUrl}/opengraph-image`],
    },
  };
}

export default async function AppsPage({ params }: AppsPageProps) {
  const { locale } = await params;
  return <AppsPageClient locale={locale} />;
}