"use client";

import { motion } from "framer-motion";
import { Clock, TrendingUp, Zap, Shield } from "lucide-react";
import { useTranslations } from "@/lib/i18n/context";

export default function WhySeventeenLabs() {
  const { t } = useTranslations();

  const benefits = [
    {
      title: t("whySeventeenLabs.reasons.saveTime.title"),
      description: t("whySeventeenLabs.reasons.saveTime.description"),
      icon: Clock,
      stat: t("whySeventeenLabs.reasons.saveTime.stat"),
    },
    {
      title: t("whySeventeenLabs.reasons.smarterGrowth.title"),
      description: t("whySeventeenLabs.reasons.smarterGrowth.description"),
      icon: TrendingUp,
      stat: t("whySeventeenLabs.reasons.smarterGrowth.stat"),
    },
    {
      title: t("whySeventeenLabs.reasons.easyImplementation.title"), 
      description: t("whySeventeenLabs.reasons.easyImplementation.description"),
      icon: Zap,
      stat: t("whySeventeenLabs.reasons.easyImplementation.stat"),
    },
    {
      title: t("whySeventeenLabs.reasons.trustedSupport.title"),
      description: t("whySeventeenLabs.reasons.trustedSupport.description"),
      icon: Shield,
      stat: t("whySeventeenLabs.reasons.trustedSupport.stat"),
    },
  ];
  return (
    <section className="bg-black px-6 py-24 text-white relative">
      {/* Top divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      
      <div className="mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl font-light tracking-tight text-white md:text-5xl">
            {t("whySeventeenLabs.title")}
          </h2>
          <p className="mt-4 text-xl text-white/70 font-light max-w-3xl mx-auto">
            {t("whySeventeenLabs.subtitle")}
          </p>
        </motion.div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            
            return (
              <motion.div 
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group text-center"
              >
                <div className="relative mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl bg-white/5 border border-white/10 group-hover:border-white/20 transition-colors">
                  <Icon className="size-8 text-white" />
                </div>
                
                <div className="mb-2 text-sm font-light text-white/60 uppercase tracking-wider">
                  {benefit.stat}
                </div>
                
                <h3 className="mb-3 text-xl font-light text-white">
                  {benefit.title}
                </h3>
                
                <p className="text-sm text-white/70 font-light leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
