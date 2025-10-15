"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import ContactModal from "@/components/contact-modal";

interface MarketingAgenciesCTAProps {
  locale: string;
}

export default function MarketingAgenciesCTA({ locale }: MarketingAgenciesCTAProps) {
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const isGerman = locale === 'de';

  const content = {
    en: {
      title: "Ready to Transform Your Agency?",
      subtitle: "Join hundreds of marketing agencies already saving time and scaling their business with automation.",
      cta: {
        primary: "Start Free Trial",
        secondary: "Schedule Demo"
      }
    },
    de: {
      title: "Bereit, Ihre Agentur zu transformieren?",
      subtitle: "Schließen Sie sich Hunderten von Marketing-Agenturen an, die bereits Zeit sparen und ihr Geschäft mit Automatisierung skalieren.",
      cta: {
        primary: "Kostenlos testen",
        secondary: "Demo vereinbaren"
      }
    }
  };

  const t = isGerman ? content.de : content.en;

  return (
    <>
      <section className="py-24 bg-gradient-to-br from-blue-600/10 via-slate-900/50 to-cyan-600/10">
        <div className="max-w-4xl mx-auto px-6 sm:px-12 lg:px-16 xl:px-20 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-5xl font-bold text-white mb-6"
          >
            {t.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-slate-300 mb-12"
          >
            {t.subtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="/workflows"
              className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 flex items-center gap-2 hover:scale-105 shadow-lg shadow-blue-500/25"
            >
              {t.cta.primary}
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <button
              onClick={() => setContactModalOpen(true)}
              className="px-8 py-4 bg-slate-800/80 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-slate-700 transition-all duration-300 border border-slate-700 hover:border-slate-600"
            >
              {t.cta.secondary}
            </button>
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
