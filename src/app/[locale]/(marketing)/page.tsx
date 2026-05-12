import type { Metadata } from "next";
import SeventeenLabsLanding from "@/components/seventeenlabs-landing";
import type { Locale } from "@/lib/i18n/config";

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
    ? "SeventeenLabs | Praktische KI-Systeme fur Unternehmen"
    : "SeventeenLabs | Practical AI Systems for Business Operations";

  const description = isGerman
    ? "SeventeenLabs entwickelt moderne KI-Systeme fur operative Unternehmensprozesse: kontextbewusste Workflows, Governance, menschliche Freigaben und messbare Umsetzung."
    : "SeventeenLabs builds modern AI systems for business operations: context-aware workflows, governance, human approval, and measurable execution.";

  return {
    title,
    description,
    keywords: isGerman
      ? [
          "KI Operator Software",
          "lokal-first KI",
          "KI Systeme fur Unternehmen",
          "KI Workflows mit Governance",
          "AI Implementation",
          "SeventeenLabs",
        ]
      : [
          "AI operator software",
          "local-first AI",
          "AI systems for business operations",
          "governed AI workflows",
          "AI implementation",
          "SeventeenLabs",
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
          alt: "SeventeenLabs - Practical AI Systems for Business Operations",
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

export default async function HomePage({ params }: HomePageMetadataProps) {
  const { locale } = await params;
  return <SeventeenLabsLanding locale={locale as Locale} />;
}
