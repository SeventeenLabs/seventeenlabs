'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Target, Lightbulb, Rocket } from 'lucide-react';

interface AboutHeroProps {
  locale: string;
}

export function AboutHero({ locale }: AboutHeroProps) {
  const content = {
    en: {
      eyebrow: 'About Seventeen Labs',
      title: 'AI Transformation',
      titleHighlight: 'From Strategy to Scale',
      description: 'We help businesses unlock their AI potential through comprehensive audits, strategic consulting, and custom development solutions. From identifying opportunities to building and scaling AI solutions.',
      mission: {
        icon: Target,
        title: 'Mission',
        description: 'Transform how businesses leverage AI—from initial discovery to full-scale implementation. We turn AI potential into measurable business results.',
      },
      vision: {
        icon: Lightbulb,
        title: 'Vision',
        description: 'A future where AI adoption is straightforward, accessible, and delivers clear ROI for every business, regardless of size or industry.',
      },
      approach: {
        icon: Rocket,
        title: 'Approach',
        description: 'Strategic thinking meets hands-on execution. We don\'t just advise—we build, implement, and optimize alongside you.',
      },
    },
    de: {
      eyebrow: 'Über Seventeen Labs',
      title: 'KI-Transformation',
      titleHighlight: 'Von der Strategie zur Skalierung',
      description: 'Wir helfen Unternehmen, ihr KI-Potenzial durch umfassende Audits, strategische Beratung und maßgeschneiderte Entwicklungslösungen zu erschließen. Von der Identifizierung von Möglichkeiten bis zum Aufbau und zur Skalierung von KI-Lösungen.',
      mission: {
        icon: Target,
        title: 'Mission',
        description: 'Die Art und Weise transformieren, wie Unternehmen KI nutzen—von der ersten Entdeckung bis zur vollständigen Implementierung. Wir verwandeln KI-Potenzial in messbare Geschäftsergebnisse.',
      },
      vision: {
        icon: Lightbulb,
        title: 'Vision',
        description: 'Eine Zukunft, in der KI-Adoption unkompliziert, zugänglich ist und klaren ROI für jedes Unternehmen liefert, unabhängig von Größe oder Branche.',
      },
      approach: {
        icon: Rocket,
        title: 'Ansatz',
        description: 'Strategisches Denken trifft auf praktische Umsetzung. Wir beraten nicht nur—wir entwickeln, implementieren und optimieren gemeinsam mit Ihnen.',
      },
    },
  };

  const t = content[locale as keyof typeof content] || content.en;

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-black">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/Mountain Path Solitude.png"
          alt="Mountain Path Solitude"
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/70" />
      </div>
      
      {/* Hero Content */}
      <div className="relative z-10 w-full px-6 sm:px-12 lg:px-16 xl:px-20 pt-32 sm:pt-40 pb-16 flex-1 flex items-start">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="space-y-6"
          >
            {/* Eyebrow text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            >
              <span className="text-sm font-light text-white/60 tracking-wider uppercase">
                {t.eyebrow}
              </span>
            </motion.div>

            {/* Main headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-light text-white leading-[1.1] tracking-tight"
            >
              {t.title}{" "}
              <span className="block mt-2">{t.titleHighlight}</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
              className="text-lg text-white/70 font-light max-w-2xl leading-relaxed"
            >
              {t.description}
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Mission, Vision, Approach - Bottom Section */}
      <div className="relative z-10 w-full px-6 sm:px-12 lg:px-16 xl:px-20 pb-12 sm:pb-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
          {[t.mission, t.vision, t.approach].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              className="space-y-3"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 border border-white/20 backdrop-blur-sm">
                  <item.icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-medium text-white">{item.title}</h3>
              </div>
              <p className="text-white/70 font-light leading-relaxed text-sm">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
