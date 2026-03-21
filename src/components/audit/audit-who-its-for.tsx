"use client";

import { motion } from "framer-motion";
import { Megaphone, Palette, Rocket, Users } from "lucide-react";

interface AuditWhoItsForProps {
  locale: string;
  t: any;
}

const targetAudiences = [
  {
    icon: Megaphone,
    key: "marketing" as const,
  },
  {
    icon: Palette,
    key: "creative" as const,
  },
  {
    icon: Rocket,
    key: "growth" as const,
  },
  {
    icon: Users,
    key: "consultants" as const,
  }
];

export default function AuditWhoItsFor({ locale, t }: AuditWhoItsForProps) {
  return (
    <section className="relative py-24 sm:py-32 bg-zinc-950">
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
              {t.audit.whoItsFor.eyebrow}
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight"
          >
            {t.audit.whoItsFor.title}
          </motion.h2>
        </div>

        {/* Audience Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {targetAudiences.map((audience, index) => {
            const Icon = audience.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="border border-white/10 p-8 bg-black/50"
              >
                <div className="w-12 h-12 flex items-center justify-center mb-6">
                  <Icon className="h-6 w-6 text-white/60" />
                </div>
                
                <h3 className="text-xl font-light text-white mb-4">
                  {t.audit.whoItsFor.audiences[audience.key].title}
                </h3>
                
                <p className="text-white/60 font-light leading-relaxed">
                  {t.audit.whoItsFor.audiences[audience.key].description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-3xl"
        >
          <p className="text-lg text-white/70 font-light leading-relaxed">
            {t.audit.whoItsFor.bottomText}{" "}
            <span className="text-white">{t.audit.whoItsFor.bottomTextBold}</span>{" "}
            {t.audit.whoItsFor.bottomTextOr}{" "}
            <span className="text-white">{t.audit.whoItsFor.bottomTextHow}</span>{" "}
            {t.audit.whoItsFor.bottomTextEnd}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
