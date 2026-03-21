"use client";

import { motion } from "framer-motion";
import { Clock, TrendingUp, Users, Zap, Shield, CheckCircle } from "lucide-react";
import { useTranslations, useLocale } from '@/lib/i18n/context';
import { getTranslations } from '@/lib/i18n/translations';

export default function GuaranteeSection() {
  const { t } = useTranslations();
  const locale = useLocale();
  const translations = getTranslations(locale);
  const impactItems = translations.aiAppointmentEngine?.guarantee?.math?.items || [];
  
  const impactIcons = [Clock, Zap, TrendingUp, Users];
  
  return (
    <section className="relative py-16 sm:py-24 lg:py-32 bg-gradient-to-b from-zinc-950 to-black">
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl"
        >
          <span className="text-xs sm:text-sm font-light text-white/60 tracking-wider uppercase mb-6 sm:mb-8 block">
            {t('aiAppointmentEngine.guarantee.eyebrow')}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-light text-white tracking-tight mb-6 sm:mb-8 leading-tight">
            <span dangerouslySetInnerHTML={{ __html: t('aiAppointmentEngine.guarantee.title') }} />
          </h2>
          <p className="text-lg sm:text-xl text-white/70 font-light leading-relaxed mb-12 sm:mb-16 max-w-3xl">
            {t('aiAppointmentEngine.guarantee.description')}
          </p>

          <div className="space-y-8 sm:space-y-12">
            {/* Time Guarantee Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-400/20 rounded-xl p-6 sm:p-8 lg:p-10"
            >
              <div className="flex items-start gap-4 sm:gap-6 mb-4 sm:mb-6">
                <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <Shield className="w-6 h-6 sm:w-7 sm:h-7 text-blue-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-light text-white mb-3 sm:mb-4">
                    {t('aiAppointmentEngine.guarantee.timeGuarantee.title')}
                  </h3>
                  <p className="text-base sm:text-lg text-white/80 font-light leading-relaxed mb-3 sm:mb-4">
                    {t('aiAppointmentEngine.guarantee.timeGuarantee.description')}
                  </p>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm sm:text-base text-white/60 font-light">
                      {t('aiAppointmentEngine.guarantee.timeGuarantee.subtext')}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Impact Grid */}
            <div>
              <h3 className="text-2xl sm:text-3xl font-light text-white mb-6 sm:mb-8">
                {t('aiAppointmentEngine.guarantee.math.title')}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {impactItems.map((item: string, index: number) => {
                  const IconComponent = impactIcons[index] || Clock;
                  return (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 + (index * 0.1) }}
                      viewport={{ once: true }}
                      className="bg-white/[0.03] border border-white/10 rounded-xl p-5 sm:p-6 hover:bg-white/[0.05] hover:border-white/20 transition-all duration-300"
                    >
                      <div className="flex items-start gap-3 sm:gap-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                          <IconComponent className="w-5 h-5 text-blue-400" />
                        </div>
                        <p className="text-sm sm:text-base text-white/70 font-light leading-relaxed pt-1">
                          {item}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Why This Works */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="pt-6 sm:pt-8 border-t border-white/10"
            >
              <h3 className="text-xl sm:text-2xl font-light text-white mb-4 sm:mb-5">
                Why This Works
              </h3>
              <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed">
                Reporting automation eliminates predictable, repeatable manual work. By automating data collection, report generation, and delivery, you remove hours of tedious tasks from your team's workload. The time savings are consistent and measurable because the system handles the same repetitive work your team does manually today.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}