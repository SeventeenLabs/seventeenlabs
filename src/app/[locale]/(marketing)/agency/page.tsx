import type { Metadata } from "next";
import AgencyPageClient from "./AgencyPageClient";

interface AgencyPageProps {
  params: Promise<{
    locale: string;
  }>;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://seventeenlabs.io";

export async function generateMetadata({ params }: AgencyPageProps): Promise<Metadata> {
  const { locale } = await params;
  const isGerman = locale === "de";
  const pagePath = isGerman ? "/de/agency" : "/agency";

  const title = isGerman
    ? "KI-Automatisierungs- & Entwicklungsagentur"
    : "AI Automation & Development Agency";

  const description = isGerman
    ? "SeventeenLabs plant, entwickelt und betreibt maßgeschneiderte KI- und Automatisierungslösungen für Agenturen und schnell wachsende Teams."
    : "SeventeenLabs plans, builds, and runs bespoke AI automation solutions for agencies and fast-scaling teams.";

  return {
    title,
    description,
    keywords: isGerman
      ? [
          "KI Automatisierungsagentur",
          "Workflow Automatisierung",
          "Individuelle Softwareentwicklung",
          "n8n Agentur",
          "AI Beratung",
        ]
      : [
          "AI automation agency",
          "workflow automation",
          "custom software development",
          "n8n agency",
          "AI consulting",
        ],
    alternates: {
      canonical: `${baseUrl}${pagePath}`,
      languages: {
        en: `${baseUrl}/agency`,
        de: `${baseUrl}/de/agency`,
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
          alt: "SeventeenLabs Agency",
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

export default async function AgencyPage({ params }: AgencyPageProps) {
  const { locale } = await params;
  return <AgencyPageClient locale={locale} />;
}