"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import ContactModal from "@/components/contact-modal";
import Image from "next/image";

interface MarketingAgenciesHeroProps {
  locale: string;
}

export default function MarketingAgenciesHero({ locale }: MarketingAgenciesHeroProps) {
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const isGerman = locale === 'de';

  const content = {
    en: {
      eyebrow: "For Marketing Agencies",
      title: "Scale Your Agency with",
      titleHighlight: "Intelligent Automation",
      subtitle: "Automate repetitive tasks, manage leads effortlessly, and deliver exceptional results. Focus on strategy while AI handles execution.",
      cta: "Get Started",
      stats: [
        { value: "70%", label: "Time Saved" },
        { value: "3x", label: "More Clients" },
        { value: "24/7", label: "Automation" }
      ]
    },
    de: {
      eyebrow: "Für Marketing-Agenturen",
      title: "Skalieren Sie Ihre Agentur mit",
      titleHighlight: "Intelligenter Automatisierung",
      subtitle: "Automatisieren Sie wiederkehrende Aufgaben, verwalten Sie Leads mühelos und liefern Sie außergewöhnliche Ergebnisse.",
      cta: "Jetzt starten",
      stats: [
        { value: "70%", label: "Zeit gespart" },
        { value: "3x", label: "Mehr Kunden" },
        { value: "24/7", label: "Automatisierung" }
      ]
    }
  };

  const t = isGerman ? content.de : content.en;

  return (
    <>
      <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
        {/* Background Image */}
        <div className="absolute inset-0 w-[110%] left-[8%]">
          <Image
            src="/Digital Forest Harmony.png"
            alt="Digital Forest Harmony"
            fill
            className="object-cover object-right"
            priority
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/50" />
          {/* Left fade gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent w-1/2" />
        </div>
        
        <div className="relative z-10 w-full px-6 sm:px-12 lg:px-16 xl:px-20 pt-24 sm:pt-32 pb-8 flex flex-col min-h-screen">
          <div className="max-w-4xl mt-20 mb-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="space-y-8"
            >
              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
              >
                <span className="text-sm font-light text-white/60 tracking-wider uppercase">
                  {t.eyebrow}
                </span>
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-light text-white leading-[1.1] tracking-tight"
              >
                {t.title}{" "}
                <span className="block mt-2">{t.titleHighlight}</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
                className="text-lg text-white/70 font-light max-w-2xl leading-relaxed"
              >
                {t.subtitle}
              </motion.p>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
                className="pt-4"
              >
                <button
                  onClick={() => setContactModalOpen(true)}
                  className="group inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-medium text-black hover:bg-white/90 transition-all"
                >
                  {t.cta}
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </motion.div>
            </motion.div>
          </div>

          {/* Stats - at bottom */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.7 }}
            className="grid grid-cols-3 gap-8 max-w-4xl mt-auto"
          >
            {t.stats.map((stat, index) => (
              <div key={index}>
                <div className="text-3xl sm:text-4xl font-light text-white">{stat.value}</div>
                <div className="text-sm font-light text-white/60 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />
    </>
  );
}
