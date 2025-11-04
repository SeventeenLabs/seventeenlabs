"use client";

import { motion } from "framer-motion";
import { useTranslations } from "@/lib/i18n/context";
import { ArrowRight } from "lucide-react";

export default function ConsultingCta() {
  const { t } = useTranslations();

  return (
    <section className="relative bg-black/95 py-20 lg:py-32">
      <div className="w-full px-6 sm:px-12 lg:px-16 xl:px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight mb-6">
            {t("services.consulting.cta.title")}
          </h2>
          <p className="text-lg text-white/60 font-light leading-relaxed mb-8">
            {t("services.consulting.cta.description")}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="group px-8 py-3.5 text-sm font-medium text-black bg-orange-500 rounded-lg hover:bg-orange-400 transition-all duration-300 flex items-center justify-center gap-2">
              {t("services.consulting.cta.primaryButton")}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-3.5 text-sm font-light text-white border border-white/30 rounded-lg hover:border-white/60 transition-all duration-300">
              {t("services.consulting.cta.secondaryButton")}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
