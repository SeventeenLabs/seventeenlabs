import type { Metadata } from "next";
import LandingHeader from "@/components/landing-header";
import SiteFooter from "@/components/site-footer";
import CaseStudiesHero from "@/components/case-studies/case-studies-hero";
import CaseStudiesList from "@/components/case-studies/case-studies-list";
import CaseStudiesCTA from "@/components/case-studies/case-studies-cta";

interface CaseStudiesPageProps {
  params: Promise<{
    locale: string;
  }>;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://seventeenlabs.io";

export async function generateMetadata({ params }: CaseStudiesPageProps): Promise<Metadata> {
  const { locale } = await params;
  const isGerman = locale === "de";
  const pagePath = isGerman ? "/de/case-studies" : "/case-studies";

  const title = isGerman
    ? "Erfolgsgeschichten | KI-Automatisierung Fallstudien"
    : "Case Studies | AI Automation Success Stories";

  const description = isGerman
    ? "Sehen Sie, wie Unternehmen mit SeventeenLabs Automatisierungen Hunderte von Stunden gespart und ihre Effizienz um 40-70% gesteigert haben."
    : "See how businesses saved hundreds of hours and increased efficiency by 40-70% with SeventeenLabs AI automation solutions.";

  return {
    title,
    description,
    keywords: isGerman
      ? [
          "KI Automatisierung Fallstudien",
          "Erfolgsgeschichten",
          "Automatisierung ROI",
          "Kundenberichte",
        ]
      : [
          "AI automation case studies",
          "success stories",
          "automation ROI",
          "client results",
        ],
    alternates: {
      canonical: `${baseUrl}${pagePath}`,
      languages: {
        en: `${baseUrl}/case-studies`,
        de: `${baseUrl}/de/case-studies`,
        "x-default": `${baseUrl}/case-studies`,
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
          alt: "SeventeenLabs Case Studies",
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

export default async function CaseStudiesPage({ params }: CaseStudiesPageProps) {
  const { locale } = await params;

  return (
    <>
      <LandingHeader />
      <main className="min-h-screen bg-black">
        <CaseStudiesHero locale={locale} />
        <CaseStudiesList locale={locale} />
        <CaseStudiesCTA locale={locale} />
      </main>
      <SiteFooter />
    </>
  );
}
