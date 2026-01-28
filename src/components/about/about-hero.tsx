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
      eyebrow: 'About SeventeenLabs',
      title: 'One Person.',
      titleHighlight: 'Real Automation.',
      description: 'I\'m Christian Lutz. I help B2B teams—agencies, consultants, and SaaS companies—stop wasting hours on work that machines should do. No fancy agency. Just fast, working automation.',
      mission: {
        icon: Target,
        title: 'Mission',
        description: 'Build automation systems that actually work and save real time—in weeks, not months.',
      },
      vision: {
        icon: Lightbulb,
        title: 'Vision',
        description: 'A world where B2B teams focus on high-value work while repetitive tasks run themselves.',
      },
      approach: {
        icon: Rocket,
        title: 'Approach',
        description: 'No overhead. Direct communication. I build, you review, we iterate fast.',
      },
    },
    de: {
      eyebrow: 'Über SeventeenLabs',
      title: 'Eine Person.',
      titleHighlight: 'Echte Automatisierung.',
      description: 'Ich bin Christian Lutz. Ich helfe B2B-Teams—Agenturen, Beratern und SaaS-Unternehmen—aufzuhören, Stunden mit Arbeit zu verschwenden, die Maschinen erledigen sollten. Keine große Agentur. Nur schnelle, funktionierende Automatisierung.',
      mission: {
        icon: Target,
        title: 'Mission',
        description: 'Automatisierungssysteme bauen, die wirklich funktionieren und echte Zeit sparen—in Wochen, nicht Monaten.',
      },
      vision: {
        icon: Lightbulb,
        title: 'Vision',
        description: 'Eine Welt, in der B2B-Teams sich auf wertvolle Arbeit konzentrieren, während repetitive Aufgaben von selbst laufen.',
      },
      approach: {
        icon: Rocket,
        title: 'Ansatz',
        description: 'Kein Overhead. Direkte Kommunikation. Ich baue, du prüfst, wir iterieren schnell.',
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
