import type { Metadata } from "next";
import SeventeenLabsLanding from "@/components/seventeenlabs-landing";

interface HomePageMetadataProps {
  params: Promise<{
    locale: string;
  }>;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://seventeenlabs.io";
const ogImageUrl = `${baseUrl}/og-image.png`;

export async function generateMetadata({ params }: HomePageMetadataProps): Promise<Metadata> {
  const { locale } = await params;
  const isGerman = locale === "de";
  const pagePath = isGerman ? "/de" : "/";

  const title = isGerman
    ? "SeventeenLabs | AI Produktionspipeline fur Filme und Serien"
    : "SeventeenLabs | AI Production Pipeline for Films and Series";

  const description = isGerman
    ? "Plane Szenen, sichere Kontinuitat und generiere konsistente Shots fur AI Filme, Piloten, Trailer und Serien."
    : "Plan scenes, lock continuity, and generate consistent shots for AI films, pilots, trailers, and series.";

  return {
    title,
    description,
    keywords: isGerman
      ? [
          "AI Filme erstellen",
          "AI Serien erstellen",
          "AI Video Produktion",
          "AI Filmstudio",
          "AI Trailer erstellen",
          "SeventeenLabs",
        ]
      : [
          "AI movie creation",
          "AI series creation",
          "AI video production",
          "AI film studio",
          "AI trailer creation",
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
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: "SeventeenLabs AI production pipeline for films, pilots, trailers, and series",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | SeventeenLabs`,
      description,
      images: [ogImageUrl],
    },
  };
}

export default function HomePage() {
  return <SeventeenLabsLanding />;
}
