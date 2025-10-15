"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useState } from "react";
import ContactModal from "@/components/contact-modal";

interface MarketingAgenciesHeroProps {
  locale: string;
}

export default function MarketingAgenciesHero({ locale }: MarketingAgenciesHeroProps) {
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const isGerman = locale === 'de';

  const content = {
    en: {
      badge: "For Marketing Agencies",
      title: "Scale Your Agency with",
      titleHighlight: "Intelligent Automation",
      subtitle: "Automate repetitive tasks, manage leads effortlessly, and deliver exceptional results for your clients. Focus on strategy while AI handles the execution.",
      cta: {
        primary: "Get Started",
        secondary: "View Workflows"
      },
      stats: [
        { value: "70%", label: "Time Saved" },
        { value: "3x", label: "More Clients" },
        { value: "24/7", label: "Automation" }
      ]
    },
    de: {
      badge: "Für Marketing-Agenturen",
      title: "Skalieren Sie Ihre Agentur mit",
      titleHighlight: "Intelligenter Automatisierung",
      subtitle: "Automatisieren Sie wiederkehrende Aufgaben, verwalten Sie Leads mühelos und liefern Sie außergewöhnliche Ergebnisse für Ihre Kunden. Konzentrieren Sie sich auf Strategie, während KI die Umsetzung übernimmt.",
      cta: {
        primary: "Jetzt starten",
        secondary: "Workflows ansehen"
      },
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
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 xl:px-20 py-32">
          <div className="text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8"
            >
              <Sparkles className="h-4 w-4" />
              {t.badge}
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6"
            >
              {t.title}
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                {t.titleHighlight}
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-slate-300 max-w-3xl mx-auto mb-12"
            >
              {t.subtitle}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            >
              <button
                onClick={() => setContactModalOpen(true)}
                className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 flex items-center gap-2 hover:scale-105 shadow-lg shadow-blue-500/25"
              >
                {t.cta.primary}
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href="/workflows"
                className="px-8 py-4 bg-slate-800/80 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-slate-700 transition-all duration-300 border border-slate-700 hover:border-slate-600"
              >
                {t.cta.secondary}
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid grid-cols-3 gap-8 max-w-2xl mx-auto"
            >
              {t.stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <ContactModal 
        isOpen={contactModalOpen} 
        onClose={() => setContactModalOpen(false)} 
      />
    </>
  );
}
