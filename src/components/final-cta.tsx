"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from "@/lib/i18n/context";
import { ArrowRight, Calendar, Mail, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import ContactModal from "./contact-modal";

export default function FinalCta() {
  const { t } = useTranslations();
  const locale = useLocale();
  const [contactModalOpen, setContactModalOpen] = useState(false);

  const benefits = locale === 'de' 
    ? [
        "Kostenlose 15-minütige Erstberatung",
        "Kein Risiko, keine Verpflichtung",
        "Konkreter Aktionsplan nach dem Gespräch",
      ]
    : [
        "Free 15-minute discovery call",
        "No risk, no commitment",
        "Concrete action plan after the call",
      ];

  return (
    <section id="contact" className="relative bg-black py-24 lg:py-32 overflow-hidden">
      {/* Section divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      
      {/* Subtle gradient accent */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10"></div>
      
      <div className="relative w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/70 text-xs font-medium uppercase tracking-wider mb-6">
            {locale === 'de' ? 'Bereit zu starten?' : 'Ready to Start?'}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight mb-4">
            {t("finalCta.title")}
          </h2>
          
          <p className="text-lg text-white/60 font-light leading-relaxed mb-8 max-w-2xl">
            {t("finalCta.description")}
          </p>

          {/* Benefits list */}
          <ul className="space-y-3 mb-10">
            {benefits.map((benefit, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 text-white/70"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span className="font-light">{benefit}</span>
              </motion.li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://cal.com/christian-lutz-pw2nn4/15min"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-8 py-4 text-base font-medium text-black bg-white rounded-xl hover:bg-white/90 transition-all duration-300 shadow-lg shadow-white/10 inline-flex items-center justify-center gap-2"
            >
              <Calendar className="w-5 h-5" />
              {locale === 'de' ? 'Kostenloses Gespräch buchen' : 'Book Free Discovery Call'}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            
            <button
              onClick={() => setContactModalOpen(true)}
              className="group relative px-8 py-4 text-base font-medium text-white border border-white/20 rounded-xl hover:bg-white/5 hover:border-white/40 transition-all duration-300 inline-flex items-center justify-center gap-2"
            >
              <Mail className="w-5 h-5" />
              {locale === 'de' ? 'Nachricht senden' : 'Send a Message'}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Contact Modal */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />
    </section>
  );
}
