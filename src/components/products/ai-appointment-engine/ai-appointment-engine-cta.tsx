"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from '@/lib/i18n/context';
import { getTranslations } from '@/lib/i18n/translations';

export default function AIAppointmentEngineCta() {
  const { t } = useTranslations();
  const locale = useLocale();
  const translations = getTranslations(locale);
  const benefitItems = translations.reportFlowEngine?.finalCta?.benefits?.items || [];
  return (
    <section className="relative py-12 sm:py-20 lg:py-28 bg-gradient-to-t from-black to-zinc-950">
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl"
        >
          <span className="text-xs sm:text-sm font-light text-white/60 tracking-wider uppercase mb-4 sm:mb-6 block">
            {t('reportFlowEngine.finalCta.eyebrow')}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-light text-white tracking-tight mb-4 sm:mb-6 leading-tight">
            <span dangerouslySetInnerHTML={{ __html: t('reportFlowEngine.finalCta.title') }} />
          </h2>
          <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed mb-8 sm:mb-10">
            {t('reportFlowEngine.finalCta.description')}
          </p>
          
          <div className="mb-8 sm:mb-10">
            <a href="https://calendly.com/chris-seventeenlabs/30min" target="_blank" rel="noopener noreferrer" className="group w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 text-sm sm:text-base font-medium text-black bg-blue-500 rounded-lg hover:bg-blue-400 transition-all duration-300 flex items-center justify-center gap-3">
              {t('reportFlowEngine.finalCta.button')}
              <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </a>
            <p className="text-sm text-white/60 font-light mt-3 sm:mt-4 text-center sm:text-left">
              {t('reportFlowEngine.finalCta.buttonSubtext')}
            </p>
          </div>

          <div className="space-y-3 sm:space-y-4 pb-6 sm:pb-8 border-b border-white/10">
            <h3 className="text-lg sm:text-xl font-medium text-white">{t('reportFlowEngine.finalCta.benefits.title')}</h3>
            <div className="space-y-1 sm:space-y-2 text-sm sm:text-base text-white/70 font-light">
              {benefitItems.map((item: string, index: number) => (
                <p key={index}>✓ {item}</p>
              ))}
            </div>
          </div>

          <div className="pt-6 sm:pt-8">
            <p className="text-white/60 font-light text-xs sm:text-sm text-center sm:text-left">
              <span dangerouslySetInnerHTML={{ __html: t('reportFlowEngine.finalCta.contact') }} />
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
