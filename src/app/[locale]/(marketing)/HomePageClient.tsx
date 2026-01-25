"use client";

import { motion } from "framer-motion";
import LandingHeader from "@/components/landing-header";
import LandingHero from "@/components/landing-hero";
import SiteFooter from "@/components/site-footer";
import WhatWeDo from "@/components/what-we-do";
import BetaPilotProgram from "@/components/beta-pilot-program";
import ProcessTimeline from "@/components/process-timeline";
import ResultsExamples from "@/components/results-examples";
import AboutChris from "@/components/about-chris";

export default function HomePageClient() {
  return (
    <div className="bg-slate-950">
      <motion.div
        className="relative min-h-screen bg-slate-950 font-sans"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <div className="relative z-10">
          <LandingHeader />
          <main>
            {/* Hero with personal touch and Calendly CTA */}
            <LandingHero />
            
            {/* Beta Pilot Program - Quick Win / Low-barrier offer */}
            <BetaPilotProgram />
            
            {/* Services Overview - What We Do */}
            <WhatWeDo />
            
            {/* Process / Journey Timeline */}
            <ProcessTimeline />
            
            {/* Results & Examples - Social Proof */}
            <ResultsExamples />
            
            {/* About Chris - Personal branding */}
            <AboutChris />
          </main>
          <SiteFooter />
        </div>
      </motion.div>
    </div>
  );
}
