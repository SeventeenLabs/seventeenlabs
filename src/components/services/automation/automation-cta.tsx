'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';

interface AutomationCTAProps {
  locale: string;
}

export function AutomationCTA({ locale }: AutomationCTAProps) {
  const content = {
    en: {
      title: 'Ready to Transform Your Business?',
      description: 'Schedule a free consultation to discuss your automation opportunities and get a custom roadmap.',
      primaryCTA: 'Book Free Consultation',
      secondaryCTA: 'View Case Studies',
    },
    de: {
      title: 'Bereit, Ihr Unternehmen zu transformieren?',
      description: 'Vereinbaren Sie eine kostenlose Beratung, um Ihre Automatisierungsmöglichkeiten zu besprechen.',
      primaryCTA: 'Kostenlose Beratung buchen',
      secondaryCTA: 'Fallstudien ansehen',
    },
  };

  const t = content[locale as keyof typeof content] || content.en;

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-5 lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary/80 p-12 text-center"
        >
          <div className="absolute inset-0 bg-grid-white/5" />
          
          <div className="relative z-10 mx-auto max-w-2xl">
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
              {t.title}
            </h2>
            <p className="mb-8 text-lg text-primary-foreground/90">
              {t.description}
            </p>
            
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-primary shadow-lg hover:bg-gray-50"
              >
                <Calendar className="h-4 w-4" />
                {t.primaryCTA}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/20"
              >
                {t.secondaryCTA}
                <ArrowRight className="h-4 w-4" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
