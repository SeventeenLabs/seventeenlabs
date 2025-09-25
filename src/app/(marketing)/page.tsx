"use client";

import LandingHeader from "@/components/landing-header";
import LandingHero from "@/components/landing-hero";
import NewsletterCta from "@/components/newsletter-cta";
import SiteFooter from "@/components/site-footer";
import WhatWeOffer from "@/components/what-we-offer";
import WhySeventeenLabs from "@/components/why-seventeenlabs";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 font-sans">
      <LandingHeader />
      <main>
        <LandingHero />
        <WhatWeOffer />
        <WhySeventeenLabs />
        <NewsletterCta />
      </main>
      <SiteFooter />
    </div>
  );
}
