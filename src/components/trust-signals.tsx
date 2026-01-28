"use client";

import { motion } from "framer-motion";
import { Shield, Zap, HeadphonesIcon, RefreshCw } from "lucide-react";
import { useTranslations } from "@/lib/i18n/context";

export default function TrustSignals() {
  const { t } = useTranslations();

  const guarantees = [
    {
      icon: Shield,
      title: t("trustSignals.guarantees.moneyBack", "30-Day Guarantee"),
      description: t("trustSignals.guarantees.moneyBackDesc", "Full refund if not satisfied"),
    },
    {
      icon: Zap,
      title: t("trustSignals.guarantees.fastSetup", "Quick Setup"),
      description: t("trustSignals.guarantees.fastSetupDesc", "Live in days, not months"),
    },
    {
      icon: HeadphonesIcon,
      title: t("trustSignals.guarantees.support", "Direct Support"),
      description: t("trustSignals.guarantees.supportDesc", "Chat directly with Chris"),
    },
    {
      icon: RefreshCw,
      title: t("trustSignals.guarantees.flexible", "No Lock-In"),
      description: t("trustSignals.guarantees.flexibleDesc", "Own your workflows completely"),
    },
  ];

  return (
    <section className="relative bg-black py-16 border-y border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {guarantees.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center"
              >
                <div className="mb-4 p-3 rounded-full bg-white/5 border border-white/10">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-white/60 font-light">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
