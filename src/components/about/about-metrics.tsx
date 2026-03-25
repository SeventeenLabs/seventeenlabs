'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Clock, Target, Zap } from 'lucide-react';

interface AboutMetricsProps {
  locale: string;
}

export function AboutMetrics({ locale }: AboutMetricsProps) {
  const content = {
    en: {
      eyebrow: 'Impact',
      title: 'Proven Results Across Industries',
      description: 'Real outcomes from real clients—measurable improvements in efficiency, time savings, and business growth.',
      metrics: [
        {
          icon: TrendingUp,
          value: '€50k+',
          label: 'Average Annual ROI',
          description: 'Per client from AI implementations',
        },
        {
          icon: Clock,
          value: '40%',
          label: 'Time Saved',
          description: 'On average across automated workflows',
        },
        {
          icon: Target,
          value: '12+',
          label: 'Opportunities Found',
          description: 'Per AI audit on average',
        },
        {
          icon: Zap,
          value: '3-6',
          label: 'Months to Deploy',
          description: 'From strategy to full AI adoption',
        },
      ],
    },
    de: {
      eyebrow: 'Wirkung',
      title: 'Bewährte Ergebnisse branchenübergreifend',
      description: 'Echte Ergebnisse von echten Kunden—messbare Verbesserungen bei Effizienz, Zeitersparnis und Geschäftswachstum.',
      metrics: [
        {
          icon: TrendingUp,
          value: '€50k+',
          label: 'Durchschnittlicher ROI',
          description: 'Pro Kunde durch KI-Implementierungen',
        },
        {
          icon: Clock,
          value: '40%',
          label: 'Zeit gespart',
          description: 'Im Durchschnitt bei automatisierten Workflows',
        },
        {
          icon: Target,
          value: '12+',
          label: 'Gefundene Chancen',
          description: 'Pro KI-Audit im Durchschnitt',
        },
        {
          icon: Zap,
          value: '3-6',
          label: 'Monate bis Deployment',
          description: 'Von der Strategie bis zur vollständigen KI-Einführung',
        },
      ],
    },
  };

  const t = content[locale as keyof typeof content] || content.en;

  return (
    <section className="bg-black py-16 sm:py-20">
      <div className="px-4 sm:px-8 lg:px-12 xl:px-16">
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
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-base text-white/60 font-light leading-relaxed"
            >
              {t.description}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.metrics.map((metric, index) => {
              const Icon = metric.icon;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative"
                >
                  <div className="h-full bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-6 transition-all duration-500 hover:border-white/20 hover:from-white/10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-xl bg-white/5 text-white/80 group-hover:bg-white/10 transition-colors">
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-4xl font-light text-white">
                        {metric.value}
                      </div>
                      <div className="text-sm font-medium text-white/80">
                        {metric.label}
                      </div>
                      <div className="text-xs text-white/50 font-light">
                        {metric.description}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
      </div>
    </section>
  );
}
