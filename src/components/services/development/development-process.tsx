"use client";

import { motion } from "framer-motion";
import { useTranslations } from "@/lib/i18n/context";
import { CheckCircle, Code, Rocket, BarChart3 } from "lucide-react";

export default function DevelopmentProcess() {
  const { t } = useTranslations();

  const steps = [
    {
      number: "01",
      icon: CheckCircle,
      title: t("services.development.process.steps.discovery.title"),
      description: t("services.development.process.steps.discovery.description"),
    },
    {
      number: "02",
      icon: Code,
      title: t("services.development.process.steps.development.title"),
      description: t("services.development.process.steps.development.description"),
    },
    {
      number: "03",
      icon: Rocket,
      title: t("services.development.process.steps.deployment.title"),
      description: t("services.development.process.steps.deployment.description"),
    },
    {
      number: "04",
      icon: BarChart3,
      title: t("services.development.process.steps.support.title"),
      description: t("services.development.process.steps.support.description"),
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
            {t("services.development.process.title")}
          </h2>
          <p className="text-lg text-white/60 font-light leading-relaxed max-w-3xl">
            {t("services.development.process.description")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="p-6 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm h-full">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
                    <Icon className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div className="text-3xl font-light text-emerald-400 mb-3">
                    {step.number}
                  </div>
                  <h3 className="text-lg font-light text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-white/60 font-light text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
