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
        description: 'Guide businesses through their complete AI journey—from discovering opportunities to implementing and scaling intelligent solutions.',
      },
      vision: {
        icon: Lightbulb,
        title: 'Vision',
        description: 'Make AI transformation accessible to every business through a clear, proven process: Audit, Strategy, Build, Scale.',
      },
      approach: {
        icon: Rocket,
        title: 'Approach',
        description: 'Combine deep industry expertise with hands-on execution to deliver measurable results at every stage of your AI journey.',
      },
    },
    de: {
      mission: {
        icon: Target,
        title: 'Mission',
        description: 'Unternehmen durch ihre komplette KI-Reise begleiten—von der Entdeckung von Möglichkeiten bis zur Implementierung und Skalierung intelligenter Lösungen.',
      },
      vision: {
        icon: Lightbulb,
        title: 'Vision',
        description: 'KI-Transformation für jedes Unternehmen zugänglich machen durch einen klaren, bewährten Prozess: Audit, Strategie, Entwicklung, Skalierung.',
      },
      approach: {
        icon: Rocket,
        title: 'Ansatz',
        description: 'Tiefe Branchenexpertise mit praktischer Umsetzung kombinieren, um messbare Ergebnisse in jeder Phase Ihrer KI-Reise zu liefern.',
      },
    },
  };

  const t = content[locale as keyof typeof content] || content.en;

  return (
    <section className="bg-black py-16 sm:py-20 border-t border-white/10">
      <div className="px-6 sm:px-12 lg:px-16 xl:px-20">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
          {[t.mission, t.vision, t.approach].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="space-y-3"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 border border-white/10">
                  <item.icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-light text-white">{item.title}</h3>
              </div>
              <p className="text-white/60 font-light leading-relaxed text-sm">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
