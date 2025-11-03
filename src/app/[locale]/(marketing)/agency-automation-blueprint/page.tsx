"use client";

import { use } from "react";
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

  return (
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
  );
}
