"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface MarketingAgenciesWorkflowsProps {
  locale: string;
}

export default function MarketingAgenciesWorkflows({ locale }: MarketingAgenciesWorkflowsProps) {
  const isGerman = locale === 'de';

  const content = {
    en: {
      title: "Pre-Built Workflows for Agencies",
      subtitle: "Get started in minutes with our ready-to-use automation workflows",
      workflows: [
        {
          title: "Lead Capture & Qualification",
          description: "Automatically capture leads from forms, ads, and landing pages. Qualify them based on your criteria and route to sales.",
          features: [
            "Multi-channel lead capture",
            "AI-powered lead scoring",
            "Automatic CRM sync",
            "Slack/Teams notifications"
          ]
        },
        {
          title: "Client Onboarding",
          description: "Streamline new client onboarding with automated welcome emails, document collection, and project setup.",
          features: [
            "Automated welcome sequence",
            "Document collection & storage",
            "Project management setup",
            "Team assignment"
          ]
        },
        {
          title: "Social Media Management",
          description: "Plan, schedule, and analyze social media content across all major platforms from one centralized hub.",
          features: [
            "Multi-platform posting",
            "Content calendar",
            "Engagement monitoring",
            "Performance analytics"
          ]
        },
        {
          title: "Reporting & Analytics",
          description: "Generate comprehensive client reports automatically, combining data from multiple marketing platforms.",
          features: [
            "Multi-source data aggregation",
            "Branded report templates",
            "Scheduled delivery",
            "Custom KPI tracking"
          ]
        }
      ]
    },
    de: {
      title: "Vorgefertigte Workflows für Agenturen",
      subtitle: "Starten Sie in Minuten mit unseren gebrauchsfertigen Automatisierungs-Workflows",
      workflows: [
        {
          title: "Lead-Erfassung & Qualifizierung",
          description: "Erfassen Sie automatisch Leads aus Formularen, Anzeigen und Landing Pages. Qualifizieren Sie sie nach Ihren Kriterien und leiten Sie sie an den Vertrieb weiter.",
          features: [
            "Multi-Kanal Lead-Erfassung",
            "KI-gestütztes Lead-Scoring",
            "Automatische CRM-Synchronisierung",
            "Slack/Teams Benachrichtigungen"
          ]
        },
        {
          title: "Kunden-Onboarding",
          description: "Optimieren Sie das Onboarding neuer Kunden mit automatisierten Willkommens-E-Mails, Dokumentensammlung und Projekt-Setup.",
          features: [
            "Automatisierte Willkommens-Sequenz",
            "Dokumentensammlung & Speicherung",
            "Projektmanagement-Setup",
            "Team-Zuweisung"
          ]
        },
        {
          title: "Social Media Management",
          description: "Planen, planen und analysieren Sie Social-Media-Inhalte über alle wichtigen Plattformen von einem zentralen Hub aus.",
          features: [
            "Multi-Plattform-Posting",
            "Content-Kalender",
            "Engagement-Überwachung",
            "Performance-Analytik"
          ]
        },
        {
          title: "Reporting & Analytik",
          description: "Erstellen Sie automatisch umfassende Kundenberichte, die Daten aus mehreren Marketing-Plattformen kombinieren.",
          features: [
            "Multi-Quellen Datenaggregation",
            "Gebrandete Report-Vorlagen",
            "Geplante Zustellung",
            "Benutzerdefiniertes KPI-Tracking"
          ]
        }
      ]
    }
  };

  const t = isGerman ? content.de : content.en;

  return (
    <section className="py-24 bg-slate-950">
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

        {/* Workflows Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {t.workflows.map((workflow, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300"
            >
              <h3 className="text-2xl font-bold text-white mb-3">
                {workflow.title}
              </h3>
              <p className="text-slate-400 mb-6">
                {workflow.description}
              </p>
              <ul className="space-y-3">
                {workflow.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <div className="mt-1 h-5 w-5 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                      <Check className="h-3 w-3 text-blue-400" />
                    </div>
                    <span className="text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
