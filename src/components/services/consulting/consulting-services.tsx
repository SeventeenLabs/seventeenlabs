"use client";

import { motion } from "framer-motion";
import { useTranslations } from "@/lib/i18n/context";
import { Brain, Workflow, Settings } from "lucide-react";

export default function ConsultingServices() {
  const { t } = useTranslations();

  const services = [
    {
      icon: Brain,
      title: t("services.consulting.services.items.aiStrategy.title"),
      description: t("services.consulting.services.items.aiStrategy.description"),
      features: [
        t("services.consulting.services.items.aiStrategy.features.assessment"),
        t("services.consulting.services.items.aiStrategy.features.roadmap"),
        t("services.consulting.services.items.aiStrategy.features.governance"),
      ],
    },
    {
      icon: Workflow,
      title: t("services.consulting.services.items.processOptimization.title"),
      description: t("services.consulting.services.items.processOptimization.description"),
      features: [
        t("services.consulting.services.items.processOptimization.features.analysis"),
        t("services.consulting.services.items.processOptimization.features.automation"),
        t("services.consulting.services.items.processOptimization.features.monitoring"),
      ],
    },
    {
      icon: Settings,
      title: t("services.consulting.services.items.integration.title"),
      description: t("services.consulting.services.items.integration.description"),
      features: [
        t("services.consulting.services.items.integration.features.evaluation"),
        t("services.consulting.services.items.integration.features.implementation"),
        t("services.consulting.services.items.integration.features.support"),
      ],
    },
  ];

  return (
    <section className="relative bg-black py-20 lg:py-32">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight mb-6">
            {t("services.consulting.services.title")}
          </h2>
          <p className="text-lg text-white/60 font-light leading-relaxed max-w-3xl">
            {t("services.consulting.services.description")}
          </p>
        </motion.div>

        <div className="space-y-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-8 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm"
              >
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-500/10 border border-orange-500/20">
                      <Icon className="w-8 h-8 text-orange-400" />
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-2xl font-light text-white mb-3">
                      {service.title}
                    </h3>
                    <p className="text-white/60 font-light leading-relaxed mb-4">
                      {service.description}
                    </p>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-white/80">
                          <div className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
