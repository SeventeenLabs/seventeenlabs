"use client";

import { motion } from "framer-motion";
import { useTranslations } from "@/lib/i18n/context";
import { Sparkles, Zap, Rocket } from "lucide-react";

export default function WhatWeDo() {
  const { t } = useTranslations();

  const features = [
    {
      icon: Sparkles,
      title: t("whatWeDo.aiProducts.title"),
      description: t("whatWeDo.aiProducts.description"),
    },
    {
      icon: Zap,
      title: t("whatWeDo.automation.title"),
      description: t("whatWeDo.automation.description"),
    },
    {
      icon: Rocket,
      title: t("whatWeDo.custom.title"),
      description: t("whatWeDo.custom.description"),
    },
  ];

  return (
    <section id="what-we-do" className="relative bg-black py-24 lg:py-32">
      {/* Top divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      
      <div className="mx-auto max-w-7xl px-6 sm:px-12 lg:px-16 xl:px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight">
            {t("whatWeDo.title")}
          </h2>
          <p className="mt-6 text-lg text-white/60 max-w-2xl mx-auto font-light">
            {t("whatWeDo.subtitle")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="flex flex-col items-start">
                  <div className="inline-flex p-3 rounded-lg bg-white/5 border border-white/10 mb-6">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-light text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-white/60 font-light leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
    </section>
  );
}
