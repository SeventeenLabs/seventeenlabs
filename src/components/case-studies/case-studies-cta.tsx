"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useState } from "react";
import ContactModal from "@/components/contact-modal";

interface CaseStudiesCTAProps {
  locale: string;
}

export default function CaseStudiesCTA({ locale }: CaseStudiesCTAProps) {
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const isGerman = locale === "de";

  const content = {
    en: {
      title: "Ready to Write Your Success Story?",
      subtitle: "See how AI automation can transform your business operations and deliver measurable results",
      cta: "Get Your Free Automation Audit",
      note: "30-minute call • No commitment required",
    },
    de: {
      title: "Bereit, Ihre Erfolgsgeschichte zu schreiben?",
      subtitle: "Sehen Sie, wie KI-Automatisierung Ihre Geschäftsprozesse transformieren und messbare Ergebnisse liefern kann",
      cta: "Holen Sie sich Ihr kostenloses Automatisierungs-Audit",
      note: "30-Minuten-Gespräch • Keine Verpflichtung",
    },
  };

  const t = isGerman ? content.de : content.en;

  return (
    <>
      <section className="relative bg-black py-24 lg:py-32 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto px-6 sm:px-12 lg:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-5xl font-light text-white mb-6">
              {t.title}
            </h2>
            <p className="text-lg text-white/60 font-light mb-10 max-w-2xl mx-auto">
              {t.subtitle}
            </p>

            <button
              onClick={() => setContactModalOpen(true)}
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg shadow-orange-500/20"
            >
              <Sparkles className="w-5 h-5" />
              {t.cta}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <p className="text-white/40 text-sm mt-4">
              {t.note}
            </p>
          </motion.div>
        </div>
      </section>

      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        prefillMessage=""
      />
    </>
  );
}
