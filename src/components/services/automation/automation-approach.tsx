'use client';

import { motion } from 'framer-motion';
import { Search, Lightbulb, Rocket, Users } from 'lucide-react';

interface AutomationApproachProps {
  locale: string;
}

export function AutomationApproach({ locale }: AutomationApproachProps) {
  const content = {
    en: {
      badge: 'Our Approach',
      title: 'Strategic Automation Consulting',
      description: 'A proven methodology that delivers measurable results',
      steps: [
        {
          icon: Search,
          title: 'Discovery & Analysis',
          description: 'We analyze your current processes, identify bottlenecks, and uncover automation opportunities.',
        },
        {
          icon: Lightbulb,
          title: 'Strategy Development',
          description: 'Create a tailored automation roadmap aligned with your business goals and ROI targets.',
        },
        {
          icon: Rocket,
          title: 'Implementation',
          description: 'Deploy automation solutions with minimal disruption to your operations.',
        },
        {
          icon: Users,
          title: 'Training & Support',
          description: 'Empower your team with knowledge and ongoing support for long-term success.',
        },
      ],
    },
    de: {
      badge: 'Unser Ansatz',
      title: 'Strategische Automatisierungs-Beratung',
      description: 'Eine bewährte Methodik, die messbare Ergebnisse liefert',
      steps: [
        {
          icon: Search,
          title: 'Analyse & Bewertung',
          description: 'Wir analysieren Ihre Prozesse, identifizieren Engpässe und entdecken Automatisierungsmöglichkeiten.',
        },
        {
          icon: Lightbulb,
          title: 'Strategie-Entwicklung',
          description: 'Erstellen einer maßgeschneiderten Automatisierungs-Roadmap für Ihre Geschäftsziele.',
        },
        {
          icon: Rocket,
          title: 'Implementierung',
          description: 'Einführung von Automatisierungslösungen mit minimaler Störung Ihrer Abläufe.',
        },
        {
          icon: Users,
          title: 'Schulung & Support',
          description: 'Stärken Sie Ihr Team mit Wissen und fortlaufender Unterstützung.',
        },
      ],
    },
  };

  const t = content[locale as keyof typeof content] || content.en;

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
            <span className="text-sm font-medium text-primary">{t.badge}</span>
          </div>
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">{t.title}</h2>
          <p className="text-lg text-muted-foreground">{t.description}</p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {t.steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 p-4">
                  <step.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="mb-2 flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
              
              {index < t.steps.length - 1 && (
                <div className="absolute right-0 top-12 hidden h-0.5 w-full bg-gradient-to-r from-primary/50 to-transparent lg:block" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
