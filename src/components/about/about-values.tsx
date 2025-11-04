'use client';

import { motion } from 'framer-motion';
import { Heart, Users, Zap, Shield } from 'lucide-react';

interface AboutValuesProps {
  locale: string;
}

export function AboutValues({ locale }: AboutValuesProps) {
  const content = {
    en: {
      eyebrow: 'Our Values',
      title: 'What Drives Us',
      values: [
        {
          icon: Heart,
          title: 'Client-Centric',
          description: 'Every solution is tailored to your specific business needs and goals.',
        },
        {
          icon: Users,
          title: 'Hands-On Partnership',
          description: 'We work alongside you, not just for you—from strategy to implementation.',
        },
        {
          icon: Zap,
          title: 'Results-Driven',
          description: 'Focus on measurable outcomes and ROI at every stage of the journey.',
        },
        {
          icon: Shield,
          title: 'Transparency',
          description: 'Clear pricing, honest timelines, and realistic expectations from day one.',
        },
      ],
    },
    de: {
      eyebrow: 'Unsere Werte',
      title: 'Was uns antreibt',
      values: [
        {
          icon: Heart,
          title: 'Kundenzentriert',
          description: 'Jede Lösung ist auf Ihre spezifischen Geschäftsanforderungen und -ziele zugeschnitten.',
        },
        {
          icon: Users,
          title: 'Praktische Partnerschaft',
          description: 'Wir arbeiten mit Ihnen zusammen, nicht nur für Sie—von der Strategie bis zur Umsetzung.',
        },
        {
          icon: Zap,
          title: 'Ergebnisorientiert',
          description: 'Fokus auf messbare Ergebnisse und ROI in jeder Phase der Reise.',
        },
        {
          icon: Shield,
          title: 'Transparenz',
          description: 'Klare Preise, ehrliche Zeitpläne und realistische Erwartungen von Anfang an.',
        },
      ],
    },
  };

  const t = content[locale as keyof typeof content] || content.en;

  return (
    <section className="bg-black py-16 sm:py-20">
      <div className="px-6 sm:px-12 lg:px-16 xl:px-20">
        <div className="max-w-2xl mb-12">
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
            className="mt-3 text-3xl sm:text-4xl font-light text-white"
          >
            {t.title}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="space-y-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 border border-white/10">
                <value.icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-base font-light text-white">{value.title}</h3>
              <p className="text-sm text-white/60 font-light leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
