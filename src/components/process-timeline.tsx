"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from "@/lib/i18n/context";
import { ArrowRight, SearchCheck, MessageSquare, Code2, Rocket } from "lucide-react";

export default function ProcessTimeline() {
  const { t } = useTranslations();
  const locale = useLocale();

  const steps = [
    {
      number: "01",
      icon: SearchCheck,
      title: t("processTimeline.audit.title"),
      description: t("processTimeline.audit.description"),
      color: "blue",
    },
    {
      number: "02",
      icon: MessageSquare,
      title: t("processTimeline.consulting.title"),
      description: t("processTimeline.consulting.description"),
      color: "orange",
    },
    {
      number: "03",
      icon: Code2,
      title: t("processTimeline.development.title"),
      description: t("processTimeline.development.description"),
      color: "emerald",
    },
    {
      number: "04",
      icon: Rocket,
      title: t("processTimeline.launch.title"),
      description: t("processTimeline.launch.description"),
      color: "white",
    },
  ];

  const colorClasses = {
    blue: {
      text: "text-blue-400",
      border: "border-blue-500/20",
      bg: "bg-blue-500/10",
    },
    orange: {
      text: "text-orange-400",
      border: "border-orange-500/20",
      bg: "bg-orange-500/10",
    },
    emerald: {
      text: "text-emerald-400",
      border: "border-emerald-500/20",
      bg: "bg-emerald-500/10",
    },
    white: {
      text: "text-white",
      border: "border-white/20",
      bg: "bg-white/10",
    },
  };

  return (
    <section className="relative bg-black py-24 lg:py-32 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl lg:text-5xl font-light text-white tracking-tight mb-4">
            {t("processTimeline.title")}
          </h2>
          <p className="text-xl text-white/60 font-light max-w-2xl mx-auto">
            {t("processTimeline.subtitle")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="relative h-full p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 flex flex-col">
                    <div className="text-6xl font-extralight text-white/10 absolute top-4 right-4">
                      {step.number}
                    </div>
                    <Icon className="w-8 h-8 text-white/60 mb-6 relative z-10" />
                    <h3 className="text-lg font-medium text-white mb-2 relative z-10">
                      {step.title}
                    </h3>
                    <p className="text-white/60 font-light text-sm leading-relaxed relative z-10">
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
