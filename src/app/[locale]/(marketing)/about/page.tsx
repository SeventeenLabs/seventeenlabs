import type { Metadata } from "next";
import LandingHeader from '@/components/landing-header';
import { AboutHero } from '@/components/about/about-hero';
import { AboutValues } from '@/components/about/about-values';
import { AboutApproach } from '@/components/about/about-approach';
import { AboutMetrics } from '@/components/about/about-metrics';
import { AboutTech } from '@/components/about/about-tech';
import { AboutCTA } from '@/components/about/about-cta';
import SiteFooter from '@/components/site-footer';

interface PageProps {
  params: Promise<{ locale: string }>;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://seventeenlabs.io";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isGerman = locale === "de";
  const pagePath = isGerman ? "/de/about" : "/about";

  const title = isGerman
    ? "Über SeventeenLabs | KI-Automatisierungsteam"
    : "About SeventeenLabs | AI Automation Team";

  const description = isGerman
    ? "Lernen Sie das Team hinter SeventeenLabs kennen. Wir kombinieren KI-Strategie, Workflow-Automatisierung und Full-Stack-Entwicklung, um Unternehmen schneller skalieren zu lassen."
    : "Meet the SeventeenLabs team. We blend AI strategy, workflow automation, and full-stack development to help companies scale faster.";

  return {
    title,
    description,
    keywords: isGerman
      ? [
          "SeventeenLabs Team",
          "KI Automatisierung Agentur",
          "AI Experten",
          "Automatisierungsagentur",
          "Digitale Transformation",
        ]
      : [
          "SeventeenLabs team",
          "AI automation agency",
          "automation experts",
          "AI implementation",
          "digital transformation",
        ],
    alternates: {
      canonical: `${baseUrl}${pagePath}`,
      languages: {
        en: `${baseUrl}/about`,
        de: `${baseUrl}/de/about`,
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
    <>
      <LandingHeader />
      <main className="min-h-screen">
        <AboutHero locale={locale} />
        <AboutValues locale={locale} />
        <AboutApproach locale={locale} />
        <AboutMetrics locale={locale} />
        <AboutTech locale={locale} />
        <AboutCTA locale={locale} />
      </main>
      <SiteFooter />
    </>
  );
}
