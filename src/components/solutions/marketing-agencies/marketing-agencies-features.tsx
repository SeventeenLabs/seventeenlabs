"use client";

import { motion } from "framer-motion";
import { Users, Zap, TrendingUp, Clock, Target, Shield, BarChart3, MessageSquare } from "lucide-react";

interface MarketingAgenciesFeaturesProps {
  locale: string;
}

export default function MarketingAgenciesFeatures({ locale }: MarketingAgenciesFeaturesProps) {
  const isGerman = locale === 'de';

  const content = {
    en: {
      eyebrow: "Core Capabilities",
      title: "Built for marketing teams who want to scale without burnout",
      subtitle: "Every feature designed to save you time and deliver better results for your clients.",
      features: [
        {
          icon: Users,
          title: "Lead Management",
          description: "Automatically capture leads from forms, social media, and ads. Qualify and route them to the right team member instantly."
        },
        {
          icon: Zap,
          title: "Social Media Automation",
          description: "Schedule posts across all platforms, track engagement, and respond to comments without switching tools."
        },
        {
          icon: BarChart3,
          title: "Client Reporting",
          description: "Generate beautiful, branded reports with real-time data from all your marketing channels in one click."
        },
        {
          icon: Clock,
          title: "Time Tracking",
          description: "Track project hours automatically, improve billing accuracy, and understand where your team's time goes."
        },
        {
          icon: Target,
          title: "Campaign Management",
          description: "Plan, execute, and monitor campaigns from a single dashboard. Never miss a deadline or deliverable again."
        },
        {
          icon: MessageSquare,
          title: "Client Communication",
          description: "Automate status updates, approval requests, and client onboarding. Keep everyone in the loop effortlessly."
        },
        {
          icon: Shield,
          title: "Brand Compliance",
          description: "Ensure all content meets brand guidelines with automated checks before publishing or sending to clients."
        },
        {
          icon: TrendingUp,
          title: "Performance Analytics",
          description: "Track KPIs across all clients and campaigns. Identify what works and optimize your strategy with data."
        }
      ]
    },
    de: {
      eyebrow: "Kernfunktionen",
      title: "Entwickelt für Marketing-Teams, die ohne Burnout skalieren möchten",
      subtitle: "Jede Funktion wurde entwickelt, um Zeit zu sparen und bessere Ergebnisse für Ihre Kunden zu liefern.",
      features: [
        {
          icon: Users,
          title: "Lead-Management",
          description: "Erfassen Sie automatisch Leads aus Formularen, Social Media und Anzeigen. Qualifizieren und leiten Sie sie sofort an das richtige Teammitglied weiter."
        },
        {
          icon: Zap,
          title: "Social Media Automatisierung",
          description: "Planen Sie Beiträge über alle Plattformen, verfolgen Sie Engagement und reagieren Sie auf Kommentare, ohne Tools zu wechseln."
        },
        {
          icon: BarChart3,
          title: "Kunden-Reporting",
          description: "Erstellen Sie schöne, gebrandete Berichte mit Echtzeitdaten aus all Ihren Marketing-Kanälen mit einem Klick."
        },
        {
          icon: Clock,
          title: "Zeiterfassung",
          description: "Erfassen Sie Projektstunden automatisch, verbessern Sie die Abrechnungsgenauigkeit und verstehen Sie, wohin die Zeit Ihres Teams geht."
        },
        {
          icon: Target,
          title: "Kampagnen-Management",
          description: "Planen, führen Sie Kampagnen von einem einzigen Dashboard aus durch und überwachen Sie sie. Verpassen Sie nie wieder eine Deadline."
        },
        {
          icon: MessageSquare,
          title: "Kundenkommunikation",
          description: "Automatisieren Sie Statusupdates, Freigabeanfragen und Kunden-Onboarding. Halten Sie alle mühelos auf dem Laufenden."
        },
        {
          icon: Shield,
          title: "Marken-Compliance",
          description: "Stellen Sie sicher, dass alle Inhalte den Markenrichtlinien entsprechen, mit automatisierten Prüfungen vor der Veröffentlichung."
        },
        {
          icon: TrendingUp,
          title: "Performance-Analytics",
          description: "Verfolgen Sie KPIs über alle Kunden und Kampagnen. Identifizieren Sie, was funktioniert, und optimieren Sie Ihre Strategie mit Daten."
        }
      ]
    }
  };

  const t = isGerman ? content.de : content.en;

  return (
    <section className="relative py-24 sm:py-32 bg-black">
      {/* Top divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      
      <div className="relative z-10 w-full px-6 sm:px-12 lg:px-16 xl:px-20">
        {/* Header */}
        <div className="mb-16">
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
            className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight"
          >
            {t.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-lg text-white/70 font-light leading-relaxed"
          >
            {t.subtitle}
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-12">
          {t.features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0">
                  <div className="inline-flex p-3 rounded-lg bg-white/5 border border-white/10">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-light text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-white/60 font-light leading-relaxed text-sm">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
