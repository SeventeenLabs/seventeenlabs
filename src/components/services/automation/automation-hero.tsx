'use client';

import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, Zap, Target } from 'lucide-react';

interface AutomationHeroProps {
  locale: string;
}

export function AutomationHero({ locale }: AutomationHeroProps) {
  const content = {
    en: {
      badge: 'Automation Consulting',
      title: 'Transform Your Business with Expert Automation Strategy',
      description: 'From process analysis to implementation and training - we help you unlock the full potential of automation.',
      cta: 'Schedule Consultation',
      stats: [
        { icon: BarChart3, value: '40%', label: 'Average efficiency gain' },
        { icon: Zap, value: '60%', label: 'Faster processes' },
        { icon: Target, value: '95%', label: 'Client satisfaction' },
      ],
    },
    de: {
      badge: 'Automatisierungs-Beratung',
      title: 'Transformieren Sie Ihr Unternehmen mit Experten-Automatisierung',
      description: 'Von der Prozessanalyse bis zur Implementierung und Schulung - wir helfen Ihnen, das volle Potenzial der Automatisierung zu nutzen.',
      cta: 'Beratung vereinbaren',
      stats: [
        { icon: BarChart3, value: '40%', label: 'Durchschn. Effizienzgewinn' },
        { icon: Zap, value: '60%', label: 'Schnellere Prozesse' },
        { icon: Target, value: '95%', label: 'Kundenzufriedenheit' },
      ],
    },
  };

  const t = content[locale as keyof typeof content] || content.en;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-background to-background/50 pt-32 pb-20">
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      
      <div className="container relative z-10 mx-auto px-4 sm:px-5 lg:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6 inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
              <span className="text-sm font-medium text-primary">{t.badge}</span>
            </div>
            
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              {t.title}
            </h1>
            
            <p className="mb-8 text-lg text-muted-foreground sm:text-xl">
              {t.description}
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg hover:bg-primary/90"
            >
              {t.cta}
              <ArrowRight className="h-4 w-4" />
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3"
          >
            {t.stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="mb-3 rounded-full bg-primary/10 p-3">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
