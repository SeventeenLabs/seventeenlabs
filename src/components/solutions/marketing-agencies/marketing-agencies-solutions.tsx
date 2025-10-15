"use client";

import { motion } from "framer-motion";
import { BarChart3, Clock, Database, ArrowRight, Zap, Workflow, Shield } from "lucide-react";

interface MarketingAgenciesSolutionsProps {
  locale: string;
}

export default function MarketingAgenciesSolutions({ locale }: MarketingAgenciesSolutionsProps) {
  const isGerman = locale === 'de';

  const content = {
    en: {
      eyebrow: "The Solution",
      title: "Transform problems into competitive advantages",
      subtitle: "See exactly how automation solves your biggest challenges and gives you back time to focus on strategy.",
      mainSolutions: [
        {
          icon: BarChart3,
          problem: "Fragmented tools & data silos",
          solution: "Unified Data Integration",
          description: "Connect all your tools—CRM, ads platforms, analytics, social media—into one automated system. Data flows seamlessly from lead capture to reporting.",
          howItWorks: [
            "Automatically sync data between all platforms in real-time",
            "Create a single source of truth dashboard",
            "Eliminate manual data entry and copy-paste errors",
            "Set up once, runs 24/7 without intervention"
          ],
          result: "Save 15+ hours per week on data management"
        },
        {
          icon: Clock,
          problem: "Manual reporting & time drain",
          solution: "Automated Report Generation",
          description: "Stop spending days on reports. Automatically pull data from all platforms, format it beautifully, and deliver branded reports to clients on schedule.",
          howItWorks: [
            "Connect to Google Analytics, Meta Ads, Google Ads, and more",
            "Auto-generate branded PDFs with your client's metrics",
            "Schedule delivery—weekly, monthly, or custom",
            "Include AI-generated insights and recommendations"
          ],
          result: "Reduce reporting time from days to minutes"
        },
        {
          icon: Database,
          problem: "Data overload but poor insights",
          solution: "AI-Powered Analytics & Alerts",
          description: "Transform raw data into actionable insights. Get intelligent alerts when campaigns underperform and AI-generated recommendations for improvement.",
          howItWorks: [
            "AI analyzes performance across all campaigns automatically",
            "Get instant alerts when metrics drop or spike",
            "Receive AI-generated explanations and next steps",
            "Track all KPIs in one unified dashboard"
          ],
          result: "Make data-driven decisions 10x faster"
        }
      ],
      additionalSolutions: {
        title: "More automation solutions",
        solutions: [
          {
            icon: Workflow,
            title: "Task & workflow automation",
            description: "Auto-assign tasks, set deadlines, send reminders—integrated with your PM tools."
          },
          {
            icon: Zap,
            title: "Approval flow automation",
            description: "Speed up reviews with automated routing, escalation, and tracking."
          },
          {
            icon: Shield,
            title: "Quality control automation",
            description: "Automatically check content for brand compliance before delivery."
          }
        ]
      },
      exampleWorkflows: {
        eyebrow: "Ready-to-Use Automations",
        title: "Pre-built workflows you can start using today",
        subtitle: "These are complete automation templates designed specifically for marketing agencies. Pick one, customize it to your needs, and deploy in minutes—not weeks.",
        workflows: [
          {
            title: "Weekly Performance Report Generator",
            useCase: "Automated client reporting",
            description: "Stop spending hours compiling data. This workflow automatically pulls metrics from all your platforms and delivers branded reports to clients.",
            steps: [
              "Triggered every Monday automatically",
              "Pulls data from Google Analytics, Google Ads, Meta Ads, Instagram",
              "Cleans and transforms data (sums, averages, growth rates)",
              "Generates branded PDF or dashboard link",
              "Emails to team and client automatically"
            ],
            timeSaved: "20+ hours per month"
          },
          {
            title: "Lead Capture → Qualify → Assign",
            useCase: "Lead management automation",
            description: "Never miss a lead again. Automatically capture, score, and route leads to the right team member based on your criteria.",
            steps: [
              "Web form submission triggers workflow via webhook",
              "Enriches lead data (company info, social profiles)",
              "Applies scoring logic based on your criteria",
              "Routes to appropriate sales/account person",
              "Low-score leads enter nurture sequence"
            ],
            timeSaved: "10+ hours per week"
          },
          {
            title: "Campaign Launch Automation",
            useCase: "Campaign setup & tracking",
            description: "Launch campaigns faster and error-free. Automatically set up tracking, budgets, and notify your team when a campaign is approved.",
            steps: [
              "Campaign approval triggers workflow",
              "Sets up ad account structures and placements",
              "Configures budget schedules and flight dates",
              "Generates tracking links and UTM parameters",
              "Creates creative briefs and notifies team"
            ],
            timeSaved: "5+ hours per campaign"
          },
          {
            title: "Social Media Publishing Automation",
            useCase: "Content distribution",
            description: "Publish once, distribute everywhere. Automatically create platform-optimized posts and track performance across all channels.",
            steps: [
              "New blog post published (RSS/CMS webhook)",
              "Generates social media post variants with AI",
              "Schedules or posts to Facebook, LinkedIn, Twitter, Instagram",
              "Tracks engagement metrics automatically",
              "Sends performance summary weekly"
            ],
            timeSaved: "8+ hours per week"
          }
        ]
      }
    },
    de: {
      eyebrow: "Die Lösung",
      title: "Verwandeln Sie Probleme in Wettbewerbsvorteile",
      subtitle: "Sehen Sie genau, wie Automatisierung Ihre größten Herausforderungen löst und Ihnen Zeit für Strategie zurückgibt.",
      mainSolutions: [
        {
          icon: BarChart3,
          problem: "Fragmentierte Tools & Datensilos",
          solution: "Vereinheitlichte Datenintegration",
          description: "Verbinden Sie alle Ihre Tools—CRM, Ads-Plattformen, Analytics, Social Media—in einem automatisierten System. Daten fließen nahtlos von Lead-Erfassung bis Reporting.",
          howItWorks: [
            "Synchronisiert automatisch Daten zwischen allen Plattformen in Echtzeit",
            "Erstellt ein zentrales Dashboard als Single Source of Truth",
            "Eliminiert manuelle Dateneingabe und Copy-Paste-Fehler",
            "Einmal einrichten, läuft 24/7 ohne Eingriff"
          ],
          result: "Sparen Sie 15+ Stunden pro Woche beim Datenmanagement"
        },
        {
          icon: Clock,
          problem: "Manuelles Reporting & Zeitfresser",
          solution: "Automatisierte Report-Generierung",
          description: "Verschwenden Sie keine Tage mehr mit Reports. Ziehen Sie automatisch Daten von allen Plattformen, formatieren Sie sie schön und liefern Sie gebrandete Reports pünktlich.",
          howItWorks: [
            "Verbindung zu Google Analytics, Meta Ads, Google Ads und mehr",
            "Generiert automatisch gebrandete PDFs mit Kunden-Metriken",
            "Plant Lieferung—wöchentlich, monatlich oder individuell",
            "Enthält KI-generierte Insights und Empfehlungen"
          ],
          result: "Reduzieren Sie Reporting-Zeit von Tagen auf Minuten"
        },
        {
          icon: Database,
          problem: "Datenflut aber schlechte Insights",
          solution: "KI-gestützte Analytics & Alerts",
          description: "Verwandeln Sie Rohdaten in umsetzbare Insights. Erhalten Sie intelligente Alerts bei Underperformance und KI-generierte Verbesserungsempfehlungen.",
          howItWorks: [
            "KI analysiert Performance über alle Kampagnen automatisch",
            "Erhalten Sie sofortige Alerts bei Metrik-Abfällen oder -Spitzen",
            "Bekommen Sie KI-generierte Erklärungen und nächste Schritte",
            "Verfolgen Sie alle KPIs in einem einheitlichen Dashboard"
          ],
          result: "Treffen Sie datengestützte Entscheidungen 10x schneller"
        }
      ],
      additionalSolutions: {
        title: "Weitere Automatisierungslösungen",
        solutions: [
          {
            icon: Workflow,
            title: "Aufgaben- & Workflow-Automatisierung",
            description: "Automatische Aufgabenzuweisung, Fristen, Erinnerungen—integriert mit Ihren PM-Tools."
          },
          {
            icon: Zap,
            title: "Freigabe-Flow-Automatisierung",
            description: "Beschleunigen Sie Reviews mit automatischem Routing, Eskalation und Tracking."
          },
          {
            icon: Shield,
            title: "Qualitätskontroll-Automatisierung",
            description: "Prüft Content automatisch auf Marken-Compliance vor der Auslieferung."
          }
        ]
      }
    }
  };

  const t = isGerman ? content.de : content.en;

  return (
    <section className="relative py-24 sm:py-32 bg-black">
      <div className="relative z-10 w-full px-6 sm:px-12 lg:px-16 xl:px-20">
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

        {/* Main Solutions - Problem → Solution Cards */}
        <div className="space-y-12 mb-24">
          {t.mainSolutions.map((solution, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="group"
            >
              <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-0 items-center">
                {/* Problem Side */}
                <div className="p-8 rounded-2xl bg-red-950/20 border border-red-900/30 hover:border-red-800/50 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-lg bg-red-900/30 border border-red-800/50">
                      <solution.icon className="h-5 w-5 text-red-300" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs text-red-300/60 uppercase tracking-wider mb-2">
                        Problem
                      </div>
                      <h3 className="text-xl font-medium text-red-200 leading-tight">
                        {solution.problem}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Arrow Connector */}
                <div className="hidden lg:flex items-center justify-center px-4 py-8">
                  <ArrowRight className="h-6 w-6 text-white" />
                </div>

                {/* Mobile Arrow */}
                <div className="lg:hidden flex items-center justify-center py-4">
                  <ArrowRight className="h-6 w-6 text-white rotate-90" />
                </div>

                {/* Solution Side */}
                <div className="p-8 rounded-2xl bg-gradient-to-br from-emerald-950/30 to-emerald-900/10 border border-emerald-800/30 hover:border-emerald-700/50 transition-all">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-2.5 rounded-lg bg-emerald-900/40 border border-emerald-700/50">
                      <solution.icon className="h-5 w-5 text-emerald-300" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs text-emerald-300/60 uppercase tracking-wider mb-2">
                        Solution
                      </div>
                      <h3 className="text-xl font-medium text-emerald-200 leading-tight mb-3">
                        {solution.solution}
                      </h3>
                      <p className="text-sm text-emerald-100/70 font-light leading-relaxed">
                        {solution.description}
                      </p>
                    </div>
                  </div>

                  {/* How it works */}
                  <div className="space-y-2.5 mb-5 pl-12">
                    {solution.howItWorks.map((step, stepIndex) => (
                      <div key={stepIndex} className="flex items-start gap-2.5">
                        <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-400/70 flex-shrink-0" />
                        <span className="text-xs text-emerald-100/70 font-light leading-relaxed">
                          {step}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Result */}
                  <div className="pt-5 mt-2 border-t border-emerald-700/30 pl-12">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-sm text-emerald-300 font-medium">
                        {solution.result}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Solutions - Compact */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full"
        >
          <h3 className="text-2xl sm:text-3xl font-light text-white/90 mb-12">
            {t.additionalSolutions.title}
          </h3>
          
          <div className="grid gap-4 sm:grid-cols-3">
            {t.additionalSolutions.solutions.map((solution, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-6 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all"
              >
                <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 w-fit mb-4">
                  <solution.icon className="h-5 w-5 text-white/70 group-hover:text-white/90 transition-colors" />
                </div>
                <h4 className="text-base font-medium text-white mb-2 group-hover:text-white transition-colors">
                  {solution.title}
                </h4>
                <p className="text-sm text-white/60 group-hover:text-white/80 font-light leading-relaxed transition-colors">
                  {solution.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
