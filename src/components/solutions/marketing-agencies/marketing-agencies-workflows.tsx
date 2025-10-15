"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

interface MarketingAgenciesWorkflowsProps {
  locale: string;
}

export default function MarketingAgenciesWorkflows({ locale }: MarketingAgenciesWorkflowsProps) {
  const isGerman = locale === 'de';

  const content = {
    en: {
      eyebrow: "Ready to Deploy",
      title: "Pre-built workflows that solve real problems",
      subtitle: "Start with proven automation templates and customize them to fit your agency's unique needs.",
      workflows: [
        {
          title: "Lead Capture & Qualification",
          description: "Automatically capture leads from website forms, social ads, and landing pages. Score and route them based on your criteria."
        },
        {
          title: "Social Media Scheduler",
          description: "Plan content calendars, schedule posts across platforms, and monitor engagement from one central dashboard."
        },
        {
          title: "Client Report Generator",
          description: "Pull data from Google Analytics, Meta Ads, and other tools to create branded monthly reports automatically."
        },
        {
          title: "Campaign Performance Tracker",
          description: "Monitor KPIs in real-time, get alerts when campaigns underperform, and visualize results for stakeholders."
        },
        {
          title: "Team Task Manager",
          description: "Assign tasks based on project stages, send reminders, and track progress without manual check-ins."
        },
        {
          title: "Client Onboarding Sequence",
          description: "Welcome new clients with automated emails, questionnaires, and meeting scheduling to start projects smoothly."
        }
      ]
    },
    de: {
      eyebrow: "Sofort einsetzbar",
      title: "Vorgefertigte Workflows, die echte Probleme lösen",
      subtitle: "Beginnen Sie mit bewährten Automatisierungsvorlagen und passen Sie diese an die individuellen Bedürfnisse Ihrer Agentur an.",
      workflows: [
        {
          title: "Lead-Erfassung & -Qualifizierung",
          description: "Erfassen Sie automatisch Leads aus Website-Formularen, Social Ads und Landing Pages. Bewerten und leiten Sie sie nach Ihren Kriterien weiter."
        },
        {
          title: "Social Media Planer",
          description: "Planen Sie Content-Kalender, terminieren Sie Beiträge über Plattformen hinweg und überwachen Sie Engagement von einem zentralen Dashboard."
        },
        {
          title: "Kunden-Report-Generator",
          description: "Ziehen Sie Daten aus Google Analytics, Meta Ads und anderen Tools, um automatisch gebrandete Monatsberichte zu erstellen."
        },
        {
          title: "Kampagnen-Performance-Tracker",
          description: "Überwachen Sie KPIs in Echtzeit, erhalten Sie Benachrichtigungen bei Underperformance und visualisieren Sie Ergebnisse für Stakeholder."
        },
        {
          title: "Team-Aufgabenmanager",
          description: "Weisen Sie Aufgaben basierend auf Projektphasen zu, senden Sie Erinnerungen und verfolgen Sie Fortschritte ohne manuelle Check-ins."
        },
        {
          title: "Kunden-Onboarding-Sequenz",
          description: "Begrüßen Sie neue Kunden mit automatisierten E-Mails, Fragebögen und Terminvereinbarungen für einen reibungslosen Projektstart."
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

        {/* Workflows List */}
        <div className="grid md:grid-cols-2 gap-8">
          {t.workflows.map((workflow, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="flex gap-4"
            >
              <div className="flex-shrink-0 mt-1">
                <CheckCircle className="h-5 w-5 text-white/60" />
              </div>
              <div>
                <h3 className="text-base font-light text-white mb-2">
                  {workflow.title}
                </h3>
                <p className="text-sm text-white/60 font-light leading-relaxed">
                  {workflow.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
