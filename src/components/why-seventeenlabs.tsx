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
    <section className="bg-slate-800 px-6 py-24 text-slate-100 relative">
      
      <div className="mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            {t("whySeventeenLabs.title")}
          </h2>
          <p className="mt-4 text-xl text-slate-300 max-w-3xl mx-auto">
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
                <div className="relative mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl bg-slate-900 border border-slate-800 group-hover:border-slate-700 transition-colors">
                  <Icon className="size-8 text-slate-300" aria-hidden />
                </div>
                
                <div className="mb-2 text-sm font-bold text-slate-400 uppercase tracking-wider">
                  {benefit.stat}
                </div>
                
                <h3 className="mb-3 text-xl font-bold text-white">
                  {benefit.title}
                </h3>
                
                <p className="text-sm text-slate-300 leading-relaxed">
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
