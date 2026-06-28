import type { Metadata } from "next";
import SeventeenLabsLanding from "@/components/seventeenlabs-landing";

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
    ? "SeventeenLabs | AI Filme und Serien erstellen"
    : "SeventeenLabs | AI Movie and Series Creation SaaS";

  const description = isGerman
    ? "SeventeenLabs ist ein AI Studio Workspace fur Filme, Serien, Trailer, Piloten, Charaktere, Szenen und Launch-Assets."
    : "SeventeenLabs is an AI studio workspace for creating movies, series, trailers, pilots, characters, scenes, and launch assets.";

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
          url: `${baseUrl}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: "SeventeenLabs - AI movie and series creation service",
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
  return <SeventeenLabsLanding />;
}
