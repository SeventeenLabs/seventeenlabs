import type { Metadata } from "next";
import AIAppointmentEngineHero from "@/components/products/ai-appointment-engine/ai-appointment-engine-hero";
import ProblemSection from "@/components/products/ai-appointment-engine/problem-section";
import SolutionSection from "@/components/products/ai-appointment-engine/solution-section";
import MidCtaSection from "@/components/products/ai-appointment-engine/mid-cta-section";
import OutcomeSection from "@/components/products/ai-appointment-engine/outcome-section";
import GuaranteeSection from "@/components/products/ai-appointment-engine/guarantee-section";
import PricingSection from "@/components/products/ai-appointment-engine/pricing-section";
import FAQSection from "@/components/products/ai-appointment-engine/faq-section";
import AIAppointmentEngineCta from "@/components/products/ai-appointment-engine/ai-appointment-engine-cta";

interface PageProps {
  params: Promise<{ locale: string }>;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://seventeenlabs.io";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isGerman = locale === "de";
  const pagePath = isGerman ? "/de/products/reportflow-engine" : "/products/reportflow-engine";

  const title = isGerman
    ? "ReportFlow Engine™ - 23+ Stunden Monatlich Sparen | SeventeenLabs"
    : "ReportFlow Engine™ - Save 23+ Hours Monthly With Automated Client Reporting | SeventeenLabs";

  const description = isGerman
    ? "Automatisieren Sie Ihre Client-Berichte mit ReportFlow Engine™. Sparen Sie 23+ Stunden monatlich mit KI-gestützten Dashboards, automatisierter Datensammlung und professionellen Reports."
    : "Automate your client reporting with ReportFlow Engine™. Save 23+ hours monthly with AI-powered dashboards, automated data collection, and professional reports.";

  return {
    title,
    description,
    keywords: isGerman
      ? [
          "ReportFlow Engine",
          "Client Reporting Automatisierung",
          "Agency Reporting",
          "Marketing Dashboard",
          "KI Reports",
          "Automatisierte Berichte",
        ]
      : [
          "ReportFlow Engine",
          "automated client reporting",
          "agency reporting automation",
          "marketing dashboard",
          "AI reports",
          "client report automation",
        ],
    alternates: {
      canonical: `${baseUrl}${pagePath}`,
      languages: {
        en: `${baseUrl}/products/reportflow-engine`,
        de: `${baseUrl}/de/products/reportflow-engine`,
        'x-default': `${baseUrl}/products/reportflow-engine`,
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
            ? "SeventeenLabs ReportFlow Engine™"
            : "SeventeenLabs ReportFlow Engine™",
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

export default async function ReportFlowEnginePage({ params }: PageProps) {
  const { locale } = await params;
  const isGerman = locale === "de";
  const pageUrl = isGerman ? `${baseUrl}/de/products/reportflow-engine` : `${baseUrl}/products/reportflow-engine`;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: isGerman ? "ReportFlow Engine™" : "ReportFlow Engine™",
    description: isGerman
      ? "ReportFlow Engine™ automatisiert Ihre Client-Berichte mit KI-gestützten Dashboards, spart 23+ Stunden monatlich und verbessert die Kundenzufriedenheit durch professionelle, automatisierte Reports."
      : "ReportFlow Engine™ automates your client reporting with AI-powered dashboards, saves 23+ hours monthly, and improves client satisfaction through professional, automated reports.",
    provider: {
      "@type": "Organization",
      name: "SeventeenLabs",
      url: baseUrl,
    },
    serviceType: isGerman ? "Marketing Automatisierung" : "Marketing Automation",
    areaServed: "Worldwide",
    url: pageUrl,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <main className="min-h-screen">
        <AIAppointmentEngineHero />
        <ProblemSection />
        <SolutionSection />
        <MidCtaSection />
        <OutcomeSection />
        <GuaranteeSection />
        <FAQSection />
        <AIAppointmentEngineCta />
      </main>
    </>
  );
}
