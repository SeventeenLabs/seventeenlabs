"use client";

import { motion } from "framer-motion";
import { useTranslations } from "@/lib/i18n/context";
import { Bot, Zap, Globe, Database } from "lucide-react";

export default function DevelopmentCapabilities() {
  const { t } = useTranslations();

  const capabilities = [
    {
      icon: Bot,
      title: t("services.development.capabilities.items.aiIntegration.title"),
      description: t("services.development.capabilities.items.aiIntegration.description"),
    },
    {
      icon: Zap,
      title: t("services.development.capabilities.items.automation.title"),
      description: t("services.development.capabilities.items.automation.description"),
    },
    {
      icon: Globe,
      title: t("services.development.capabilities.items.webApps.title"),
      description: t("services.development.capabilities.items.webApps.description"),
    },
    {
      icon: Database,
      title: t("services.development.capabilities.items.dataProcessing.title"),
      description: t("services.development.capabilities.items.dataProcessing.description"),
    },
  ];

  return (
    <section className="relative bg-black/95 py-20 lg:py-32">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight mb-6">
            {t("services.development.capabilities.title")}
          </h2>
          <p className="text-lg text-white/60 font-light leading-relaxed max-w-3xl">
            {t("services.development.capabilities.description")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {capabilities.map((capability, index) => {
            const Icon = capability.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
                  <Icon className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-xl font-light text-white mb-2">
                  {capability.title}
                </h3>
                <p className="text-white/60 font-light text-sm leading-relaxed">
                  {capability.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
