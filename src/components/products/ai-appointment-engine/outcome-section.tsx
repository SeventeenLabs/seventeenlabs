"use client";

import { motion } from "framer-motion";
import { Smile, TrendingUp, DollarSign } from "lucide-react";
import { useTranslations, useLocale } from '@/lib/i18n/context';
import { getTranslations } from '@/lib/i18n/translations';

export default function OutcomeSection() {
  const { t } = useTranslations();
  const locale = useLocale();
  const translations = getTranslations(locale);
  const outcomeItems = translations.aiAppointmentEngine?.outcome?.items || [];

  const iconMap: { [key: number]: any } = {
    0: TrendingUp,  // Save 23+ Hours
    1: Smile,       // Client Happiness
    2: DollarSign,  // Higher Profit
    3: TrendingUp,  // Scale Without Headcount
    4: Smile,       // Professional Brand
    5: DollarSign,  // New Revenue
  };

  return (
    <section className="relative py-12 sm:py-20 lg:py-28 bg-black">
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-20">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="text-xs sm:text-sm font-light text-white/60 tracking-wider uppercase mb-4 sm:mb-6 block">
              {t('aiAppointmentEngine.outcome.eyebrow')}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-light text-white tracking-tight mb-8 sm:mb-12 leading-tight">
              <span dangerouslySetInnerHTML={{ __html: t('aiAppointmentEngine.outcome.title') }} />
            </h2>
            <div className="space-y-4 sm:space-y-6">
              {outcomeItems.map((item: any, index: number) => {
                const IconComponent = iconMap[index] || Smile;
                return (
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
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}