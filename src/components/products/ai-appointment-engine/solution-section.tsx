"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from '@/lib/i18n/context';
import { getTranslations } from '@/lib/i18n/translations';

export default function SolutionSection() {
  const { t } = useTranslations();
  const locale = useLocale();
  const translations = getTranslations(locale);
  const solutionItems = translations.aiAppointmentEngine?.solution?.items || [];

  return (
    <section className="relative py-12 sm:py-20 lg:py-28 bg-zinc-950 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-blue-500/8 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-1/3 right-1/3 w-56 h-56 bg-cyan-500/6 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '6s' }}></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-950/20 via-transparent to-cyan-950/10"></div>
      </div>
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-20">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="text-xs sm:text-sm font-light text-white/60 tracking-wider uppercase mb-4 sm:mb-6 block">
              {t('aiAppointmentEngine.solution.eyebrow')}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-light text-white tracking-tight mb-8 sm:mb-12 leading-tight">
              {t('aiAppointmentEngine.solution.title')}
            </h2>
            <div className="space-y-4 sm:space-y-6">
              {solutionItems.map((item: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="pb-4 sm:pb-6 border-b border-white/10 last:border-0"
                >
                  <h3 className="text-base sm:text-lg font-medium text-white mb-1 sm:mb-2">{item.title}</h3>
                  <p className="text-sm text-white/60 font-light leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}