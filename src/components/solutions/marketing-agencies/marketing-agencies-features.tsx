"use client";

import { motion } from "framer-motion";
import { Users, Zap, TrendingUp, Clock, Brain, Shield } from "lucide-react";

interface MarketingAgenciesFeaturesProps {
  locale: string;
}

export default function MarketingAgenciesFeatures({ locale }: MarketingAgenciesFeaturesProps) {
  const isGerman = locale === 'de';

  const content = {
    en: {
      title: "Why Marketing Agencies Choose Us",
      subtitle: "Powerful features designed specifically for marketing professionals",
      features: [
        {
          icon: Users,
          title: "Lead Management",
          description: "Automatically capture, qualify, and route leads to the right team members. Never miss an opportunity."
        },
        {
          icon: Zap,
          title: "Social Media Automation",
          description: "Schedule posts, monitor engagement, and respond to comments across all platforms from one place."
        },
        {
          icon: TrendingUp,
          title: "Client Reporting",
          description: "Generate beautiful, data-driven reports automatically. Keep clients informed without the manual work."
        },
        {
          icon: Clock,
          title: "Time Tracking",
          description: "Track time spent on projects automatically. Improve billing accuracy and profitability analysis."
        },
        {
          icon: Brain,
          title: "AI Content Assistant",
          description: "Generate content ideas, write copy, and optimize for SEO with AI-powered tools."
        },
        {
          icon: Shield,
          title: "Brand Compliance",
          description: "Ensure all content meets brand guidelines before publication. Maintain consistency at scale."
        }
      ]
    },
    de: {
      title: "Warum Marketing-Agenturen uns wählen",
      subtitle: "Leistungsstarke Funktionen speziell für Marketing-Profis entwickelt",
      features: [
        {
          icon: Users,
          title: "Lead-Management",
          description: "Erfassen, qualifizieren und leiten Sie Leads automatisch an die richtigen Teammitglieder weiter. Verpassen Sie keine Gelegenheit."
        },
        {
          icon: Zap,
          title: "Social Media Automatisierung",
          description: "Planen Sie Posts, überwachen Sie Engagement und antworten Sie auf Kommentare über alle Plattformen von einem Ort aus."
        },
        {
          icon: TrendingUp,
          title: "Kunden-Reporting",
          description: "Erstellen Sie automatisch schöne, datengestützte Berichte. Halten Sie Kunden informiert ohne manuelle Arbeit."
        },
        {
          icon: Clock,
          title: "Zeiterfassung",
          description: "Verfolgen Sie automatisch die für Projekte aufgewendete Zeit. Verbessern Sie Abrechnungsgenauigkeit und Rentabilitätsanalyse."
        },
        {
          icon: Brain,
          title: "KI-Content-Assistent",
          description: "Generieren Sie Content-Ideen, schreiben Sie Texte und optimieren Sie für SEO mit KI-gestützten Tools."
        },
        {
          icon: Shield,
          title: "Marken-Compliance",
          description: "Stellen Sie sicher, dass alle Inhalte den Markenrichtlinien entsprechen vor der Veröffentlichung. Konsistenz im großen Maßstab."
        }
      ]
    }
  };

  const t = isGerman ? content.de : content.en;

  return (
    <section className="py-24 bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 xl:px-20">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-5xl font-bold text-white mb-4"
          >
            {t.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-slate-400"
          >
            {t.subtitle}
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 group"
            >
              <div className="h-12 w-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
                <feature.icon className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-slate-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
