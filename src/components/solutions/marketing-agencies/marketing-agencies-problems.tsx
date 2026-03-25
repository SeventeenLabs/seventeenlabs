"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Database, DollarSign, Users, Gauge, Clock } from "lucide-react";

interface MarketingAgenciesProblemsProps {
  locale: string;
}

export default function MarketingAgenciesProblems({ locale }: MarketingAgenciesProblemsProps) {
  const isGerman = locale === 'de';

  const content = {
    en: {
      eyebrow: "The Reality",
      title: "3 critical problems holding your agency back",
      subtitle: "These pain points slow you down, burn out your team, and limit growth.",
      topProblems: [
        {
          icon: AlertTriangle,
          title: "Fragmented tools & data silos",
          description: "Different departments use different systems—CRM, design, content, ads, analytics. Data is scattered, requiring constant tool-switching and manual data copying.",
          impact: "Hours wasted daily on manual work"
        },
        {
          icon: Clock,
          title: "Manual reporting & time drain",
          description: "Pulling reports from multiple platforms, formatting, and delivering to clients takes days every month instead of minutes.",
          impact: "20+ hours per month per client"
        },
        {
          icon: Database,
          title: "Data overload but poor insights",
          description: "Mountains of data from ads, analytics, social, and CRM—but it's hard to combine and interpret. Decisions are made on incomplete views.",
          impact: "Missed opportunities & reactive decisions"
        }
      ],
      otherIssues: {
        title: "Other common challenges",
        issues: [
          { icon: AlertTriangle, text: "Inefficient task management & bottlenecks" },
          { icon: AlertTriangle, text: "Poor standardization of processes" },
          { icon: AlertTriangle, text: "Delays in approvals & feedback loops" },
          { icon: DollarSign, text: "Under-pricing & outdated pricing models" },
          { icon: DollarSign, text: "Client expectations too high or unrealistic timelines" },
          { icon: DollarSign, text: "Cash flow & invoicing problems" },
          { icon: Users, text: "Difficulty hiring & retaining skilled staff" },
          { icon: Users, text: "Resistance to change & adoption issues" },
          { icon: Gauge, text: "Systems that don't scale with growth" }
        ]
      }
    },
    de: {
      eyebrow: "Die Realität",
      title: "3 kritische Probleme, die Ihre Agentur zurückhalten",
      subtitle: "Diese Schmerzpunkte verlangsamen Sie, brennen Ihr Team aus und begrenzen das Wachstum.",
      topProblems: [
        {
          icon: AlertTriangle,
          title: "Fragmentierte Tools & Datensilos",
          description: "Verschiedene Abteilungen nutzen verschiedene Systeme—CRM, Design, Content, Ads, Analytics. Daten sind verstreut, erfordern ständigen Tool-Wechsel und manuelle Datenkopien.",
          impact: "Täglich verschwendete Stunden durch manuelle Arbeit"
        },
        {
          icon: Clock,
          title: "Manuelles Reporting & Zeitfresser",
          description: "Das Ziehen von Berichten aus mehreren Plattformen, Formatierung und Lieferung an Kunden dauert Tage pro Monat statt Minuten.",
          impact: "20+ Stunden pro Monat pro Kunde"
        },
        {
          icon: Database,
          title: "Datenflut aber schlechte Insights",
          description: "Berge von Daten aus Ads, Analytics, Social und CRM—aber schwer zu kombinieren und interpretieren. Entscheidungen werden auf unvollständiger Basis getroffen.",
          impact: "Verpasste Chancen & reaktive Entscheidungen"
        }
      ],
      otherIssues: {
        title: "Weitere häufige Herausforderungen",
        issues: [
          { icon: AlertTriangle, text: "Ineffizientes Aufgabenmanagement & Engpässe" },
          { icon: AlertTriangle, text: "Schlechte Standardisierung von Prozessen" },
          { icon: AlertTriangle, text: "Verzögerungen bei Freigaben & Feedback-Schleifen" },
          { icon: DollarSign, text: "Unterpreisgestaltung & veraltete Preismodelle" },
          { icon: DollarSign, text: "Zu hohe Kundenerwartungen oder unrealistische Zeitpläne" },
          { icon: DollarSign, text: "Cashflow & Rechnungsprobleme" },
          { icon: Users, text: "Schwierigkeiten bei Einstellung & Bindung von Mitarbeitern" },
          { icon: Users, text: "Widerstand gegen Veränderung & Adoption" },
          { icon: Gauge, text: "Systeme, die nicht mit dem Wachstum skalieren" }
        ]
      }
    }
  };

  const t = isGerman ? content.de : content.en;

  return (
    <section className="relative py-24 sm:py-32 bg-zinc-950">
      <div className="relative z-10 w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* Header */}
        <div className="max-w-3xl mb-16">
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

        {/* Top 3 Problems - Large Cards */}
        <div className="grid gap-6 lg:grid-cols-3 mb-20">
          {t.topProblems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-8 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 hover:border-white/30 transition-all hover:shadow-lg hover:shadow-white/5"
            >
              {/* Icon */}
              <div className="p-3 rounded-xl bg-white/10 border border-white/20 w-fit mb-6">
                <problem.icon className="h-6 w-6 text-white" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-medium text-white mb-3 leading-tight">
                {problem.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-white/70 font-light leading-relaxed mb-4">
                {problem.description}
              </p>

              {/* Impact */}
              <div className="pt-4 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-red-400" />
                  <span className="text-xs text-red-300 font-medium">
                    {problem.impact}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other Issues - Compact Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full"
        >
          {/* Section Header */}
          <div className="mb-12">
            <h3 className="text-2xl sm:text-3xl font-light text-white/90">
              {t.otherIssues.title}
            </h3>
          </div>
          
          {/* Issues Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {t.otherIssues.issues.map((issue, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group p-4 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-all"
              >
                <div className="flex items-start gap-3">
                  {/* Icon */}
                  <issue.icon className="h-4 w-4 text-white/40 group-hover:text-white/60 transition-colors flex-shrink-0 mt-0.5" />
                  
                  {/* Text */}
                  <span className="text-sm text-white/70 group-hover:text-white/90 font-light leading-relaxed transition-colors">
                    {issue.text}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
