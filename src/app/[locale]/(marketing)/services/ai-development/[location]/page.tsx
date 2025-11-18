import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LocationHero from "@/components/services/location-hero";
import LocationInsights from "@/components/services/location-insights";
import DevelopmentCapabilities from "@/components/services/development/development-capabilities";
import DevelopmentTechStack from "@/components/services/development/development-tech-stack";
import DevelopmentProcess from "@/components/services/development/development-process";
import DevelopmentCta from "@/components/services/development/development-cta";

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
      description: "Bavaria's technology hub and leading center for software development",
    },
    de: {
      name: "München",
      region: "Bayern",
      localName: "München",
      description: "Bayerns Technologiezentrum und führendes Zentrum für Softwareentwicklung",
    },
  },
  muenchen: {
    en: {
      name: "Munich",
      region: "Bavaria",
      localName: "München",
      description: "Bavaria's technology hub and leading center for software development",
    },
    de: {
      name: "München",
      region: "Bayern",
      localName: "München",
      description: "Bayerns Technologiezentrum und führendes Zentrum für Softwareentwicklung",
    },
  },
  bavaria: {
    en: {
      name: "Bavaria",
      region: "Southern Germany",
      localName: "Bayern",
      description: "Germany's innovation leader with strong tech and engineering talent",
    },
    de: {
      name: "Bayern",
      region: "Süddeutschland",
      localName: "Bayern",
      description: "Deutschlands Innovationsführer mit starkem Tech- und Engineering-Talent",
    },
  },
  bayern: {
    en: {
      name: "Bavaria",
      region: "Southern Germany",
      localName: "Bayern",
      description: "Germany's innovation leader with strong tech and engineering talent",
    },
    de: {
      name: "Bayern",
      region: "Süddeutschland",
      localName: "Bayern",
      description: "Deutschlands Innovationsführer mit starkem Tech- und Engineering-Talent",
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
    ? `/de/services/ai-development/${location}`
    : `/services/ai-development/${location}`;

  const title = isGerman
    ? `KI-Entwicklung ${loc.name} | Individuelle Automatisierung | SeventeenLabs`
    : `AI Development ${loc.name} | Custom Automation | SeventeenLabs`;

  const description = isGerman
    ? `Maßgeschneiderte KI-Entwicklung für Unternehmen in ${loc.name}. Wir entwickeln individuelle Automatisierungsworkflows, LLM-Integrationen und KI-Anwendungen für Ihre Region.`
    : `Custom AI development for businesses in ${loc.name}. We build tailored automation workflows, LLM integrations, and AI applications for your region.`;

  return {
    title,
    description,
    keywords: isGerman
      ? [
          `KI Entwicklung ${loc.name}`,
          `Individuelle Automatisierung ${loc.region}`,
          `AI Development ${loc.localName}`,
          "n8n Entwicklung",
          "LLM Integration",
          "Workflow Automatisierung",
          "SeventeenLabs",
        ]
      : [
          `AI development ${loc.name}`,
          `custom automation ${loc.region}`,
          "n8n workflow development",
          "LLM integration",
          "automation engineering",
          "SeventeenLabs",
        ],
    alternates: {
      canonical: `${baseUrl}${pagePath}`,
      languages: {
        en: `${baseUrl}/services/ai-development/${location}`,
        de: `${baseUrl}/de/services/ai-development/${location}`,
        'x-default': `${baseUrl}/services/ai-development/${location}`,
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
            ? `SeventeenLabs KI-Entwicklung ${loc.name}`
            : `SeventeenLabs AI Development ${loc.name}`,
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

export default async function AiDevelopmentLocationPage({ params }: PageProps) {
  const { locale, location } = await params;
  const isGerman = locale === "de";

  const locationData = LOCATIONS[location as keyof typeof LOCATIONS];
  if (!locationData) {
    notFound();
  }

  const loc = locationData[isGerman ? "de" : "en"];
  const isMunich = location.includes("munic") || location.includes("muench");
  const pageUrl = isGerman
    ? `${baseUrl}/de/services/ai-development/${location}`
    : `${baseUrl}/services/ai-development/${location}`;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: isGerman 
      ? `Individuelle KI-Entwicklung ${loc.name}` 
      : `Custom AI Development ${loc.name}`,
    description: isGerman
      ? `Entwicklung maßgeschneiderter KI-Anwendungen und Automatisierungsworkflows für Unternehmen in ${loc.name}.`
      : `Development of bespoke AI applications and automation workflows for businesses in ${loc.name}.`,
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
      priceRange: "€€€",
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
      ? `KI-Entwicklung und Automatisierung für Unternehmen in ${loc.name}`
      : `AI development and automation for businesses in ${loc.name}`,
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
            name: isGerman ? "KI-Entwicklung" : "AI Development",
            color: "emerald",
            iconName: "code",
          }}
          isGerman={isGerman}
        />

        <LocationInsights
          location={{
            name: loc.name,
            isMunich,
          }}
          service={{
            type: "development",
            color: "emerald",
          }}
          isGerman={isGerman}
        />

        <DevelopmentCapabilities />
        <DevelopmentTechStack />
        <DevelopmentProcess />
        <DevelopmentCta />
      </main>
    </>
  );
}
