import type { Metadata } from "next";
import HomePageClient from "./HomePageClient";

interface HomePageMetadataProps {
  params: Promise<{
    locale: string;
  }>;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://seventeenlabs.io";

export async function generateMetadata({ params }: HomePageMetadataProps): Promise<Metadata> {
  const { locale } = await params;
  const isGerman = locale === "de";
  const pagePath = isGerman ? "/de" : "/en";

  const title = isGerman
    ? "KI-Automatisierungsagentur für moderne Unternehmen"
    : "AI Automation Agency for Modern Businesses";

  const description = isGerman
    ? "SeventeenLabs entwickelt KI-Strategien, Audits und maßgeschneiderte Automatisierungen, damit Teams schneller skalieren und effizienter arbeiten."
    : "SeventeenLabs delivers AI strategy, audits, and custom automation to streamline operations, scale teams, and drive profitable growth.";

  return {
    title,
    description,
    keywords: isGerman
      ? [
          "KI Automatisierungsagentur",
          "Workflow Automatisierung",
          "KI Beratung",
          "Automatisierungsstrategie",
          "Prozessoptimierung",
          "n8n Workflows",
        ]
      : [
          "AI automation agency",
          "workflow automation",
          "AI consulting",
          "automation strategy",
          "process optimization",
          "n8n workflows",
        ],
    alternates: {
      canonical: `${baseUrl}${pagePath}`,
      languages: {
        en: `${baseUrl}/en`,
        de: `${baseUrl}/de`,
        "x-default": `${baseUrl}/en`,
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
          alt: "SeventeenLabs - AI Automation Agency",
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

export default function HomePage() {
  return <HomePageClient />;
}