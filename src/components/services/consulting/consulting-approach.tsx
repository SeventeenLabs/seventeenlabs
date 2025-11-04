"use client";

import { motion } from "framer-motion";
import { useTranslations } from "@/lib/i18n/context";
import { Compass, Rocket, Users, BarChart } from "lucide-react";

export default function ConsultingApproach() {
  const { t } = useTranslations();

  const approaches = [
    {
      icon: Compass,
      title: t("services.consulting.approach.items.strategy.title"),
      description: t("services.consulting.approach.items.strategy.description"),
    },
    {
      icon: Rocket,
      title: t("services.consulting.approach.items.implementation.title"),
      description: t("services.consulting.approach.items.implementation.description"),
    },
    {
      icon: Users,
      title: t("services.consulting.approach.items.training.title"),
      description: t("services.consulting.approach.items.training.description"),
    },
    {
      icon: BarChart,
      title: t("services.consulting.approach.items.optimization.title"),
      description: t("services.consulting.approach.items.optimization.description"),
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
            {t("services.consulting.approach.title")}
          </h2>
          <p className="text-lg text-white/60 font-light leading-relaxed max-w-3xl">
            {t("services.consulting.approach.description")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {approaches.map((approach, index) => {
            const Icon = approach.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-orange-500/10 border border-orange-500/20 mb-4">
                  <Icon className="w-6 h-6 text-orange-400" />
                </div>
                <h3 className="text-xl font-light text-white mb-2">
                  {approach.title}
                </h3>
                <p className="text-white/60 font-light text-sm leading-relaxed">
                  {approach.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
