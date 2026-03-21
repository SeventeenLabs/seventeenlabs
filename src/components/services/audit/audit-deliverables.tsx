"use client";

import { motion } from "framer-motion";
import { useTranslations } from "@/lib/i18n/context";
import { FileText, Map, Zap, LineChart } from "lucide-react";

export default function AuditDeliverables() {
  const { t } = useTranslations();

  const deliverables = [
    {
      icon: FileText,
      title: t("services.audit.deliverables.items.report.title"),
      description: t("services.audit.deliverables.items.report.description"),
    },
    {
      icon: Map,
      title: t("services.audit.deliverables.items.roadmap.title"),
      description: t("services.audit.deliverables.items.roadmap.description"),
    },
    {
      icon: Zap,
      title: t("services.audit.deliverables.items.quickWins.title"),
      description: t("services.audit.deliverables.items.quickWins.description"),
    },
    {
      icon: LineChart,
      title: t("services.audit.deliverables.items.roi.title"),
      description: t("services.audit.deliverables.items.roi.description"),
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
            {t("services.audit.deliverables.title")}
          </h2>
          <p className="text-lg text-white/60 font-light leading-relaxed max-w-3xl">
            {t("services.audit.deliverables.description")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {deliverables.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm"
              >
                <Icon className="w-8 h-8 text-blue-400 mb-4" />
                <h3 className="text-xl font-light text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-white/60 font-light text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
