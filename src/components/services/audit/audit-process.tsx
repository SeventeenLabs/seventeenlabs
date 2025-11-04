"use client";

import { motion } from "framer-motion";
import { useTranslations } from "@/lib/i18n/context";
import { Calendar, Users, FileSearch, Presentation } from "lucide-react";

export default function AuditProcess() {
  const { t } = useTranslations();

  const steps = [
    {
      number: "01",
      icon: Calendar,
      title: t("services.audit.process.steps.kickoff.title"),
      description: t("services.audit.process.steps.kickoff.description"),
      duration: t("services.audit.process.steps.kickoff.duration"),
    },
    {
      number: "02",
      icon: FileSearch,
      title: t("services.audit.process.steps.analysis.title"),
      description: t("services.audit.process.steps.analysis.description"),
      duration: t("services.audit.process.steps.analysis.duration"),
    },
    {
      number: "03",
      icon: Users,
      title: t("services.audit.process.steps.workshop.title"),
      description: t("services.audit.process.steps.workshop.description"),
      duration: t("services.audit.process.steps.workshop.duration"),
    },
    {
      number: "04",
      icon: Presentation,
      title: t("services.audit.process.steps.delivery.title"),
      description: t("services.audit.process.steps.delivery.description"),
      duration: t("services.audit.process.steps.delivery.duration"),
    },
  ];

  return (
    <section className="relative bg-black py-20 lg:py-32">
      <div className="w-full px-6 sm:px-12 lg:px-16 xl:px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight mb-6">
            {t("services.audit.process.title")}
          </h2>
          <p className="text-lg text-white/60 font-light leading-relaxed max-w-3xl">
            {t("services.audit.process.description")}
          </p>
        </motion.div>

        <div className="space-y-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row gap-6 p-6 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm hover:border-blue-500/30 transition-colors"
              >
                <div className="flex-shrink-0">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/20">
                    <Icon className="w-8 h-8 text-blue-400" />
                  </div>
                </div>
                
                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl font-light text-blue-400">{step.number}</span>
                    <h3 className="text-xl font-light text-white">{step.title}</h3>
                  </div>
                  <p className="text-white/60 font-light leading-relaxed mb-2">
                    {step.description}
                  </p>
                  <span className="text-sm text-blue-400/80 font-light">
                    {step.duration}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
