"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface AuditFinalCTAProps {
  locale: string;
  t: any;
}

export default function AuditFinalCTA({ locale, t }: AuditFinalCTAProps) {
  const handleBookAudit = () => {
    // Track GA4 event with detailed information
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'click_cta', {
        event_category: 'Blueprint',
        event_label: 'Final CTA - Get Your Blueprint',
        cta_location: 'final_cta_section',
        cta_position: 'bottom',
        page_path: window.location.pathname,
        page_location: window.location.href,
        user_language: locale,
        page_title: document.title,
        viewport_width: window.innerWidth,
        scroll_depth: Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100),
        user_reached_bottom: true,
      });
    }
    
    console.log("Book audit clicked");
    // TODO: Integrate with Stripe checkout or booking system
    // Scroll to pricing section for now
    const pricingSection = document.getElementById("audit-pricing");
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative py-24 sm:py-32 bg-black">
      <div className="relative z-10 w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="text-sm font-light text-white/60 tracking-wider uppercase">
              {t.audit.finalCta.eyebrow}
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight"
          >
            {t.audit.finalCta.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 text-white/70 font-light leading-relaxed max-w-2xl"
          >
            {t.audit.finalCta.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-10"
          >
            <button
              onClick={handleBookAudit}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-light hover:bg-white/90 transition-colors"
            >
              <span>{t.audit.finalCta.cta}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </motion.div>

          {/* Trust line */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 text-sm font-light"
          >
            <div className="flex items-center gap-6 text-white/50">
              <span>{t.audit.finalCta.trust1}</span>
              <span className="text-white/30">•</span>
              <span>
                {t.audit.finalCta.trust2} <span className="line-through text-white/30 ml-1">{t.audit.finalCta.trust2Strike}</span>
              </span>
              <span className="text-white/30">•</span>
              <span>{t.audit.finalCta.trust3}</span>
            </div>
            <div className="px-3 py-1 bg-white/10 text-white/90 text-xs">
              {t.audit.finalCta.limitedBadge}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

