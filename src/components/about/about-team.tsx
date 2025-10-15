'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface AboutTeamProps {
  locale: string;
}

export function AboutTeam({ locale }: AboutTeamProps) {
  const content = {
    en: {
      eyebrow: 'Join Us',
      title: 'Be Part of Something Bigger',
      description: 'We\'re always looking for talented individuals who share our passion for automation and innovation.',
      cta: 'View Open Positions',
    },
    de: {
      eyebrow: 'Werden Sie Teil',
      title: 'Seien Sie Teil von etwas Größerem',
      description: 'Wir suchen immer talentierte Menschen, die unsere Leidenschaft für Automatisierung und Innovation teilen.',
      cta: 'Offene Stellen ansehen',
    },
  };

  const t = content[locale as keyof typeof content] || content.en;

  return (
    <section className="bg-black py-24 border-t border-white/10">
      <div className="px-6 sm:px-12 lg:px-16 xl:px-20">
        <div className="max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-light text-white/60 tracking-wider uppercase"
          >
            {t.eyebrow}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-light text-white"
          >
            {t.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-lg text-white/60 font-light leading-relaxed"
          >
            {t.description}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-8"
          >
            <a
              href="mailto:careers@seventeenlabs.io"
              className="group inline-flex items-center gap-2 text-white font-light hover:gap-3 transition-all"
            >
              {t.cta}
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
