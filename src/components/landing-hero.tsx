"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { useTranslations, useLocale } from "@/lib/i18n/context";
import Prism from "./ui/prism";
import ContactModal from "./contact-modal";

export default function LandingHero() {
  const { t } = useTranslations();
  const locale = useLocale();
  const [contactModalOpen, setContactModalOpen] = useState(false);

  const handlePrimaryCTA = () => {
    // Track GA4 event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'click_cta', {
        event_category: 'Homepage',
        event_label: 'Hero Primary CTA - Start Your Project',
        cta_location: 'hero_section',
        cta_position: 'top',
        cta_type: 'primary',
        page_path: window.location.pathname,
        page_location: window.location.href,
        user_language: locale,
        page_title: document.title,
        viewport_width: window.innerWidth,
        scroll_depth: 0,
      });
    }
    setContactModalOpen(true);
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-black">
      {/* Background grid or subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-950 to-black" />
      
      {/* Prism Background - Full viewport */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
        className="absolute right-0 top-0 w-full lg:w-[60%] h-full pointer-events-none"
      >
        <div className="relative w-full h-full">
          <Prism
            animationType="3drotate"
            timeScale={0.3}
            height={2.5}
            baseWidth={3.5}
            scale={2.3}
            hueShift={0}
            colorFrequency={1.2}
            noise={0.3}
            glow={1.2}
          />
          {/* Dark overlay to reduce brightness - darker on mobile */}
          <div className="absolute inset-0 bg-black/60 lg:bg-black/40" />
        </div>
      </motion.div>
      
      <div className="relative z-10 w-full">
        <div className="flex min-h-screen items-center">
          {/* Content - Single column, no grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="flex flex-col px-6 sm:px-12 lg:px-16 xl:px-20 pt-0 pb-16 sm:pt-20 sm:pb-32 lg:pt-8 lg:pb-40 w-full lg:w-3/5 xl:w-2/3"
          >
              <div className="space-y-6 sm:space-y-10 lg:mt-20">
                {/* Eyebrow text */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                >
                  <span className="text-[10px] sm:text-xs lg:text-sm font-medium text-white/50 tracking-[0.2em] uppercase">
                    {t("hero.eyebrow")}
                  </span>
                </motion.div>

                <div className="space-y-6">
                  {/* Main headline */}
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-white leading-[1.2] tracking-tight"
                  >
                    {t("hero.mainTitle")} <span className="block mt-1 sm:mt-2 bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">{t("hero.mainTitleSecond")}</span>
                  </motion.h1>

                  {/* Subheadline */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.45 }}
                    className="text-sm sm:text-base lg:text-lg xl:text-xl font-light text-white/60 leading-relaxed max-w-3xl"
                  >
                    {t("hero.subheadline")}
                  </motion.p>
                </div>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
                  className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4"
                >
                  <button
                    onClick={handlePrimaryCTA}
                    className="group relative px-6 sm:px-8 py-3 sm:py-3.5 text-sm font-medium text-black bg-white rounded-lg hover:bg-white/90 transition-all duration-300 shadow-lg shadow-white/20 cursor-pointer text-center"
                  >
                    {t("hero.ctaPrimary")}
                  </button>
                  <a
                    href="#what-we-do"
                    onClick={(e) => {
                      e.preventDefault();
                      // Track GA4 event
                      if (typeof window !== 'undefined' && (window as any).gtag) {
                        (window as any).gtag('event', 'click_cta', {
                          event_category: 'Homepage',
                          event_label: 'Hero Secondary CTA - Learn More',
                          cta_location: 'hero_section',
                          cta_position: 'top',
                          cta_type: 'secondary',
                          destination: '#what-we-do',
                          page_path: window.location.pathname,
                          page_location: window.location.href,
                          user_language: locale,
                          page_title: document.title,
                          viewport_width: window.innerWidth,
                          scroll_depth: 0,
                        });
                      }
                      // Smooth scroll to section
                      document.querySelector('#what-we-do')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="group relative px-6 sm:px-8 py-3 sm:py-3.5 text-sm font-light text-white border border-white/30 rounded-lg hover:border-white/60 transition-all duration-300 overflow-hidden cursor-pointer text-center"
                  >
                    <span className="relative z-10">{t("hero.ctaSecondary")}</span>
                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300" />
                  </a>
                </motion.div>
              </div>
          </motion.div>
        </div>

        {/* Stats - at the bottom of hero section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
          className="absolute bottom-0 left-0 right-0 px-6 sm:px-12 lg:px-16 xl:px-20 pb-8 sm:pb-10 lg:pb-12"
        >
          <div className="grid grid-cols-3 gap-x-4 sm:gap-x-8 lg:gap-x-12 max-w-4xl">
            <div>
              <div className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-light text-white">{t("hero.stats.deployment")}</div>
              <div className="text-[10px] sm:text-xs lg:text-sm font-light text-white/60 mt-1">{t("hero.stats.deploymentLabel")}</div>
            </div>
            <div>
              <div className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-light text-white">{t("hero.stats.costReduction")}</div>
              <div className="text-[10px] sm:text-xs lg:text-sm font-light text-white/60 mt-1">{t("hero.stats.costReductionLabel")}</div>
            </div>
            <div>
              <div className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-light text-white">{t("hero.stats.automation")}</div>
              <div className="text-[10px] sm:text-xs lg:text-sm font-light text-white/60 mt-1">{t("hero.stats.automationLabel")}</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Contact Modal */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />
    </div>
  );
}
