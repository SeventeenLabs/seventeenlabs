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
        </div>
      </motion.div>
      
      <div className="relative z-10 w-full">
        <div className="flex min-h-screen items-center">
          {/* Content - Single column, no grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="flex flex-col justify-between h-full px-6 sm:px-12 lg:px-16 xl:px-20 py-24 lg:py-32 min-h-screen w-full lg:w-1/2"
          >
              <div className="space-y-6 lg:mt-20">
                {/* Eyebrow text */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                >
                  <span className="text-sm font-light text-white/60 tracking-wider uppercase">
                    {t("hero.eyebrow")}
                  </span>
                </motion.div>

                {/* Main headline */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                  className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light text-white leading-[1.1] tracking-tight"
                >
                  {t("hero.mainTitle")}{" "}
                  <span className="block mt-2">{t("hero.mainTitleSecond")}</span>
                </motion.h1>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
                  className="flex flex-wrap gap-4 pt-4"
                >
                  <button
                    onClick={() => setContactModalOpen(true)}
                    className="group relative px-8 py-3.5 text-sm font-medium text-black bg-white rounded-lg hover:bg-white/90 transition-all duration-300 shadow-lg shadow-white/20 cursor-pointer"
                  >
                    {t("hero.ctaPrimary")}
                  </button>
                  <Link
                    href={`/workflows`}
                    className="group relative px-8 py-3.5 text-sm font-light text-white border border-white/30 rounded-lg hover:border-white/60 transition-all duration-300 overflow-hidden cursor-pointer"
                  >
                    <span className="relative z-10">{t("hero.ctaSecondary")}</span>
                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300" />
                  </Link>
                </motion.div>
              </div>

            {/* Stats - pushed to bottom */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
              className="grid grid-cols-3 gap-x-8 lg:gap-x-12 -mb-12 lg:-mb-16"
            >
              <div>
                <div className="text-3xl sm:text-4xl font-light text-white">{t("hero.stats.deployment")}</div>
                <div className="text-sm font-light text-white/60 mt-1">{t("hero.stats.deploymentLabel")}</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-light text-white">{t("hero.stats.costReduction")}</div>
                <div className="text-sm font-light text-white/60 mt-1">{t("hero.stats.costReductionLabel")}</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-light text-white">{t("hero.stats.automation")}</div>
                <div className="text-sm font-light text-white/60 mt-1">{t("hero.stats.automationLabel")}</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Contact Modal */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />
    </div>
  );
}
