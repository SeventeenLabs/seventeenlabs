import type { Metadata } from "next";
import LandingHeader from "@/components/landing-header";
import SiteFooter from "@/components/site-footer";
import AuditHero from "@/components/audit/audit-hero";
import AuditProcess from "@/components/audit/audit-process";
import AuditROI from "@/components/audit/audit-roi";
import AuditWhoItsFor from "@/components/audit/audit-who-its-for";
import AuditPricing from "@/components/audit/audit-pricing";
import AuditTrust from "@/components/audit/audit-trust";
import AuditFinalCTA from "@/components/audit/audit-final-cta";

// Import translations
import enUS from "@/locales/en-US.json";
import deDE from "@/locales/de-DE.json";

const translations: Record<string, any> = {
  "en": enUS,
  "en-US": enUS,
  "de": deDE,
  "de-DE": deDE,
};

interface AuditPageProps {
  params: {
    locale: string;
  };
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://seventeenlabs.io";

export async function generateMetadata({ params }: AuditPageProps): Promise<Metadata> {
  const { locale } = params;
  const isGerman = locale === "de";
  const pagePath = isGerman ? "/de/agency-automation-blueprint" : "/agency-automation-blueprint";

  const title = isGerman
    ? "Agency Automation Blueprint | Individuelle KI-Chancen" 
    : "Agency Automation Blueprint | Custom AI Opportunities";

  const description = isGerman
    ? "Erhalten Sie drei individuelle KI- und Automatisierungschancen für Ihre Agentur. Identifizieren Sie Zeitsparer, Umsatzhebel und konkrete Umsetzungsschritte."
    : "Get three custom AI and automation opportunities for your agency with implementation steps, ROI models, and workflow diagrams.";

  return {
    title,
    description,
    keywords: isGerman
      ? [
          "Agency Automation Blueprint",
          "KI Blueprint",
          "Agentur Automatisierung",
          "Workflow Analyse",
          "KI Beratung",
        ]
      : [
          "agency automation blueprint",
          "AI opportunity assessment",
          "workflow analysis",
          "automation audit",
          "AI consulting",
        ],
    alternates: {
      canonical: `${baseUrl}${pagePath}`,
      languages: {
        en: `${baseUrl}/agency-automation-blueprint`,
        de: `${baseUrl}/de/agency-automation-blueprint`,
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
          alt: "SeventeenLabs Agency Automation Blueprint",
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

export default function AuditPage({ params }: AuditPageProps) {
  const { locale } = params;
  const t = translations[locale] || translations["en"];
  const localizedUrl = locale === "de"
    ? `${baseUrl}/de/agency-automation-blueprint`
    : `${baseUrl}/agency-automation-blueprint`;
  const priceValidUntil = (() => {
    const date = new Date();
    date.setMonth(date.getMonth() + 12);
    return date.toISOString().split("T")[0];
  })();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Agency Automation Blueprint",
    "description": "Get your Agency Automation Blueprint - 3 high-impact automation opportunities custom-built for your agency. Save 15+ hours per week and increase revenue by 30%.",
    "brand": {
      "@type": "Brand",
      "name": "Seventeen Labs"
    },
    "offers": {
      "@type": "Offer",
      "url": localizedUrl,
      "priceCurrency": "USD",
      "price": "499",
      "priceValidUntil": priceValidUntil,
      "availability": "https://schema.org/LimitedAvailability",
      "seller": {
        "@type": "Organization",
        "name": "SeventeenLabs",
        "url": baseUrl,
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": "10"
    }
  };

  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "SeventeenLabs",
    "url": baseUrl,
    "logo": `${baseUrl}/logo-white.svg`,
    "sameAs": [
      "https://twitter.com/seventeenlabs",
      "https://www.linkedin.com/company/seventeenlabs-io",
      "https://www.youtube.com/@seventeenlabs"
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
      
      <div className="bg-slate-950">
        <LandingHeader />
        
        <AuditHero locale={locale} t={t} />
        
        <AuditProcess locale={locale} t={t} />
        
        <AuditROI locale={locale} t={t} />
        
        <AuditWhoItsFor locale={locale} t={t} />
        
        <AuditPricing locale={locale} t={t} />
        
        <AuditTrust locale={locale} t={t} />
        
        <AuditFinalCTA locale={locale} t={t} />

        <SiteFooter />
      </div>
    </>
  );
}
