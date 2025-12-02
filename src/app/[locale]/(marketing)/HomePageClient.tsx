"use client";

import { motion } from "framer-motion";
import LandingHeader from "@/components/landing-header";
import LandingHero from "@/components/landing-hero";
import SiteFooter from "@/components/site-footer";
import WhatWeDo from "@/components/what-we-do";
import AiAuditService from "@/components/services/ai-audit-service";
import ConsultingService from "@/components/services/consulting-service";
import DevelopmentService from "@/components/services/development-service";
import ProcessTimeline from "@/components/process-timeline";
import FinalCta from "@/components/final-cta";

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
            <LandingHero />
            <WhatWeDo />
            <AiAuditService />
            <ConsultingService />
            <DevelopmentService />
            <ProcessTimeline />
            <FinalCta />
          </main>
          <SiteFooter />
        </div>
      </motion.div>
    </div>
  );
}
