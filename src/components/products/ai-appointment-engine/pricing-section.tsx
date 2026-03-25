"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from '@/lib/i18n/context';
import { getTranslations } from '@/lib/i18n/translations';

export default function PricingSection() {
  const { t } = useTranslations();
  const locale = useLocale();
  const translations = getTranslations(locale);
  const setupFeatures = translations.aiAppointmentEngine?.pricing?.setup?.features || [];
  const monthlyFeatures = translations.aiAppointmentEngine?.pricing?.monthly?.features || [];
  const valueItems = translations.aiAppointmentEngine?.pricing?.value?.items || [];
  return (
    <section id="pricing" className="relative py-12 sm:py-20 lg:py-28 bg-zinc-950 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/6 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-violet-500/8 rounded-full blur-2xl"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-purple-950/15 via-transparent to-violet-950/10"></div>
      </div>
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-20">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl"
        >
          {/* Header */}
          <span className="text-xs sm:text-sm font-light text-white/60 tracking-wider uppercase mb-4 sm:mb-6 block">
            {t('aiAppointmentEngine.pricing.eyebrow')}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-light text-white tracking-tight mb-8 sm:mb-12 leading-tight">
            <span dangerouslySetInnerHTML={{ __html: t('aiAppointmentEngine.pricing.title') }} />
          </h2>

          {/* Pricing */}
          <div className="mb-16 sm:mb-20">
            <div className="space-y-6 sm:space-y-8">
              <div className="pb-6 sm:pb-8 border-b border-white/10">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-3 sm:mb-4">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-light text-white mb-2 sm:mb-0">{t('aiAppointmentEngine.pricing.setup.title')}</h3>
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-light text-blue-400">{t('aiAppointmentEngine.pricing.setup.price')}</div>
                </div>
                <div className="space-y-1 sm:space-y-2 text-sm sm:text-base text-white/60 font-light">
                  {setupFeatures.map((feature: string, index: number) => (
                    <p key={index}>• {feature}</p>
                  ))}
                </div>
              </div>

              <div className="pb-6 sm:pb-8 border-b border-white/10">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-3 sm:mb-4">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-light text-white mb-2 sm:mb-0">{t('aiAppointmentEngine.pricing.monthly.title')}</h3>
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-light text-blue-400">{t('aiAppointmentEngine.pricing.monthly.price')}<span className="text-base sm:text-xl text-white/60">{t('aiAppointmentEngine.pricing.monthly.priceUnit')}</span></div>
                </div>
                <div className="space-y-1 sm:space-y-2 text-sm sm:text-base text-white/60 font-light">
                  {monthlyFeatures.map((feature: string, index: number) => (
                    <p key={index}>• {feature}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Value */}
          <div className="mb-16 sm:mb-20">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-light text-white mb-6 sm:mb-8">{t('aiAppointmentEngine.pricing.value.title')}</h3>
            <div className="space-y-4 sm:space-y-6">
              {valueItems.map((item: any, index: number) => (
                <div key={index} className={`flex flex-col sm:flex-row sm:items-end sm:justify-between pb-4 sm:pb-6 ${index === valueItems.length - 1 ? 'pt-4 border-t border-white/10' : 'border-b border-white/10'}`}>
                  <span className={`text-sm sm:text-lg font-light mb-2 sm:mb-0 ${index === valueItems.length - 1 ? 'text-xl text-white font-medium' : 'text-white/70'}`}>{item.label}</span>
                  <span className={`text-xl sm:text-2xl lg:text-3xl font-light ${index === valueItems.length - 1 ? 'text-4xl text-green-400' : index >= 2 ? 'text-white/70' : 'text-blue-400'}`}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Guarantee */}
          <div className="mb-12 pb-8 border-b border-green-500/20">
            <h3 className="text-2xl font-light text-white mb-4">{t('aiAppointmentEngine.guarantee.timeGuarantee.title')}</h3>
            <p className="text-xl text-white/70 font-light leading-relaxed mb-4">
              {t('aiAppointmentEngine.guarantee.timeGuarantee.description')}
            </p>
            <p className="text-white/60 font-light">
              {t('aiAppointmentEngine.guarantee.timeGuarantee.subtext')}
            </p>
          </div>

          {/* CTA */}
          <div>
            <h3 className="text-2xl font-light text-white mb-4">{t('aiAppointmentEngine.pricing.cta.title')}</h3>
            <p className="text-white/70 font-light mb-8">
              {t('aiAppointmentEngine.pricing.cta.description')}
            </p>
            <a href="https://calendly.com/chris-seventeenlabs/30min" target="_blank" rel="noopener noreferrer" className="group px-10 py-5 text-base font-medium text-black bg-blue-500 rounded-lg hover:bg-blue-400 transition-all duration-300 flex items-center gap-3 inline-flex">
              {t('aiAppointmentEngine.pricing.cta.button')}
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </a>
          </div>

        </motion.div>

      </div>
    </section>
  );
}