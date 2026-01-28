import type { Metadata } from "next";
import HomePageClient from "./HomePageClient";
import { getAllPosts } from "@/lib/notion-blog";

interface HomePageMetadataProps {
  params: Promise<{
    locale: string;
  }>;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://seventeenlabs.io";

export async function generateMetadata({ params }: HomePageMetadataProps): Promise<Metadata> {
  const { locale } = await params;
  const isGerman = locale === "de";
  const pagePath = isGerman ? "/de" : "/";

  const title = isGerman
    ? "Sparen Sie 20+ Stunden pro Woche mit KI-Automatisierung | SeventeenLabs"
    : "Save 20+ Hours Every Week with AI Automation | SeventeenLabs";

  const description = isGerman
    ? "Für Marketing-Agenturen, Berater & SaaS-Unternehmen, die Automatisierung wollen, die wirklich funktioniert. Messbare Ergebnisse in Wochen, nicht Monaten."
    : "For marketing agencies, consultants & SaaS companies who want automation that actually works. Get measurable results in weeks, not months.";

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
        en: `${baseUrl}/`,
        de: `${baseUrl}/de`,
        "x-default": `${baseUrl}/`,
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

export default async function HomePage() {
  const posts = await getAllPosts();
  const latestPosts = posts.slice(0, 3);
  
  return <HomePageClient latestPosts={latestPosts} />;
}