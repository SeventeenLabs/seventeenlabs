"use client";

import { motion } from "framer-motion";
import LandingHeader from "@/components/landing-header";
import LandingHero from "@/components/landing-hero";
import SiteFooter from "@/components/site-footer";
import WhatWeOffer from "@/components/what-we-offer";
import AiOsExplainer from "@/components/ai-os-explainer";
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
              <LandingHero />
              <WhatWeOffer />
              <AiOsExplainer />
              
              {/* Latest Blog Posts */}
              <LatestBlogPosts posts={latestPosts} />
            </main>
            <SiteFooter />
          </div>
        </motion.div>
      </div>
    </>
  );
}
