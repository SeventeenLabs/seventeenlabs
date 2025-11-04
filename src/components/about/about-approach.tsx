'use client';

import { motion } from 'framer-motion';
import { Users, Handshake, Gauge, Shield } from 'lucide-react';

interface AboutApproachProps {
  locale: string;
}

export function AboutApproach({ locale }: AboutApproachProps) {
  const content = {
    en: {
      eyebrow: 'How We Work',
      title: 'Partnership Over Consulting',
      description: 'We don\'t just deliver reports and walk away. We roll up our sleeves and work alongside your team from discovery to deployment and beyond.',
      principles: [
        {
          icon: Handshake,
          title: 'Hands-On Collaboration',
          description: 'We integrate with your team, working directly on implementation rather than just providing recommendations.',
        },
        {
          icon: Gauge,
          title: 'Results-Focused Delivery',
          description: 'Every project is measured by real business outcomes—time saved, costs reduced, revenue increased.',
        },
        {
          icon: Shield,
          title: 'Full Transparency',
          description: 'Clear communication at every step. You always know what we\'re building, why, and what comes next.',
        },
        {
          icon: Users,
          title: 'Knowledge Transfer',
          description: 'We train your team throughout the process so you can maintain and expand AI solutions independently.',
        },
      ],
    },
    de: {
      eyebrow: 'Wie wir arbeiten',
      title: 'Partnerschaft statt Beratung',
      description: 'Wir liefern nicht nur Berichte und gehen. Wir krempeln die Ärmel hoch und arbeiten mit Ihrem Team von der Entdeckung bis zur Implementierung und darüber hinaus.',
      principles: [
        {
          icon: Handshake,
          title: 'Praktische Zusammenarbeit',
          description: 'Wir integrieren uns in Ihr Team und arbeiten direkt an der Implementierung, nicht nur an Empfehlungen.',
        },
        {
          icon: Gauge,
          title: 'Ergebnisorientierte Lieferung',
          description: 'Jedes Projekt wird an echten Geschäftsergebnissen gemessen—gesparte Zeit, reduzierte Kosten, gesteigerter Umsatz.',
        },
        {
          icon: Shield,
          title: 'Volle Transparenz',
          description: 'Klare Kommunikation bei jedem Schritt. Sie wissen immer, was wir bauen, warum und was als nächstes kommt.',
        },
        {
          icon: Users,
          title: 'Wissenstransfer',
          description: 'Wir schulen Ihr Team während des gesamten Prozesses, damit Sie KI-Lösungen selbstständig pflegen und erweitern können.',
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.principles.map((principle, index) => {
              const Icon = principle.icon;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <div className="h-full bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-6 transition-all duration-500 hover:border-white/20 hover:from-white/10">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-white/5 text-white/80 group-hover:bg-white/10 transition-colors flex-shrink-0">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-light text-white mb-2">
                          {principle.title}
                        </h3>
                        <p className="text-sm text-white/60 font-light leading-relaxed">
                          {principle.description}
                        </p>
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
