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
    <section className="relative bg-black py-24 lg:py-32">
      {/* Section divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none"></div>
      
      <div className="relative w-full px-6 sm:px-12 lg:px-16 xl:px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/70 text-xs font-medium uppercase tracking-wider mb-6">
            {locale === 'de' ? 'Ihr Weg zum Erfolg' : 'Your Path to Results'}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight mb-4">
            {t("processTimeline.title")}
          </h2>
          <p className="text-lg text-white/60 font-light max-w-2xl">
            {t("processTimeline.subtitle")}
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row lg:items-stretch gap-4 lg:gap-0">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const colors = colorClasses[step.color as keyof typeof colorClasses];
              
              return (
                <div key={step.number} className="flex items-stretch flex-1">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative group flex-1"
                  >
                    {/* Card */}
                    <div className={`relative h-full p-6 lg:p-8 rounded-2xl border ${colors.border} ${colors.bg} backdrop-blur-sm hover:bg-opacity-20 transition-all duration-300 flex flex-col`}>
                      {/* Number Badge */}
                      <div className="absolute top-4 right-4">
                        <span className={`text-5xl lg:text-6xl font-extralight ${colors.text} opacity-20`}>
                          {step.number}
                        </span>
                      </div>

                      {/* Icon */}
                      <div className={`inline-flex items-center justify-center w-12 h-12 lg:w-14 lg:h-14 rounded-xl border ${colors.border} ${colors.bg} mb-5 lg:mb-6 relative z-10`}>
                        <Icon className={`w-5 h-5 lg:w-6 lg:h-6 ${colors.text}`} />
                      </div>

                      {/* Content */}
                      <h3 className="text-lg lg:text-xl font-medium text-white mb-3 relative z-10">
                        {step.title}
                      </h3>
                      <p className="text-white/60 font-light text-sm leading-relaxed flex-grow relative z-10">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                  
                  {/* Arrow between cards */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:flex items-center justify-center px-3">
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 border border-white/10"
                      >
                        <ArrowRight className="w-4 h-4 text-white/40" />
                      </motion.div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
      </div>
    </section>
  );
}
