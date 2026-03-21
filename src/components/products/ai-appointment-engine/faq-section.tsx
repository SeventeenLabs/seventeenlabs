"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslations, useLocale } from '@/lib/i18n/context';
import { getTranslations } from '@/lib/i18n/translations';

export default function FAQSection() {
  const { t } = useTranslations();
  const locale = useLocale();
  const translations = getTranslations(locale);
  const faqItems = translations.aiAppointmentEngine?.faq?.items || [];

  return (
    <section id="faq" className="relative py-16 sm:py-24 lg:py-32 bg-black">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-20">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12 sm:mb-16 lg:mb-20"
          >
            <span className="text-xs sm:text-sm font-light text-white/60 tracking-wider uppercase mb-6 sm:mb-8 block">
              {t('aiAppointmentEngine.faq.eyebrow')}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-light text-white tracking-tight leading-tight">
              <span dangerouslySetInnerHTML={{ __html: t('aiAppointmentEngine.faq.title') }} />
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Accordion type="single" collapsible className="space-y-4 sm:space-y-5">
              {faqItems.map((faq: any, index: number) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="border border-white/10 rounded-xl px-5 sm:px-7 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/20 transition-all duration-300"
                >
                  <AccordionTrigger className="text-base sm:text-lg lg:text-xl font-light text-white hover:text-blue-400 transition-colors py-5 sm:py-6 hover:no-underline text-left pr-8">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm sm:text-base lg:text-lg text-white/70 font-light leading-relaxed pb-5 sm:pb-6 pt-2">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
}