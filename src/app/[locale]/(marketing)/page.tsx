"use client";

import { useState, useEffect, use } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DemoSection from "@/components/demo-section";
import LandingHeader from "@/components/landing-header";
import LandingHero from "@/components/landing-hero";
import NewsletterCta from "@/components/newsletter-cta";
import SiteFooter from "@/components/site-footer";
import WhatWeOffer from "@/components/what-we-offer";
import WhySeventeenLabs from "@/components/why-seventeenlabs";
import Prism from "@/components/ui/prism";
import Image from "next/image";

interface HomePageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default function Home({ params }: HomePageProps) {
  const { locale } = use(params);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    // Hide loading screen after SVG animation completes
    const loadingTimer = setTimeout(() => {
      setShowLoading(false);
    }, 2000); // Just wait for SVG animation to complete

    return () => {
      clearTimeout(loadingTimer);
    };
  }, []);

  return (
    <div className="bg-slate-950">
      <AnimatePresence mode="wait">
        {showLoading ? (
          <motion.div 
            key="loading"
            className="relative w-full min-h-screen overflow-hidden bg-slate-950"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2, ease: "easeOut" }}
              style={{ width: '100%', height: '100vh', position: 'absolute', top: 0, left: 0, zIndex: 0 }}
            >
              <Prism
                animationType="3drotate"
                timeScale={0.4}
                height={3.5}
                baseWidth={5.5}
                scale={3}
                hueShift={0}
                colorFrequency={1}
              />
            </motion.div>
            
            <div className="relative z-10 flex items-center justify-center min-h-screen">
              <Image
                src="/logo_anim.svg"
                alt="SeventeenLabs Logo"
                width={500}
                height={95}
              />
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="main"
            className="relative min-h-screen bg-slate-950 font-sans"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2, ease: "easeOut", delay: 0.3 }}
              style={{ width: '100%', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 0 }}
            >
              <Prism
                animationType="3drotate"
                timeScale={0.4}
                height={3.5}
                baseWidth={5.5}
                scale={3}
                hueShift={0}
                colorFrequency={1}
              />
            </motion.div>
            
            <div className="relative z-10">
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}