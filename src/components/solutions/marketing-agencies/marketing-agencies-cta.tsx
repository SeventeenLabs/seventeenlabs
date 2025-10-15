"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import ContactModal from "@/components/contact-modal";
import { ArrowRight, Calendar, MessageCircle } from "lucide-react";

interface MarketingAgenciesCTAProps {
  locale: string;
}

export default function MarketingAgenciesCTA({ locale }: MarketingAgenciesCTAProps) {
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const isGerman = locale === 'de';

  const content = {
    en: {
      title: "Ready to 10x your agency's output?",
      subtitle: "Join marketing agencies already saving 20+ hours per week with automation.",
      primaryCta: "Schedule a Demo",
      secondaryCta: "Contact Us",
      stats: [
        { value: "70%", label: "Less time on admin" },
        { value: "3x", label: "More clients handled" },
        { value: "24/7", label: "Automation running" }
      ]
    },
    de: {
      title: "Bereit, die Leistung Ihrer Agentur zu verzehnfachen?",
      subtitle: "Schließen Sie sich Marketing-Agenturen an, die bereits über 20 Stunden pro Woche durch Automatisierung sparen.",
      primaryCta: "Demo vereinbaren",
      secondaryCta: "Kontakt aufnehmen",
      stats: [
        { value: "70%", label: "Weniger Zeit für Admin" },
        { value: "3x", label: "Mehr Kunden betreut" },
        { value: "24/7", label: "Automatisierung läuft" }
      ]
    }
  };

  const t = isGerman ? content.de : content.en;

  return (
    <>
      <section className="relative py-24 sm:py-32 bg-black">
        {/* Top divider */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        
        <div className="relative z-10 w-full px-6 sm:px-12 lg:px-16 xl:px-20">
          <div className="text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight"
            >
              {t.title}
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-6 text-lg text-white/70 font-light leading-relaxed"
            >
              {t.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-10 flex flex-wrap justify-center gap-4"
            >
              <button
                onClick={() => setContactModalOpen(true)}
                className="group inline-flex items-center gap-2 px-8 py-3.5 text-sm font-medium text-black bg-white rounded-lg hover:bg-white/90 transition-all shadow-lg shadow-white/20"
              >
                <Calendar className="h-4 w-4" />
                {t.primaryCta}
                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
              
              <button
                onClick={() => setContactModalOpen(true)}
                className="group inline-flex items-center gap-2 px-8 py-3.5 text-sm font-light text-white border border-white/30 rounded-lg hover:border-white/60 transition-all"
              >
                <MessageCircle className="h-4 w-4" />
                {t.secondaryCta}
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-white/10"
            >
              {t.stats.map((stat, index) => (
                <div key={index}>
                  <div className="text-3xl sm:text-4xl font-light text-white">{stat.value}</div>
                  <div className="text-sm font-light text-white/60 mt-1">{stat.label}</div>
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
