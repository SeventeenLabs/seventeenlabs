"use client";

import { motion } from "framer-motion";
import { useLocale, useTranslations } from "@/lib/i18n/context";
import { Code2, Workflow, Bot, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import { useState } from "react";
import ContactModal from "@/components/contact-modal";
import Link from "next/link";
import { getLocalizedPath } from "@/lib/i18n/utils";

export default function DevelopmentService() {
  const { t } = useTranslations();
  const locale = useLocale();
  const [contactModalOpen, setContactModalOpen] = useState(false);

  const developmentTypes = [
    {
      icon: Workflow,
      title: t("services.development.types.automation.title"),
      description: t("services.development.types.automation.description"),
    },
    {
      icon: Bot,
      title: t("services.development.types.aiApps.title"),
      description: t("services.development.types.aiApps.description"),
    },
    {
      icon: Sparkles,
      title: t("services.development.types.integration.title"),
      description: t("services.development.types.integration.description"),
    },
  ];

  return (
    <section id="development" className="relative bg-black/95 py-24 lg:py-32">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 backdrop-blur-sm mb-6">
              <Code2 className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-light text-emerald-300">{t("services.development.badge")}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight mb-6">
              {t("services.development.title")}
            </h2>
            
            <p className="text-lg text-white/60 font-light leading-relaxed mb-4">
              {t("services.development.description")}
            </p>

            <div className="mb-8 space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-white/70 flex-shrink-0 mt-0.5" />
                <p className="text-white/60 font-light">
                  {t("services.development.benefits.custom")}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-white/70 flex-shrink-0 mt-0.5" />
                <p className="text-white/60 font-light">
                  {t("services.development.benefits.scalable")}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-white/70 flex-shrink-0 mt-0.5" />
                <p className="text-white/60 font-light">
                  {t("services.development.benefits.integration")}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setContactModalOpen(true)}
                className="group relative px-8 py-3.5 text-sm font-medium text-black bg-emerald-500 rounded-lg hover:bg-emerald-400 transition-all duration-300 shadow-lg shadow-emerald-500/20"
              >
                {t("services.development.ctaButton")}
              </button>
                <Link
                  href={getLocalizedPath(locale, "/services/ai-development")}
                  className="group relative px-8 py-3.5 text-sm font-medium text-emerald-300 border border-emerald-500/20 rounded-lg hover:bg-emerald-500/10 transition-all duration-300 inline-flex items-center gap-2"
                >
                  {t("services.development.learnMoreLink")}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* Right side - Development Types */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {developmentTypes.map((type, index) => {
              const Icon = type.icon;
              return (
                <motion.div
                  key={type.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex gap-4 p-6 rounded-xl border border-emerald-500/10 bg-emerald-500/5 backdrop-blur-sm hover:bg-emerald-500/10 transition-all duration-300"
                >
                  <div className="flex-shrink-0">
                    <div className="inline-flex p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                      <Icon className="w-5 h-5 text-emerald-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-light text-white mb-2">
                      {type.title}
                    </h3>
                    <p className="text-white/60 font-light text-sm leading-relaxed">
                      {type.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
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
