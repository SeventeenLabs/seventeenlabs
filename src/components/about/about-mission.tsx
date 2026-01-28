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
        description: 'Help B2B teams reclaim hours every week by building automation that actually works—no fluff, no months of consulting.',
      },
      vision: {
        icon: Lightbulb,
        title: 'Vision',
        description: 'Every repetitive task that drains your team should run itself. I\'m here to make that happen.',
      },
      approach: {
        icon: Rocket,
        title: 'Approach',
        description: 'One person, direct access, fast iteration. You get working automation in weeks, with 30 days of support included.',
      },
    },
    de: {
      mission: {
        icon: Target,
        title: 'Mission',
        description: 'B2B-Teams helfen, jede Woche Stunden zurückzugewinnen—durch Automatisierung, die wirklich funktioniert. Kein Blähstoff, keine monatelange Beratung.',
      },
      vision: {
        icon: Lightbulb,
        title: 'Vision',
        description: 'Jede repetitive Aufgabe, die dein Team auslaugt, sollte von selbst laufen. Ich bin hier, um das möglich zu machen.',
      },
      approach: {
        icon: Rocket,
        title: 'Ansatz',
        description: 'Eine Person, direkter Zugang, schnelle Iteration. Du bekommst funktionierende Automatisierung in Wochen, mit 30 Tagen Support inklusive.',
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
