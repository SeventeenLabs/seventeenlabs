import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LocationHero from "@/components/services/location-hero";
import LocationInsights from "@/components/services/location-insights";
import WhatIsAudit from "@/components/services/audit/what-is-audit";
import AuditProcess from "@/components/services/audit/audit-process";
import AuditDeliverables from "@/components/services/audit/audit-deliverables";
import AuditCta from "@/components/services/audit/audit-cta";

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
      description: "Identify automation opportunities in Bavaria's business capital",
    },
    de: {
      name: "München",
      region: "Bayern",
      localName: "München",
      description: "Automatisierungspotenziale in Bayerns Wirtschaftsmetropole identifizieren",
    },
  },
  muenchen: {
    en: {
      name: "Munich",
      region: "Bavaria",
      localName: "München",
      description: "Identify automation opportunities in Bavaria's business capital",
    },
    de: {
      name: "München",
      region: "Bayern",
      localName: "München",
      description: "Automatisierungspotenziale in Bayerns Wirtschaftsmetropole identifizieren",
    },
  },
  bavaria: {
    en: {
      name: "Bavaria",
      region: "Southern Germany",
      localName: "Bayern",
      description: "Comprehensive automation assessments for Bavarian businesses",
    },
    de: {
      name: "Bayern",
      region: "Süddeutschland",
      localName: "Bayern",
      description: "Umfassende Automatisierungs-Assessments für bayerische Unternehmen",
    },
  },
  bayern: {
    en: {
      name: "Bavaria",
      region: "Southern Germany",
      localName: "Bayern",
      description: "Comprehensive automation assessments for Bavarian businesses",
    },
    de: {
      name: "Bayern",
      region: "Süddeutschland",
      localName: "Bayern",
      description: "Umfassende Automatisierungs-Assessments für bayerische Unternehmen",
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
    ? `/de/services/ai-audit/${location}`
    : `/services/ai-audit/${location}`;

  const title = isGerman
    ? `KI-Audit ${loc.name} | Automatisierungspotenzial | SeventeenLabs`
    : `AI Audit ${loc.name} | Automation Assessment | SeventeenLabs`;

  const description = isGerman
    ? `Professionelles KI-Audit für Unternehmen in ${loc.name}. Identifizieren Sie Automatisierungspotenziale, analysieren Sie Prozesse und erhalten Sie einen umsetzbaren Fahrplan.`
    : `Professional AI audit for businesses in ${loc.name}. Identify automation opportunities, analyze processes, and receive an actionable roadmap.`;

  return {
    title,
    description,
    keywords: isGerman
      ? [
          `KI Audit ${loc.name}`,
          `Automatisierungspotenzial ${loc.region}`,
          `Prozessanalyse ${loc.localName}`,
          "AI Strategie",
          "Workflow Audit",
          "Digitalisierung",
          "SeventeenLabs",
        ]
      : [
          `AI audit ${loc.name}`,
          `automation assessment ${loc.region}`,
          "process analysis",
          "AI strategy",
          "workflow audit",
          "digital transformation",
          "SeventeenLabs",
        ],
    alternates: {
      canonical: `${baseUrl}${pagePath}`,
      languages: {
        en: `${baseUrl}/services/ai-audit/${location}`,
        de: `${baseUrl}/de/services/ai-audit/${location}`,
        'x-default': `${baseUrl}/services/ai-audit/${location}`,
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
            ? `SeventeenLabs KI-Audit ${loc.name}`
            : `SeventeenLabs AI Audit ${loc.name}`,
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

export default async function AiAuditLocationPage({ params }: PageProps) {
  const { locale, location } = await params;
  const isGerman = locale === "de";

  const locationData = LOCATIONS[location as keyof typeof LOCATIONS];
  if (!locationData) {
    notFound();
  }

  const loc = locationData[isGerman ? "de" : "en"];
  const isMunich = location.includes("munic") || location.includes("muench");
  const pageUrl = isGerman
    ? `${baseUrl}/de/services/ai-audit/${location}`
    : `${baseUrl}/services/ai-audit/${location}`;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: isGerman 
      ? `KI-Audit ${loc.name}` 
      : `AI Audit ${loc.name}`,
    description: isGerman
      ? `Ganzheitliche Analyse Ihrer Prozesse und Systeme zur Identifikation von KI- und Automatisierungspotenzialen in ${loc.name}.`
      : `Holistic analysis of your processes and systems to identify AI and automation opportunities in ${loc.name}.`,
    provider: {
      "@type": "Organization",
      name: "SeventeenLabs",
      url: baseUrl,
    },
    serviceType: isGerman ? "KI Audit" : "AI Audit",
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
      price: "1490",
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
      ? `KI-Audit und Automatisierungsberatung für Unternehmen in ${loc.name}`
      : `AI audit and automation consulting for businesses in ${loc.name}`,
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
            name: isGerman ? "KI-Audit" : "AI Audit",
            color: "blue",
            iconName: "search",
          }}
          isGerman={isGerman}
        />

        <LocationInsights
          location={{
            name: loc.name,
            isMunich,
          }}
          service={{
            type: "audit",
            color: "blue",
          }}
          isGerman={isGerman}
        />

        <WhatIsAudit />
        <AuditProcess />
        <AuditDeliverables />
        <AuditCta />
      </main>
    </>
  );
}
