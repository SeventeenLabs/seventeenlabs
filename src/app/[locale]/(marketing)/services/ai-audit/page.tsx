import type { Metadata } from "next";
import AuditHero from "@/components/services/audit/audit-hero";
import WhatIsAudit from "@/components/services/audit/what-is-audit";
import AuditProcess from "@/components/services/audit/audit-process";
import AuditDeliverables from "@/components/services/audit/audit-deliverables";
import AuditCta from "@/components/services/audit/audit-cta";
import { generateServicePageMetadata } from "@/lib/seo/metadata";
import { AutoBreadcrumb } from "@/components/seo/breadcrumb";
import { Locale } from "@/lib/i18n/config";

interface PageProps {
  params: Promise<{ locale: string }>;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://seventeenlabs.io";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return generateServicePageMetadata('services/ai-audit', locale as Locale);
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

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is included in an AI audit?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our AI audit includes comprehensive process analysis, identification of automation opportunities, technology stack evaluation, ROI projections, and a prioritized implementation roadmap with clear timelines and resource requirements.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long does an AI audit take?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A typical AI audit takes 2-3 weeks from kickoff to final deliverables. This includes initial consultation, process analysis, strategy workshop, and comprehensive report delivery.',
        },
      },
      {
        '@type': 'Question',
        name: 'What will I receive after the audit?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You will receive a detailed audit report with specific AI opportunities, implementation roadmap with phases and milestones, quick-win recommendations, and ROI projections for each initiative.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you guarantee finding AI opportunities?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, we guarantee finding at least 3 valuable AI opportunities in your business. If we do not identify actionable opportunities that can deliver measurable value, the audit is free.',
        },
      },
      {
        '@type': 'Question',
        name: 'How much does an AI audit cost?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our comprehensive AI audit is $3,490 and includes all analysis, workshops, deliverables, and a 90-day implementation support guarantee.',
        },
      },
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
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
