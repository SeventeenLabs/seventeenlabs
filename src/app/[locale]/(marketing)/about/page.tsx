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
const ogImageUrl = `${baseUrl}/og-image.png`;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isGerman = locale === "de";
  const pagePath = isGerman ? "/de/about" : "/about";

  const title = isGerman
    ? "Uber SeventeenLabs | AI Produktionspipeline fur Filme und Serien"
    : "About SeventeenLabs | AI Production Pipeline for Films and Series";

  const description = isGerman
    ? "SeventeenLabs entwickelt eine AI Produktionspipeline fur Filme, Piloten, Trailer und Serien mit Szenenplanung, Kontinuitat und konsistenten Shots."
    : "SeventeenLabs builds an AI production pipeline for films, pilots, trailers, and series with scene planning, continuity, and consistent shot generation.";

  return {
    title,
    description,
    keywords: isGerman
      ? [
          "SeventeenLabs Unternehmen",
          "AI Filme erstellen",
          "AI Serien erstellen",
          "AI Produktionspipeline",
          "AI Video Produktion",
        ]
      : [
          "SeventeenLabs company",
          "AI movie creation",
          "AI series creation",
          "AI production pipeline",
          "AI video production",
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
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: "SeventeenLabs AI production pipeline for films, pilots, trailers, and series",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
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
