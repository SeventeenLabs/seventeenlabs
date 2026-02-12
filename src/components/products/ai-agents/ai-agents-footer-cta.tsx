"use client";

import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";

interface FooterCTASectionProps {
  locale: string;
  onBookDemo: () => void;
  onStartTrial: () => void;
}

export default function AIAgentsFooterCTA({
  locale,
  onBookDemo,
  onStartTrial
}: FooterCTASectionProps) {
  const isGerman = locale === "de";

  const content = isGerman ? {
    headline: "Bereit, Ihr Team zu skalieren?",
    subheading: "Starten Sie mit einem der drei Pläne oder buchen Sie eine persönliche Demo.",
    cta1: "Demo buchen (15 min)",
    cta2: "Kostenlos testen",
    contact: "Oder kontaktieren Sie uns: hello@seventeenlabs.io"
  } : {
    headline: "Ready to Scale Your Team?",
    subheading: "Start with any of the three plans or book a personalized demo.",
    cta1: "Book 15-Min Demo",
    cta2: "Start Free Trial",
    contact: "Or reach out: hello@seventeenlabs.io"
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <Zap className="w-6 h-6" />
            <span className="text-blue-100 font-semibold">
              {isGerman ? "Letzte Gelegenheit" : "Final Call"}
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4">{content.headline}</h2>
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">{content.subheading}</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <button
              onClick={onBookDemo}
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-bold transition-all duration-200 flex items-center gap-2 shadow-lg"
            >
              {content.cta1}
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={onStartTrial}
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-bold transition-all duration-200"
            >
              {content.cta2}
            </button>
          </div>

          <p className="text-blue-100 text-sm">{content.contact}</p>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-12 pt-12 border-t border-blue-500 flex flex-wrap justify-center gap-8 text-sm text-blue-100"
        >
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            {isGerman ? "Keine Kreditkarte erforderlich" : "No credit card required"}
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            {isGerman ? "30-Tage-Kündigungsrichtlinie" : "30-day cancellation"}
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            {isGerman ? "Sofort starten" : "Start immediately"}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
