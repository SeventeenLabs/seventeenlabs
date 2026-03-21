"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import ContactModal from "@/components/contact-modal";
import { ArrowRight } from "lucide-react";

interface MarketingAgenciesCTAProps {
  locale: string;
}

export default function MarketingAgenciesCTA({ locale }: MarketingAgenciesCTAProps) {
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const isGerman = locale === 'de';

  const content = {
    en: {
      eyebrow: "Ready to Get Started?",
      title: "Start automating your agency today",
      subtitle: "Schedule a free 30-minute strategy call to see how automation can transform your agency.",
      primaryCta: "Schedule Free Strategy Call"
    },
    de: {
      eyebrow: "Bereit zu starten?",
      title: "Beginnen Sie noch heute mit der Automatisierung Ihrer Agentur",
      subtitle: "Vereinbaren Sie ein kostenloses 30-minütiges Strategiegespräch, um zu sehen, wie Automatisierung Ihre Agentur transformieren kann.",
      primaryCta: "Kostenlose Strategie-Beratung vereinbaren"
    }
  };

  const t = isGerman ? content.de : content.en;

  const handleCTA = () => {
    // Track GA4 event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'click_cta', {
        event_category: 'Marketing Agencies',
        event_label: 'CTA - Schedule Free Strategy Call',
        cta_location: 'final_cta_section',
        cta_position: 'bottom',
        cta_type: 'primary',
        page_path: window.location.pathname,
        page_location: window.location.href,
        user_language: locale,
        page_title: document.title,
        viewport_width: window.innerWidth,
        scroll_depth: Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100),
      });
    }
    setContactModalOpen(true);
  };

  return (
    <>
    <section className="relative py-24 sm:py-32 bg-zinc-950">
      <div className="relative z-10 w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* Header */}
        <div className="mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-light text-white/60 tracking-wider uppercase"
          >
            {t.eyebrow}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight"
          >
            {t.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-lg text-white/70 font-light leading-relaxed max-w-3xl"
          >
            {t.subtitle}
          </motion.p>
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex"
        >
          <button
            onClick={handleCTA}
            className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-medium text-black bg-white rounded-lg hover:bg-white/90 transition-all shadow-lg shadow-white/20"
          >
            {t.primaryCta}
            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
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
