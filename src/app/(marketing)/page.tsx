"use client";

import DemoSection from "@/components/demo-section";
import LandingHeader from "@/components/landing-header";
import LandingHero from "@/components/landing-hero";
import NewsletterCta from "@/components/newsletter-cta";
import SiteFooter from "@/components/site-footer";
import WhatWeOffer from "@/components/what-we-offer";
import WhySeventeenLabs from "@/components/why-seventeenlabs";
import WorkflowTransformation from "@/components/workflow-dashboards";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 font-sans">
      <LandingHeader />
      <main>
        <LandingHero />
        <WhatWeOffer />
        <WhySeventeenLabs />
        <DemoSection />
        <NewsletterCta />
      </main>
      <SiteFooter />
    </div>
  );
}
