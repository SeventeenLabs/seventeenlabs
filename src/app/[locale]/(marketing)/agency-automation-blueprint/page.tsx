"use client";

import { use } from "react";
import Script from "next/script";
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
  params: Promise<{
    locale: string;
  }>;
}

export default function AuditPage({ params }: AuditPageProps) {
  const { locale } = use(params);
  const t = translations[locale] || translations["en"];

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
      "url": "https://seventeenlabs.io/agency-automation-blueprint",
      "priceCurrency": "USD",
      "price": "499",
      "priceValidUntil": "2025-12-31",
      "availability": "https://schema.org/LimitedAvailability",
      "seller": {
        "@type": "Organization",
        "name": "Seventeen Labs"
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
    "name": "Seventeen Labs",
    "url": "https://seventeenlabs.io",
    "logo": "https://seventeenlabs.io/logo.png",
    "sameAs": [
      "https://twitter.com/seventeenlabs"
    ]
  };

  return (
    <>
      <Script
        id="structured-data-product"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Script
        id="structured-data-org"
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
