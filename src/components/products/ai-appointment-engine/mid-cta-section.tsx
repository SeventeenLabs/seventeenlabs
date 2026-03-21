"use client";

import { motion } from "framer-motion";
import { useTranslations } from '@/lib/i18n/context';
import { Calendar, ArrowRight } from "lucide-react";

export default function MidCtaSection() {
  const { t } = useTranslations();

  return (
    <section className="relative py-16 sm:py-20 lg:py-24 bg-black border-t border-white/5">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />
      
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight mb-6 leading-tight">
            <span dangerouslySetInnerHTML={{ __html: t('aiAppointmentEngine.midCta.title') }} />
          </h2>
          
          <p className="text-lg sm:text-xl text-white/70 font-light leading-relaxed mb-10">
            {t('aiAppointmentEngine.midCta.description')}
          </p>

          <div className="flex flex-col sm:flex-row items-start gap-4">
            <a 
              href="https://calendly.com/chris-seventeenlabs/30min" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 text-base font-medium text-black bg-blue-500 rounded-lg hover:bg-blue-400 transition-all duration-300"
            >
              <Calendar className="w-5 h-5" />
              {t('aiAppointmentEngine.midCta.primaryButton')}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            
            <a 
              href="#faq" 
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-light text-white/80 hover:text-white border border-white/20 rounded-lg hover:border-white/40 transition-all duration-300"
            >
              {t('aiAppointmentEngine.midCta.secondaryButton')}
            </a>
          </div>

          <p className="text-sm text-white/50 font-light mt-6">
            {t('aiAppointmentEngine.midCta.subtext')}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
