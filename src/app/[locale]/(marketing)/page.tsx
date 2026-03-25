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
    ? "SeventeenLabs | Lokale KI-Operator-Software mit Relay"
    : "SeventeenLabs | Local-First AI Operator Software with Relay";

  const description = isGerman
    ? "Praktische KI-Systeme fur Unternehmen, die KI in tagliche Geschaftsprozesse integrieren. SeventeenLabs verbindet Governance, menschliche Freigabe und verantwortbare Ausfuhrung."
    : "Practical AI systems for companies integrating AI into daily business operations. SeventeenLabs combines governance, human approval, and accountable execution.";

  return {
    title,
    description,
    keywords: isGerman
      ? [
          "KI Operator Software",
          "lokal-first KI",
          "Relay by SeventeenLabs",
          "Freigabegetriebene KI Operationen",
          "AI Workflows mit Governance",
          "SeventeenLabs Produkte",
        ]
      : [
          "AI operator software",
          "local-first AI",
          "Relay by SeventeenLabs",
          "approval-driven AI operations",
          "governed AI workflows",
          "SeventeenLabs products",
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
          alt: "SeventeenLabs - Local-First AI Operator Software",
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