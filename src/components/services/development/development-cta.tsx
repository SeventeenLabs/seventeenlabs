"use client";

import { motion } from "framer-motion";
import { useTranslations } from "@/lib/i18n/context";
import { ArrowRight } from "lucide-react";

export default function DevelopmentCta() {
  const { t } = useTranslations();

  return (
    <section className="relative bg-black py-20 lg:py-32">
      <div className="w-full px-6 sm:px-12 lg:px-16 xl:px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight mb-6">
            {t("services.development.cta.title")}
          </h2>
          <p className="text-lg text-white/60 font-light leading-relaxed mb-8">
            {t("services.development.cta.description")}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="group px-8 py-3.5 text-sm font-medium text-black bg-emerald-500 rounded-lg hover:bg-emerald-400 transition-all duration-300 flex items-center justify-center gap-2">
              {t("services.development.cta.primaryButton")}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-3.5 text-sm font-light text-white border border-white/30 rounded-lg hover:border-white/60 transition-all duration-300">
              {t("services.development.cta.secondaryButton")}
            </button>
          </div>

          <div className="mt-12 grid sm:grid-cols-3 gap-6">
            <div className="p-4 rounded-lg border border-emerald-500/20 bg-emerald-500/5">
              <div className="text-2xl font-light text-emerald-400 mb-1">2-4 weeks</div>
              <div className="text-sm text-white/60">{t("services.development.cta.stats.mvp")}</div>
            </div>
            <div className="p-4 rounded-lg border border-emerald-500/20 bg-emerald-500/5">
              <div className="text-2xl font-light text-emerald-400 mb-1">100%</div>
              <div className="text-sm text-white/60">{t("services.development.cta.stats.custom")}</div>
            </div>
            <div className="p-4 rounded-lg border border-emerald-500/20 bg-emerald-500/5">
              <div className="text-2xl font-light text-emerald-400 mb-1">24/7</div>
              <div className="text-sm text-white/60">{t("services.development.cta.stats.support")}</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
