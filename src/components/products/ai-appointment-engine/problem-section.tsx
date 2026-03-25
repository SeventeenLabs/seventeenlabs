"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from '@/lib/i18n/context';
import { getTranslations } from '@/lib/i18n/translations';

export default function ProblemSection() {
  const { t } = useTranslations();
  const locale = useLocale();
  const translations = getTranslations(locale);
  const problemPoints = translations.aiAppointmentEngine?.problem?.points || [];

  return (
    <section className="relative py-12 sm:py-20 lg:py-28 bg-gradient-to-b from-zinc-950 to-black">
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-20">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="text-xs sm:text-sm font-light text-white/60 tracking-wider uppercase mb-4 sm:mb-6 block">
              {t('aiAppointmentEngine.problem.eyebrow')}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-light text-white tracking-tight mb-4 sm:mb-6 leading-tight">
              <span dangerouslySetInnerHTML={{ __html: t('aiAppointmentEngine.problem.title') }} />
            </h2>
            <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed mb-8 sm:mb-12">
              {t('aiAppointmentEngine.problem.description')}
            </p>
            <div className="space-y-4 sm:space-y-6">
              {problemPoints.map((item: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="border-l-2 border-blue-400/30 pl-3 sm:pl-4"
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