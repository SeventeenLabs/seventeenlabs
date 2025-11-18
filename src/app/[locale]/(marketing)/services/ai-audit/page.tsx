import type { Metadata } from "next";
import AuditHero from "@/components/services/audit/audit-hero";
import WhatIsAudit from "@/components/services/audit/what-is-audit";
import AuditProcess from "@/components/services/audit/audit-process";
import AuditDeliverables from "@/components/services/audit/audit-deliverables";
import AuditCta from "@/components/services/audit/audit-cta";

interface PageProps {
  params: Promise<{ locale: string }>;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://seventeenlabs.io";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isGerman = locale === "de";
  const pagePath = isGerman ? "/de/services/ai-audit" : "/services/ai-audit";

  const title = isGerman
    ? "KI-Audit & Automatisierungspotenzial | SeventeenLabs"
    : "AI Audit & Automation Opportunity Assessment | SeventeenLabs";

  const description = isGerman
    ? "Identifizieren Sie Automatisierungspotenziale mit einem ganzheitlichen KI-Audit. Wir analysieren Prozesse, Systeme und Daten, um einen umsetzbaren Fahrplan für Ihre AI-Strategie zu liefern."
    : "Identify automation opportunities with a comprehensive AI audit. We analyze processes, systems, and data to deliver an actionable roadmap for your AI strategy.";

  return {
    title,
    description,
    keywords: isGerman
      ? [
          "KI Audit",
          "Automatisierungspotenzial",
          "Prozessanalyse",
          "AI Strategie",
          "Workflow Audit",
          "Digitalisierung Agentur",
        ]
      : [
          "AI audit",
          "automation opportunity assessment",
          "process analysis",
          "AI roadmap",
          "workflow audit",
          "automation strategy",
        ],
    alternates: {
      canonical: `${baseUrl}${pagePath}`,
      languages: {
        en: `${baseUrl}/services/ai-audit`,
        de: `${baseUrl}/de/services/ai-audit`,
        'x-default': `${baseUrl}/services/ai-audit`,
      },
    },
    openGraph: {
      title,
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
          alt: isGerman
            ? "SeventeenLabs KI-Audit"
            : "SeventeenLabs AI Audit",
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

export default async function AiAuditPage({ params }: PageProps) {
  const { locale } = await params;
  const isGerman = locale === "de";
  const pageUrl = isGerman ? `${baseUrl}/de/services/ai-audit` : `${baseUrl}/services/ai-audit`;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: isGerman ? "KI-Audit" : "AI Audit",
    description: isGerman
      ? "Ganzheitliche Analyse Ihrer Prozesse, Systeme und Daten, um KI- und Automatisierungspotenziale aufzudecken."
      : "Holistic analysis of your processes, systems, and data to uncover AI and automation opportunities.",
    provider: {
      "@type": "Organization",
      name: "SeventeenLabs",
      url: baseUrl,
    },
    serviceType: isGerman ? "KI Audit" : "AI Audit",
    areaServed: "Worldwide",
    url: pageUrl,
    offers: {
      "@type": "Offer",
      url: pageUrl,
      availability: "https://schema.org/InStock",
      price: "3490",
      priceCurrency: "USD",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <main className="min-h-screen">
        <AuditHero />
        <WhatIsAudit />
        <AuditProcess />
        <AuditDeliverables />
        <AuditCta />
      </main>
    </>
  );
}
