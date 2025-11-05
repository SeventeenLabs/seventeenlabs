"use client";

import { motion } from "framer-motion";
import { useLocale, useTranslations } from "@/lib/i18n/context";
import { MessageSquare, Lightbulb, Users, TrendingUp, CheckCircle2, ArrowRight } from "lucide-react";
import { useState } from "react";
import ContactModal from "@/components/contact-modal";
import Link from "next/link";
import { getLocalizedPath } from "@/lib/i18n/utils";

export default function ConsultingService() {
  const { t } = useTranslations();
  const locale = useLocale();
  const [contactModalOpen, setContactModalOpen] = useState(false);

  const consultingAreas = [
    {
      icon: Lightbulb,
      title: t("services.consulting.areas.strategy.title"),
      description: t("services.consulting.areas.strategy.description"),
    },
    {
      icon: Users,
      title: t("services.consulting.areas.implementation.title"),
      description: t("services.consulting.areas.implementation.description"),
    },
    {
      icon: TrendingUp,
      title: t("services.consulting.areas.optimization.title"),
      description: t("services.consulting.areas.optimization.description"),
    },
  ];

  return (
    <section id="consulting" className="relative bg-black/95 py-24 lg:py-32">
      <div className="w-full px-6 sm:px-12 lg:px-16 xl:px-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left side - Consulting Areas */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6 order-2 lg:order-1"
          >
            {consultingAreas.map((area, index) => {
              const Icon = area.icon;
              return (
                <motion.div
                  key={area.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex gap-4 p-6 rounded-xl border border-orange-500/10 bg-orange-500/5 backdrop-blur-sm hover:bg-orange-500/10 transition-all duration-300"
                >
                  <div className="flex-shrink-0">
                    <div className="inline-flex p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
                      <Icon className="w-5 h-5 text-orange-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-light text-white mb-2">
                      {area.title}
                    </h3>
                    <p className="text-white/60 font-light text-sm leading-relaxed">
                      {area.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Right side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500/20 bg-orange-500/10 backdrop-blur-sm mb-6">
              <MessageSquare className="w-4 h-4 text-orange-400" />
              <span className="text-sm font-light text-orange-300">{t("services.consulting.badge")}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight mb-6">
              {t("services.consulting.title")}
            </h2>
            
            <p className="text-lg text-white/60 font-light leading-relaxed mb-4">
              {t("services.consulting.description")}
            </p>

            <div className="mb-8 space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-white/70 flex-shrink-0 mt-0.5" />
                <p className="text-white/60 font-light">
                  {t("services.consulting.benefits.strategy")}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-white/70 flex-shrink-0 mt-0.5" />
                <p className="text-white/60 font-light">
                  {t("services.consulting.benefits.guidance")}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-white/70 flex-shrink-0 mt-0.5" />
                <p className="text-white/60 font-light">
                  {t("services.consulting.benefits.optimization")}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setContactModalOpen(true)}
                className="group relative px-8 py-3.5 text-sm font-medium text-black bg-orange-500 rounded-lg hover:bg-orange-400 transition-all duration-300 shadow-lg shadow-orange-500/20"
              >
                {t("services.consulting.ctaButton")}
              </button>
              <Link
                href={getLocalizedPath(locale, "/services/ai-consulting")}
                className="group relative px-8 py-3.5 text-sm font-medium text-orange-300 border border-orange-500/20 rounded-lg hover:bg-orange-500/10 transition-all duration-300 inline-flex items-center gap-2"
              >
                {t("services.consulting.learnMoreLink")}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Contact Modal */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />
    </section>
  );
}
