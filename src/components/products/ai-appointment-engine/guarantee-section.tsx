"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from '@/lib/i18n/context';
import { getTranslations } from '@/lib/i18n/translations';

export default function GuaranteeSection() {
  const { t } = useTranslations();
  const locale = useLocale();
  const translations = getTranslations(locale);
  const mathItems = translations.reportFlowEngine?.guarantee?.math?.items || [];
  return (
    <section className="relative py-12 sm:py-20 lg:py-28 bg-gradient-to-b from-zinc-950 to-black">
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl"
        >
          <span className="text-xs sm:text-sm font-light text-white/60 tracking-wider uppercase mb-4 sm:mb-6 block">
            {t('reportFlowEngine.guarantee.eyebrow')}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-light text-white tracking-tight mb-4 sm:mb-6 leading-tight">
            <span dangerouslySetInnerHTML={{ __html: t('reportFlowEngine.guarantee.title') }} />
          </h2>
          <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed mb-8 sm:mb-10">
            {t('reportFlowEngine.guarantee.description')}
          </p>

          <div className="space-y-4 sm:space-y-6">
            <div className="pb-4 sm:pb-6 border-b border-white/10">
              <h3 className="text-lg sm:text-xl font-light text-white mb-2 sm:mb-3">{t('reportFlowEngine.guarantee.timeGuarantee.title')}</h3>
              <p className="text-sm text-white/70 font-light leading-relaxed mb-2 sm:mb-3">
                {t('reportFlowEngine.guarantee.timeGuarantee.description')}
              </p>
              <p className="text-sm text-white/60 font-light">
                {t('reportFlowEngine.guarantee.timeGuarantee.subtext')}
              </p>
            </div>

            <div className="pb-4 sm:pb-6 border-b border-white/10">
              <h3 className="text-lg sm:text-xl font-light text-white mb-3 sm:mb-4">{t('reportFlowEngine.guarantee.math.title')}</h3>
              <div className="space-y-2 sm:space-y-3 text-sm text-white/70 font-light">
                {mathItems.map((item: string, index: number) => (
                  <p key={index}>• {item}</p>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-light text-white mb-4">Why We Can Guarantee This</h3>
              <p className="text-white/70 font-light leading-relaxed">
                We've implemented this system for dozens of agencies. The time savings are consistent and measurable because reporting automation eliminates predictable, repeatable manual work. This isn't a "maybe it works" solution — it's a proven system that delivers the same results every time.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}