"use client";

import LandingHero from "@/components/landing-hero";
import Highlights from "@/components/highlights";
import SiteFooter from "@/components/site-footer";
import About from "@/components/about";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 font-sans">
  <LandingHero />
  <Highlights />
  <About />
      <SiteFooter />
    </div>
  );
}
