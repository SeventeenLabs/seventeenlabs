"use client";

import { motion } from "framer-motion";
import LandingHeader from "@/components/landing-header";
import LandingHero from "@/components/landing-hero";
import SiteFooter from "@/components/site-footer";
import WhatWeDo from "@/components/what-we-do";
import ContactModal from "@/components/contact-modal";
import ProcessTimeline from "@/components/process-timeline";
import ResultsExamples from "@/components/results-examples";
import AboutChris from "@/components/about-chris";
import TrustSignals from "@/components/trust-signals";
import UseCases from "@/components/use-cases";
import LatestBlogPosts from "@/components/latest-blog-posts";
import { BlogPostMetadata } from "@/lib/notion-blog";

interface HomePageClientProps {
  latestPosts: BlogPostMetadata[];
}

export default function HomePageClient({ latestPosts }: HomePageClientProps) {
  return (
    <>
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
              
              {/* Trust Signals - Immediately after hero */}
              <TrustSignals />
              
              {/* Services Overview - What We Do */}
              <WhatWeDo />
              
              {/* Process / Journey Timeline */}
              <ProcessTimeline />
              
              {/* Use Cases - What I Automate */}
              <UseCases />
              
              {/* Results & Examples - More Social Proof */}
              <ResultsExamples />
              
              {/* Latest Blog Posts */}
              <LatestBlogPosts posts={latestPosts} />
              
              {/* About Chris - Personal branding */}
              <AboutChris />
            </main>
            <SiteFooter />
          </div>
        </motion.div>
      </div>

      {/* Contact Modal - Shows on scroll */}
      <ContactModal scrollTrigger />
    </>
  );
}
