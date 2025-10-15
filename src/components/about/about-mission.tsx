'use client';

import { motion } from 'framer-motion';
import { Target, Lightbulb, Rocket } from 'lucide-react';

interface AboutMissionProps {
  locale: string;
}

export function AboutMission({ locale }: AboutMissionProps) {
  const content = {
    en: {
      mission: {
        icon: Target,
        title: 'Mission',
        description: 'Empower businesses to scale efficiently through intelligent automation and AI-powered solutions.',
      },
      vision: {
        icon: Lightbulb,
        title: 'Vision',
        description: 'A world where every business, regardless of size, can leverage enterprise-level automation to compete and thrive.',
      },
      approach: {
        icon: Rocket,
        title: 'Approach',
        description: 'Combine ready-to-use products with expert services to deliver maximum value with minimal complexity.',
      },
    },
    de: {
      mission: {
        icon: Target,
        title: 'Mission',
        description: 'Unternehmen durch intelligente Automatisierung und KI-gestützte Lösungen effizient skalieren.',
      },
      vision: {
        icon: Lightbulb,
        title: 'Vision',
        description: 'Eine Welt, in der jedes Unternehmen, unabhängig von der Größe, Enterprise-Level-Automatisierung nutzen kann.',
      },
      approach: {
        icon: Rocket,
        title: 'Ansatz',
        description: 'Kombination von gebrauchsfertigen Produkten mit Expertendienstleistungen für maximalen Mehrwert.',
      },
    },
  };

  const t = content[locale as keyof typeof content] || content.en;

  return (
    <section className="bg-black py-24 border-t border-white/10">
      <div className="px-6 sm:px-12 lg:px-16 xl:px-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8">
          {[t.mission, t.vision, t.approach].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 border border-white/10">
                  <item.icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-light text-white">{item.title}</h3>
              </div>
              <p className="text-white/60 font-light leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
