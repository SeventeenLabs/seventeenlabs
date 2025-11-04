"use client";

import { motion } from "framer-motion";
import { useTranslations } from "@/lib/i18n/context";
import { Target, Lightbulb, TrendingUp } from "lucide-react";

export default function WhatIsAudit() {
  const { t } = useTranslations();

  const features = [
    {
      icon: Target,
      title: t("services.audit.whatIs.features.analysis.title"),
      description: t("services.audit.whatIs.features.analysis.description"),
    },
    {
      icon: Lightbulb,
      title: t("services.audit.whatIs.features.recommendations.title"),
      description: t("services.audit.whatIs.features.recommendations.description"),
    },
    {
      icon: TrendingUp,
      title: t("services.audit.whatIs.features.roadmap.title"),
      description: t("services.audit.whatIs.features.roadmap.description"),
    },
  ];

  return (
    <section className="relative bg-black/95 py-20 lg:py-32">
      <div className="w-full px-6 sm:px-12 lg:px-16 xl:px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight mb-6">
            {t("services.audit.whatIs.title")}
          </h2>
          <p className="text-lg text-white/60 font-light leading-relaxed max-w-3xl">
            {t("services.audit.whatIs.description")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
                  <Icon className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-light text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-white/60 font-light text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
