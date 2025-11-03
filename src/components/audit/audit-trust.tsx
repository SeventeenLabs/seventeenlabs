"use client";

import { motion } from "framer-motion";
import { Shield, Users, Award } from "lucide-react";

interface AuditTrustProps {
  locale: string;
  t: any;
}

export default function AuditTrust({ locale, t }: AuditTrustProps) {
  const indicators = [
    {
      icon: Shield,
      key: "indicator1" as const,
    },
    {
      icon: Users,
      key: "indicator2" as const,
    },
    {
      icon: Award,
      key: "indicator3" as const,
    }
  ];

  return (
    <section className="relative py-24 sm:py-32 bg-zinc-950">
      <div className="relative z-10 w-full px-6 sm:px-12 lg:px-16 xl:px-20">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="text-sm font-light text-white/60 tracking-wider uppercase">
              {t.audit.trust.eyebrow}
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight"
          >
            {t.audit.trust.title}
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 max-w-5xl">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-white/70 font-light leading-relaxed">
              {t.audit.trust.intro1}{" "}
              <span className="text-white">{t.audit.trust.intro1Bold}</span>{" "}
              {t.audit.trust.intro2}
            </p>
            
            <p className="text-white/70 font-light leading-relaxed">
              {t.audit.trust.intro3}{" "}
              <span className="text-white">{t.audit.trust.intro3Bold}</span>{" "}
              {t.audit.trust.intro4}
            </p>

            {/* Trust Indicators */}
            <div className="space-y-4 pt-6">
              {indicators.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-10 h-10 flex items-center justify-center">
                    <item.icon className="h-5 w-5 text-white/60" />
                  </div>
                  <span className="text-white/70 font-light text-sm">{t.audit.trust.indicators[item.key]}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <div className="border border-white/10 p-8">
              <div className="mb-8">
                <h3 className="text-2xl font-light text-white mb-2">{t.audit.trust.cardTitle}</h3>
                <p className="text-white/60 font-light text-sm">{t.audit.trust.cardSubtitle}</p>
              </div>
              
              <p className="text-white/70 font-light leading-relaxed mb-8">
                "{t.audit.trust.cardQuote}"
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/10">
                <div>
                  <div className="text-2xl font-light text-white mb-1">
                    {t.audit.trust.stats.stat1.value}
                  </div>
                  <div className="text-xs text-white/60 font-light">{t.audit.trust.stats.stat1.label}</div>
                </div>
                <div>
                  <div className="text-2xl font-light text-white mb-1">
                    {t.audit.trust.stats.stat2.value}
                  </div>
                  <div className="text-xs text-white/60 font-light">{t.audit.trust.stats.stat2.label}</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
