"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Clock } from "lucide-react";
import BlueprintBookingModal from "./blueprint-booking-modal";

interface AuditPricingProps {
  locale: string;
  t: any;
}

export default function AuditPricing({ locale, t }: AuditPricingProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBookAudit = () => {
    // Track GA4 event with detailed information
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'click_cta', {
        event_category: 'Blueprint',
        event_label: 'Pricing CTA - Get Your Blueprint Now',
        cta_location: 'pricing_section',
        cta_position: 'middle',
        value: 499,
        currency: 'USD',
        price_type: 'early_adopter',
        original_price: 1497,
        discount_amount: 998,
        discount_percentage: 67,
        page_path: window.location.pathname,
        page_location: window.location.href,
        user_language: locale,
        page_title: document.title,
        viewport_width: window.innerWidth,
        scroll_depth: Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100),
      });
    }
    
    // Open the booking modal
    setIsModalOpen(true);
  };

  const features = [
    t.audit.pricing.features.item1,
    t.audit.pricing.features.item2,
    t.audit.pricing.features.item3,
    t.audit.pricing.features.item4,
    t.audit.pricing.features.item5,
    t.audit.pricing.features.item6,
    t.audit.pricing.features.item7
  ];

  return (
    <section id="audit-pricing" className="relative py-24 sm:py-32 bg-black">
      <div className="relative z-10 w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="text-sm font-light text-white/60 tracking-wider uppercase">
              {t.audit.pricing.eyebrow}
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight"
          >
            {t.audit.pricing.title}
          </motion.h2>
        </div>

        {/* Pricing Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-lg"
        >
          <div className="border border-white/10 p-8">
            {/* Header */}
            <div className="mb-8">
              <h3 className="text-2xl font-light text-white mb-2">
                {t.audit.pricing.cardTitle}
              </h3>
              <p className="text-white/60 font-light text-sm">
                {t.audit.pricing.cardSubtitle}
              </p>
            </div>

            {/* Features */}
            <div className="space-y-3 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="h-4 w-4 text-white/60 flex-shrink-0 mt-0.5" />
                  <span className="text-white/70 font-light text-sm">{feature}</span>
                </motion.div>
              ))}
            </div>

            {/* Price */}
            <div className="border-t border-white/10 pt-8 mb-8">
              <div className="mb-3">
                <div className="inline-block px-3 py-1 bg-white/10 text-white/90 text-xs font-light mb-3">
                  {t.audit.pricing.earlyAdopter}
                </div>
              </div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-5xl font-light text-white">
                  {t.audit.pricing.price}
                </span>
                <span className="text-xl font-light text-white/40 line-through">
                  {t.audit.pricing.originalPrice}
                </span>
              </div>
              <div className="flex items-center gap-2 text-white/60 text-xs font-light mb-3">
                <Clock className="h-3 w-3" />
                <span>{t.audit.pricing.delivery}</span>
              </div>
              <p className="text-white/50 text-xs font-light">
                {t.audit.pricing.limited}
              </p>
            </div>

            {/* CTA Button */}
            <button
              onClick={handleBookAudit}
              className="group w-full bg-white text-black px-8 py-4 rounded-sm font-light text-base hover:bg-white/90 transition-all duration-300 inline-flex items-center justify-center gap-2"
            >
              <span>{t.audit.pricing.cta}</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Subtext */}
            <p className="text-white/40 text-xs font-light mt-4">
              Secure checkout via Stripe — audit fee credited toward implementation.
            </p>
          </div>
        </motion.div>

        {/* Optional Add-on */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 max-w-lg"
        >
          <p className="text-white/60 font-light text-sm">
            Add a 30-minute strategy session where we walk you through your roadmap in detail for an additional <span className="text-white">$250</span>.
          </p>
        </motion.div>
      </div>

      {/* Booking Modal */}
      <BlueprintBookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        locale={locale}
      />
    </section>
  );
}
