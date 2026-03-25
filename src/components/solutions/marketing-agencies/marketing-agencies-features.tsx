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
      eyebrow: "Everything You Need",
      title: "Complete automation toolkit for modern agencies",
      subtitle: "All the tools you need to run a lean, efficient agency that delivers exceptional results.",
      features: [
        {
          icon: Users,
          title: "Lead Management Automation",
          description: "Automatically capture, qualify, and route leads from any source to the right team member—instantly.",
          benefit: "Never lose a lead again"
        },
        {
          icon: BarChart3,
          title: "Automated Client Reporting",
          description: "Generate beautiful, branded reports with real-time data from all channels in seconds, not hours.",
          benefit: "Save 20+ hours per month"
        },
        {
          icon: Zap,
          title: "Social Media Automation",
          description: "Schedule, publish, and track posts across all platforms from one place. Respond faster, engage better.",
          benefit: "Manage 10x more accounts"
        },
        {
          icon: Target,
          title: "Campaign Orchestration",
          description: "Plan, execute, and monitor all campaigns from a unified dashboard. Never miss a deadline or deliverable.",
          benefit: "Launch campaigns 3x faster"
        },
        {
          icon: Clock,
          title: "Smart Time Tracking",
          description: "Automatically track billable hours by client and project. Improve accuracy and profitability.",
          benefit: "Increase billable hours by 30%"
        },
        {
          icon: MessageSquare,
          title: "Client Communication Hub",
          description: "Automate status updates, approval workflows, and onboarding. Keep clients informed without the effort.",
          benefit: "Reduce admin time by 50%"
        },
        {
          icon: Shield,
          title: "Brand Compliance Checks",
          description: "Automatically verify content meets brand guidelines before publishing or sending to clients.",
          benefit: "Eliminate costly mistakes"
        },
        {
          icon: TrendingUp,
          title: "Performance Analytics",
          description: "Track KPIs across all clients and campaigns. Identify what works and optimize with real data.",
          benefit: "Make better decisions faster"
        }
      ]
    },
    de: {
      eyebrow: "Alles, was Sie brauchen",
      title: "Komplettes Automatisierungs-Toolkit für moderne Agenturen",
      subtitle: "Alle Tools, die Sie benötigen, um eine schlanke, effiziente Agentur zu führen, die außergewöhnliche Ergebnisse liefert.",
      features: [
        {
          icon: Users,
          title: "Lead-Management-Automatisierung",
          description: "Erfassen, qualifizieren und leiten Sie Leads automatisch von jeder Quelle an das richtige Teammitglied weiter—sofort.",
          benefit: "Verlieren Sie nie wieder einen Lead"
        },
        {
          icon: BarChart3,
          title: "Automatisiertes Kunden-Reporting",
          description: "Erstellen Sie schöne, gebrandete Berichte mit Echtzeitdaten aus allen Kanälen in Sekunden, nicht Stunden.",
          benefit: "Sparen Sie 20+ Stunden pro Monat"
        },
        {
          icon: Zap,
          title: "Social Media Automatisierung",
          description: "Planen, veröffentlichen und verfolgen Sie Beiträge über alle Plattformen von einem Ort aus. Reagieren Sie schneller, engagieren Sie besser.",
          benefit: "Verwalten Sie 10x mehr Accounts"
        },
        {
          icon: Target,
          title: "Kampagnen-Orchestrierung",
          description: "Planen, führen Sie alle Kampagnen von einem einheitlichen Dashboard aus durch und überwachen Sie sie. Verpassen Sie nie eine Deadline.",
          benefit: "Starten Sie Kampagnen 3x schneller"
        },
        {
          icon: Clock,
          title: "Intelligente Zeiterfassung",
          description: "Erfassen Sie automatisch abrechenbare Stunden nach Kunde und Projekt. Verbessern Sie Genauigkeit und Profitabilität.",
          benefit: "Erhöhen Sie abrechenbare Stunden um 30%"
        },
        {
          icon: MessageSquare,
          title: "Kundenkommunikations-Hub",
          description: "Automatisieren Sie Statusupdates, Freigabe-Workflows und Onboarding. Halten Sie Kunden informiert ohne Aufwand.",
          benefit: "Reduzieren Sie Admin-Zeit um 50%"
        },
        {
          icon: Shield,
          title: "Marken-Compliance-Prüfungen",
          description: "Überprüfen Sie automatisch, ob Inhalte den Markenrichtlinien entsprechen, bevor Sie veröffentlichen oder an Kunden senden.",
          benefit: "Eliminieren Sie kostspielige Fehler"
        },
        {
          icon: TrendingUp,
          title: "Performance-Analytics",
          description: "Verfolgen Sie KPIs über alle Kunden und Kampagnen. Identifizieren Sie, was funktioniert, und optimieren Sie mit echten Daten.",
          benefit: "Treffen Sie bessere Entscheidungen schneller"
        }
      ]
    }
  };

  const t = isGerman ? content.de : content.en;

  return (
    <section className="relative py-24 sm:py-32 bg-black">
      <div className="relative z-10 w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* Header */}
        <div className="max-w-3xl mb-20">
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
            className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight"
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
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {t.features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 hover:border-white/30 transition-all hover:shadow-lg hover:shadow-white/5"
              >
                {/* Icon */}
                <div className="p-3 rounded-xl bg-white/10 border border-white/20 w-fit mb-6">
                  <Icon className="h-6 w-6 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-medium text-white mb-3 leading-tight">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-white/70 font-light leading-relaxed mb-4">
                  {feature.description}
                </p>

                {/* Benefit */}
                <div className="pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    <span className="text-xs text-emerald-300 font-medium">
                      {feature.benefit}
                    </span>
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
