'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import ContactModal from '../contact-modal';

interface AboutCTAProps {
  locale: string;
}

export function AboutCTA({ locale }: AboutCTAProps) {
  const [contactModalOpen, setContactModalOpen] = useState(false);

  const content = {
    en: {
      title: 'Let\'s Talk About Your Workflow',
      description: 'Tell me what\'s eating your time. I\'ll show you what can be automated—and how fast we can get it running.',
      cta: 'Book a 15-min Call',
    },
    de: {
      title: 'Lass uns über deinen Workflow reden',
      description: 'Sag mir, was deine Zeit frisst. Ich zeige dir, was automatisiert werden kann—und wie schnell wir es zum Laufen bringen.',
      cta: '15-Min Call buchen',
    },
  };

  const t = content[locale as keyof typeof content] || content.en;

  return (
    <>
      <section className="bg-black py-16 sm:py-20">
        <div className="px-6 sm:px-12 lg:px-16 xl:px-20">
          <div className="max-w-2xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-light text-white"
            >
              {t.title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-4 text-base text-white/70 font-light leading-relaxed"
            >
              {t.description}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-6"
            >
              <button
                onClick={() => setContactModalOpen(true)}
                className="group inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-medium text-black hover:bg-white/90 transition-all"
              >
                {t.cta}
                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />
    </>
  );
}
