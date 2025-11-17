"use client";

import { motion } from "framer-motion";
import { useTranslations } from '@/lib/i18n/context';
import { useSearchParams } from 'next/navigation';
import { useMemo, Suspense } from 'react';

function HeroContent() {
  const { t } = useTranslations();
  const searchParams = useSearchParams();
  
  const targetCustomer = useMemo(() => {
    return searchParams.get('customer') || 'marketing agencies';
  }, [searchParams]);

  const description = useMemo(() => {
    return t('reportFlowEngine.hero.description').replace('marketing agencies', targetCustomer);
  }, [t, targetCustomer]);

  return (
    <section className="relative min-h-screen flex flex-col bg-zinc-950 overflow-hidden">
      {/* Glowing Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 -right-20 w-64 h-64 bg-purple-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-transparent to-purple-950/20"></div>
      </div>
      <div className="flex-1 flex items-center relative z-10">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-20 py-20 sm:py-28 lg:py-32 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            >
              <span className="text-xs sm:text-sm font-light text-white/60 tracking-wider uppercase">
                {t('reportFlowEngine.hero.eyebrow')}
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-white tracking-tight mb-4 sm:mb-6 leading-tight mt-4 sm:mt-6"
            >
              <span dangerouslySetInnerHTML={{ __html: t('reportFlowEngine.hero.title') }} />
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-base sm:text-lg lg:text-xl text-white/70 font-light leading-relaxed mb-8 sm:mb-10 max-w-3xl"
            >
              {description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              <div className="mb-4">
                <a href="https://calendly.com/chris-seventeenlabs/30min" target="_blank" rel="noopener noreferrer" className="inline-flex group px-10 py-5 text-base font-medium text-black bg-blue-500 rounded-lg hover:bg-blue-400 transition-all duration-300 shadow-lg shadow-blue-500/25 items-center gap-3">
                  {t('reportFlowEngine.hero.primaryCta')}
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </a>
              </div>
              <p className="text-white/60 font-light text-sm">
                {t('reportFlowEngine.hero.ctaSubtext')}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.8 }}
        className="py-12"
      >
        <div className="max-w-4xl px-6 sm:px-12 lg:px-16 xl:px-20">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-zinc-800/60 flex items-center justify-center">
                <svg className="w-5 h-5 text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <div className="text-xl text-zinc-100 font-medium mb-0.5">{t('reportFlowEngine.hero.stats.hoursSaved')}</div>
                <div className="text-zinc-400 text-xs">{t('reportFlowEngine.hero.stats.hoursSavedDesc')}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-zinc-800/60 flex items-center justify-center">
                <svg className="w-5 h-5 text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div>
                <div className="text-xl text-zinc-100 font-medium mb-0.5">{t('reportFlowEngine.hero.stats.netProfit')}</div>
                <div className="text-zinc-400 text-xs">{t('reportFlowEngine.hero.stats.netProfitDesc')}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-zinc-800/60 flex items-center justify-center">
                <svg className="w-5 h-5 text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <div className="text-xl text-zinc-100 font-medium mb-0.5">{t('reportFlowEngine.hero.stats.guarantee')}</div>
                <div className="text-zinc-400 text-xs">{t('reportFlowEngine.hero.stats.guaranteeDesc')}</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default function AIAppointmentEngineHero() {
  return (
    <Suspense fallback={
      <section className="relative min-h-screen flex flex-col bg-zinc-950 overflow-hidden">
        <div className="flex-1 flex items-center relative z-10">
          <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-20 py-20 sm:py-28 lg:py-32 max-w-4xl">
            <div className="animate-pulse">
              <div className="h-4 bg-white/10 rounded w-32 mb-6"></div>
              <div className="h-12 bg-white/10 rounded w-3/4 mb-4"></div>
              <div className="h-6 bg-white/10 rounded w-full mb-8"></div>
            </div>
          </div>
        </div>
      </section>
    }>
      <HeroContent />
    </Suspense>
  );
}
