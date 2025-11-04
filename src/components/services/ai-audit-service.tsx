"use client";

import { motion } from "framer-motion";
import { useTranslations } from "@/lib/i18n/context";
import { SearchCheck, FileSearch, Target, CheckCircle2, ArrowRight } from "lucide-react";
import { useState } from "react";
import ContactModal from "@/components/contact-modal";
import Link from "next/link";

export default function AiAuditService() {
  const { t } = useTranslations();
  const [contactModalOpen, setContactModalOpen] = useState(false);

  const auditSteps = [
    {
      icon: FileSearch,
      title: t("services.audit.steps.analysis.title"),
      description: t("services.audit.steps.analysis.description"),
    },
    {
      icon: Target,
      title: t("services.audit.steps.opportunities.title"),
      description: t("services.audit.steps.opportunities.description"),
    },
    {
      icon: CheckCircle2,
      title: t("services.audit.steps.roadmap.title"),
      description: t("services.audit.steps.roadmap.description"),
    },
  ];

  return (
    <section id="ai-audit" className="relative bg-black/95 py-24 lg:py-32">
      <div className="w-full px-6 sm:px-12 lg:px-16 xl:px-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/20 bg-blue-500/10 backdrop-blur-sm mb-6">
              <SearchCheck className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-light text-blue-300">{t("services.audit.badge")}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight mb-6">
              {t("services.audit.title")}
            </h2>
            
            <p className="text-lg text-white/60 font-light leading-relaxed mb-4">
              {t("services.audit.description")}
            </p>

            <div className="mb-8 space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-white/70 flex-shrink-0 mt-0.5" />
                <p className="text-white/60 font-light">
                  {t("services.audit.benefits.analysis")}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-white/70 flex-shrink-0 mt-0.5" />
                <p className="text-white/60 font-light">
                  {t("services.audit.benefits.opportunities")}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-white/70 flex-shrink-0 mt-0.5" />
                <p className="text-white/60 font-light">
                  {t("services.audit.benefits.roadmap")}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setContactModalOpen(true)}
                className="group relative px-8 py-3.5 text-sm font-medium text-black bg-blue-500 rounded-lg hover:bg-blue-400 transition-all duration-300 shadow-lg shadow-blue-500/20"
              >
                {t("services.audit.ctaButton")}
              </button>
              <Link
                href="/services/ai-audit"
                className="group relative px-8 py-3.5 text-sm font-medium text-blue-300 border border-blue-500/20 rounded-lg hover:bg-blue-500/10 transition-all duration-300 inline-flex items-center gap-2"
              >
                {t("common.learnMore")}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* Right side - Audit Steps */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {auditSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex gap-4 p-6 rounded-xl border border-blue-500/10 bg-blue-500/5 backdrop-blur-sm hover:bg-blue-500/10 transition-all duration-300"
                >
                  <div className="flex-shrink-0">
                    <div className="inline-flex p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                      <Icon className="w-5 h-5 text-blue-400" />
                    </div>
                  </div>
                  <div>
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
