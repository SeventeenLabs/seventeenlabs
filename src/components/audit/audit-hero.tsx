"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";

interface AuditHeroProps {
  locale: string;
  t: any;
}

export default function AuditHero({ locale, t }: AuditHeroProps) {
  const handleBookAudit = () => {
    // Scroll to pricing section
    const pricingSection = document.getElementById("audit-pricing");
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen bg-black overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{
            backgroundImage: "url('/images/hero-bg.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/70 to-black" />
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
                {t.audit.hero.eyebrow}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-light text-white leading-[1.1] tracking-tight"
            >
              {t.audit.hero.title}{" "}
              <span className="block mt-2">{t.audit.hero.titleSecond}</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
              className="text-lg text-white/70 font-light max-w-2xl leading-relaxed"
            >
              {t.audit.hero.subtitle}
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
              className="pt-2"
            >
              <button
                onClick={handleBookAudit}
                className="group bg-white text-black px-8 py-4 rounded-sm font-light text-base hover:bg-white/90 transition-all duration-300 inline-flex items-center gap-2"
              >
                {t.audit.hero.cta}
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>

            {/* What's Included */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.7 }}
              className="pt-8 grid sm:grid-cols-2 gap-4 max-w-2xl"
            >
              {[
                t.audit.hero.included.item1,
                t.audit.hero.included.item2,
                t.audit.hero.included.item3,
                t.audit.hero.included.item4
              ].map((item: string, index: number) => (
                <div
                  key={index}
                  className="flex items-start gap-3 text-white/70 font-light text-sm"
                >
                  <CheckCircle2 className="h-4 w-4 text-white/60 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
