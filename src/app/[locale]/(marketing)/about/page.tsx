import type { Metadata } from "next";
import { AboutHero } from '@/components/about/about-hero';
import { AboutValues } from '@/components/about/about-values';
import { AboutApproach } from '@/components/about/about-approach';
import { AboutMetrics } from '@/components/about/about-metrics';
import { AboutTech } from '@/components/about/about-tech';

interface PageProps {
  params: Promise<{ locale: string }>;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://seventeenlabs.io";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isGerman = locale === "de";
  const pagePath = isGerman ? "/de/about" : "/about";

  const title = isGerman
    ? "Über SeventeenLabs | Produktstudio fur AI Operator Software"
    : "About SeventeenLabs | Product Studio for AI Operator Software";

  const description = isGerman
    ? "SeventeenLabs ist das Produktstudio hinter Relay. Wir entwickeln lokal-first AI Operator Software fur Planung, Freigaben und sichere Ausfuhrung."
    : "SeventeenLabs is the product studio behind Relay. We build local-first AI operator software for planning, approvals, and safe execution.";

  return {
    title,
    description,
    keywords: isGerman
      ? [
          "SeventeenLabs Unternehmen",
          "Relay Produkt",
          "KI Operator Plattform",
          "lokal-first KI Software",
          "Freigabegetriebene KI Operationen",
        ]
      : [
          "SeventeenLabs company",
          "Relay product",
          "AI operator platform",
          "local-first AI software",
          "approval-driven AI operations",
        ],
    alternates: {
      canonical: `${baseUrl}${pagePath}`,
      languages: {
        en: `${baseUrl}/about`,
        de: `${baseUrl}/de/about`,
        "x-default": `${baseUrl}/about`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}${pagePath}`,
      siteName: "SeventeenLabs",
      type: "website",
      locale: isGerman ? "de_DE" : "en_US",
      images: [
        {
          url: `${baseUrl}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: "SeventeenLabs About Page",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${baseUrl}/opengraph-image`],
    },
  };
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;

  return (
    <main className="min-h-screen">
      <AboutHero locale={locale} />
      <AboutValues locale={locale} />
      <AboutApproach locale={locale} />
      <AboutMetrics locale={locale} />
      <AboutTech locale={locale} />
    </main>
  );
}
