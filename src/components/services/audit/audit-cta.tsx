"use client";

import { motion } from "framer-motion";
import { useTranslations } from "@/lib/i18n/context";
import { ArrowRight } from "lucide-react";

export default function AuditCta() {
  const { t } = useTranslations();

  return (
    <section className="relative bg-black py-20 lg:py-32">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight mb-6">
            {t("services.audit.cta.title")}
          </h2>
          <p className="text-lg text-white/60 font-light leading-relaxed mb-8">
            {t("services.audit.cta.description")}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="group px-8 py-3.5 text-sm font-medium text-black bg-blue-500 rounded-lg hover:bg-blue-400 transition-all duration-300 flex items-center justify-center gap-2">
              {t("services.audit.cta.primaryButton")}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-3.5 text-sm font-light text-white border border-white/30 rounded-lg hover:border-white/60 transition-all duration-300">
              {t("services.audit.cta.secondaryButton")}
            </button>
          </div>

          <div className="mt-12 p-6 rounded-lg border border-blue-500/20 bg-blue-500/5">
            <p className="text-sm text-white/80 font-light">
              <strong className="text-white font-medium">{t("services.audit.cta.guarantee.title")}</strong> {t("services.audit.cta.guarantee.description")}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
