'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface AboutHeroProps {
  locale: string;
}

export function AboutHero({ locale }: AboutHeroProps) {
  const content = {
    en: {
      eyebrow: 'About Seventeen Labs',
      title: 'Building the Future of',
      titleHighlight: 'Business Automation',
      description: 'We believe every business deserves access to powerful AI and automation tools. Our mission is to make enterprise-level technology accessible and affordable for businesses of all sizes.',
    },
    de: {
      eyebrow: 'Über Seventeen Labs',
      title: 'Die Zukunft der',
      titleHighlight: 'Geschäftsautomatisierung',
      description: 'Wir glauben, dass jedes Unternehmen Zugang zu leistungsstarken KI- und Automatisierungstools verdient. Unsere Mission ist es, Enterprise-Level-Technologie für Unternehmen jeder Größe zugänglich und erschwinglich zu machen.',
    },
  };

  const t = content[locale as keyof typeof content] || content.en;

  return (
    <section className="relative min-h-screen flex items-start overflow-hidden bg-black">
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
        <div className="absolute inset-0 bg-black/50" />
      </div>
      
      <div className="relative z-10 w-full px-6 sm:px-12 lg:px-16 xl:px-20 pt-32 sm:pt-40 pb-24">
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
    </section>
  );
}
