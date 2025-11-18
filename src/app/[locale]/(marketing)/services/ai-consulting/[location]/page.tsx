import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LocationHero from "@/components/services/location-hero";
import LocationInsights from "@/components/services/location-insights";
import ConsultingApproach from "@/components/services/consulting/consulting-approach";
import ConsultingServices from "@/components/services/consulting/consulting-services";
import ConsultingCta from "@/components/services/consulting/consulting-cta";

interface PageProps {
  params: Promise<{ locale: string; location: string }>;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://seventeenlabs.io";

// Supported locations with their metadata
const LOCATIONS = {
  munich: {
    en: {
      name: "Munich",
      region: "Bavaria",
      localName: "München",
      description: "Bavaria's technology hub and home to a thriving AI and automation ecosystem",
    },
    de: {
      name: "München",
      region: "Bayern",
      localName: "München",
      description: "Bayerns Technologiezentrum mit einem florierenden KI- und Automatisierungs-Ökosystem",
    },
  },
  muenchen: {
    en: {
      name: "Munich",
      region: "Bavaria",
      localName: "München",
      description: "Bavaria's technology hub and home to a thriving AI and automation ecosystem",
    },
    de: {
      name: "München",
      region: "Bayern",
      localName: "München",
      description: "Bayerns Technologiezentrum mit einem florierenden KI- und Automatisierungs-Ökosystem",
    },
  },
  bavaria: {
    en: {
      name: "Bavaria",
      region: "Southern Germany",
      localName: "Bayern",
      description: "Germany's most innovative region with strong industrial and tech sectors",
    },
    de: {
      name: "Bayern",
      region: "Süddeutschland",
      localName: "Bayern",
      description: "Deutschlands innovativste Region mit starker Industrie und Tech-Branche",
    },
  },
  bayern: {
    en: {
      name: "Bavaria",
      region: "Southern Germany",
      localName: "Bayern",
      description: "Germany's most innovative region with strong industrial and tech sectors",
    },
    de: {
      name: "Bayern",
      region: "Süddeutschland",
      localName: "Bayern",
      description: "Deutschlands innovativste Region mit starker Industrie und Tech-Branche",
    },
  },
};

export async function generateStaticParams() {
  return [
    { location: "munich" },
    { location: "muenchen" },
    { location: "bavaria" },
    { location: "bayern" },
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, location } = await params;
  const isGerman = locale === "de";
  
  const locationData = LOCATIONS[location as keyof typeof LOCATIONS];
  if (!locationData) return {};

  const loc = locationData[isGerman ? "de" : "en"];
  const pagePath = isGerman 
    ? `/de/services/ai-consulting/${location}`
    : `/services/ai-consulting/${location}`;

  const title = isGerman
    ? `KI-Beratung ${loc.name} | Strategische Automatisierung | SeventeenLabs`
    : `AI Consulting ${loc.name} | Strategic Automation | SeventeenLabs`;

  const description = isGerman
    ? `Professionelle KI-Beratung für Unternehmen in ${loc.name}. Entwickeln Sie mit uns eine praxisnahe KI-Strategie und Automatisierungs-Roadmap für Ihre Region.`
    : `Professional AI consulting for businesses in ${loc.name}. Build a practical AI strategy and automation roadmap with local expertise in ${loc.region}.`;

  return {
    title,
    description,
    keywords: isGerman
      ? [
          `KI Beratung ${loc.name}`,
          `Automatisierungsstrategie ${loc.region}`,
          `AI Consulting ${loc.localName}`,
          "KI Roadmap",
          "Digitalisierung Beratung",
          "Prozessoptimierung",
          "SeventeenLabs",
        ]
      : [
          `AI consulting ${loc.name}`,
          `automation strategy ${loc.region}`,
          "AI roadmap",
          "digital transformation",
          "process optimization",
          "SeventeenLabs",
        ],
    alternates: {
      canonical: `${baseUrl}${pagePath}`,
      languages: {
        en: `${baseUrl}/services/ai-consulting/${location}`,
        de: `${baseUrl}/de/services/ai-consulting/${location}`,
        'x-default': `${baseUrl}/services/ai-consulting/${location}`,
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
          alt: isGerman
            ? `SeventeenLabs KI-Beratung ${loc.name}`
            : `SeventeenLabs AI Consulting ${loc.name}`,
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

export default async function AiConsultingLocationPage({ params }: PageProps) {
  const { locale, location } = await params;
  const isGerman = locale === "de";

  const locationData = LOCATIONS[location as keyof typeof LOCATIONS];
  if (!locationData) {
    notFound();
  }

  const loc = locationData[isGerman ? "de" : "en"];
  const isMunich = location.includes("munic") || location.includes("muench");
  const pageUrl = isGerman
    ? `${baseUrl}/de/services/ai-consulting/${location}`
    : `${baseUrl}/services/ai-consulting/${location}`;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: isGerman 
      ? `Strategische KI-Beratung ${loc.name}` 
      : `AI Consulting ${loc.name}`,
    description: isGerman
      ? `Beratung für KI-Strategie und Automatisierung für Unternehmen in ${loc.name}. Wir entwickeln ROI-basierte Roadmaps und priorisieren Automatisierungsprojekte.`
      : `AI strategy and automation consulting for businesses in ${loc.name}. We develop ROI-backed roadmaps and prioritize automation projects.`,
    provider: {
      "@type": "Organization",
      name: "SeventeenLabs",
      url: baseUrl,
    },
    areaServed: {
      "@type": "Place",
      name: loc.name,
      address: {
        "@type": "PostalAddress",
        addressRegion: loc.region,
        addressCountry: "DE",
      },
    },
    url: pageUrl,
    offers: {
      "@type": "Offer",
      url: pageUrl,
      availability: "https://schema.org/InStock",
      price: "2490",
      priceCurrency: "EUR",
      areaServed: {
        "@type": "Place",
        name: loc.name,
      },
    },
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${baseUrl}#organization`,
    name: "SeventeenLabs",
    description: isGerman
      ? `KI-Beratung und Automatisierung für Unternehmen in ${loc.name}`
      : `AI consulting and automation for businesses in ${loc.name}`,
    url: baseUrl,
    areaServed: {
      "@type": "Place",
      name: loc.name,
      address: {
        "@type": "PostalAddress",
        addressRegion: loc.region,
        addressCountry: "DE",
      },
    },
    sameAs: [
      "https://www.linkedin.com/company/seventeenlabs",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <main className="min-h-screen">
        <LocationHero
          location={{
            name: loc.name,
            region: loc.region,
            localName: loc.localName,
          }}
          service={{
            name: isGerman ? "KI-Beratung" : "AI Consulting",
            color: "orange",
            iconName: "lightbulb",
          }}
          isGerman={isGerman}
        />

        <LocationInsights
          location={{
            name: loc.name,
            isMunich,
          }}
          service={{
            type: "consulting",
            color: "orange",
          }}
          isGerman={isGerman}
        />

        <ConsultingApproach />
        <ConsultingServices />
        <ConsultingCta />
      </main>
    </>
  );
}
