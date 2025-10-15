"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import { useState } from "react";
import ContactModal from "@/components/contact-modal";

interface MarketingAgenciesPrebuiltWorkflowsProps {
  locale: string;
}

export default function MarketingAgenciesPrebuiltWorkflows({ locale }: MarketingAgenciesPrebuiltWorkflowsProps) {
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const isGerman = locale === 'de';

  const content = {
    en: {
      eyebrow: "Ready-to-Use Automations",
      title: "Pre-built workflows you can start using today",
      subtitle: "These are complete automation templates designed specifically for marketing agencies. Pick one, customize it to your needs, and deploy in minutes—not weeks.",
      cta: "Get Access to Workflows",
      learnMore: "Learn More",
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
          timeSaved: "20+ hours per month",
          link: "/workflows/performance-report-generator" // Link to workflow detail/purchase page
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
          timeSaved: "10+ hours per week",
          link: "/workflows/lead-management"
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
          timeSaved: "5+ hours per campaign",
          link: "/workflows/campaign-launch"
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
          timeSaved: "8+ hours per week",
          link: "/workflows/social-media-automation"
        }
      ]
    },
    de: {
      eyebrow: "Sofort einsetzbare Automatisierungen",
      title: "Vorgefertigte Workflows, die Sie heute starten können",
      subtitle: "Dies sind vollständige Automatisierungsvorlagen, speziell für Marketing-Agenturen entwickelt. Wählen Sie eine aus, passen Sie sie an Ihre Bedürfnisse an und setzen Sie sie in Minuten ein—nicht Wochen.",
      cta: "Zugang zu Workflows erhalten",
      learnMore: "Mehr erfahren",
      workflows: [
        {
          title: "Wöchentlicher Performance-Report-Generator",
          useCase: "Automatisiertes Kunden-Reporting",
          description: "Verschwenden Sie keine Stunden mehr mit Datenkompilierung. Dieser Workflow zieht automatisch Metriken von allen Plattformen und liefert gebrandete Reports an Kunden.",
          steps: [
            "Wird jeden Montag automatisch ausgelöst",
            "Zieht Daten aus Google Analytics, Google Ads, Meta Ads, Instagram",
            "Bereinigt und transformiert Daten (Summen, Durchschnitte, Wachstumsraten)",
            "Generiert gebrandetes PDF oder Dashboard-Link",
            "E-Mail an Team und Kunde automatisch"
          ],
          timeSaved: "20+ Stunden pro Monat",
          link: "/workflows/performance-report-generator"
        },
        {
          title: "Lead-Erfassung → Qualifizieren → Zuweisen",
          useCase: "Lead-Management-Automatisierung",
          description: "Verpassen Sie nie wieder einen Lead. Erfassen, bewerten und leiten Sie Leads automatisch an das richtige Teammitglied basierend auf Ihren Kriterien weiter.",
          steps: [
            "Web-Formular-Einreichung löst Workflow via Webhook aus",
            "Reichert Lead-Daten an (Firmeninfo, Social-Profile)",
            "Wendet Bewertungslogik basierend auf Ihren Kriterien an",
            "Leitet an entsprechende Vertriebs-/Account-Person weiter",
            "Niedrig bewertete Leads treten in Nurture-Sequenz ein"
          ],
          timeSaved: "10+ Stunden pro Woche",
          link: "/workflows/lead-management"
        },
        {
          title: "Kampagnenstart-Automatisierung",
          useCase: "Kampagnen-Setup & Tracking",
          description: "Starten Sie Kampagnen schneller und fehlerfrei. Richten Sie automatisch Tracking, Budgets ein und benachrichtigen Sie Ihr Team bei Kampagnengenehmigung.",
          steps: [
            "Kampagnengenehmigung löst Workflow aus",
            "Richtet Ad-Account-Strukturen und Placements ein",
            "Konfiguriert Budget-Zeitpläne und Flight-Daten",
            "Generiert Tracking-Links und UTM-Parameter",
            "Erstellt Creative Briefs und benachrichtigt Team"
          ],
          timeSaved: "5+ Stunden pro Kampagne",
          link: "/workflows/campaign-launch"
        },
        {
          title: "Social Media Veröffentlichungs-Automatisierung",
          useCase: "Content-Distribution",
          description: "Veröffentlichen Sie einmal, verteilen Sie überall. Erstellen Sie automatisch plattformoptimierte Posts und tracken Sie Performance über alle Kanäle.",
          steps: [
            "Neuer Blogbeitrag veröffentlicht (RSS/CMS-Webhook)",
            "Generiert Social-Media-Post-Varianten mit KI",
            "Plant oder postet auf Facebook, LinkedIn, Twitter, Instagram",
            "Verfolgt Engagement-Metriken automatisch",
            "Sendet Performance-Zusammenfassung wöchentlich"
          ],
          timeSaved: "8+ Stunden pro Woche",
          link: "/workflows/social-media-automation"
        }
      ]
    }
  };

  const t = isGerman ? content.de : content.en;

  return (
    <>
      <section className="relative py-24 sm:py-32 bg-zinc-950">
        <div className="relative z-10 w-full px-6 sm:px-12 lg:px-16 xl:px-20">
          {/* Header */}
          <div className="max-w-3xl mb-12">
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
              className="mt-6 text-base text-white/70 font-light leading-relaxed"
            >
              {t.subtitle}
            </motion.p>
          </div>

          {/* Workflows Grid */}
          <div className="grid gap-8 md:grid-cols-2 mb-12">
            {t.workflows.map((workflow, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all hover:bg-white/[0.07]"
              >
                {/* Header */}
                <div className="mb-6">
                  <div className="text-xs text-white/40 uppercase tracking-wider mb-2">
                    {workflow.useCase}
                  </div>
                  <h3 className="text-xl font-medium text-white mb-3">
                    {workflow.title}
                  </h3>
                  <p className="text-sm text-white/70 font-light leading-relaxed">
                    {workflow.description}
                  </p>
                </div>

                {/* Steps */}
                <div className="space-y-2 mb-6">
                  {workflow.steps.map((step, stepIndex) => (
                    <div key={stepIndex} className="flex items-start gap-3">
                      <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/40 flex-shrink-0" />
                      <span className="text-xs text-white/60 font-light leading-relaxed">
                        {step}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Time Saved */}
                <div className="pt-5 mb-6 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-emerald-400" />
                    <span className="text-sm text-emerald-300 font-medium">
                      {workflow.timeSaved}
                    </span>
                  </div>
                </div>

                {/* CTA Link */}
                <a
                  href={workflow.link}
                  className="group/link inline-flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors"
                >
                  <span>{t.learnMore}</span>
                  <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                </a>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <button
              onClick={() => setContactModalOpen(true)}
              className="group inline-flex items-center gap-2 px-8 py-3.5 text-sm font-medium text-black bg-white rounded-lg hover:bg-white/90 transition-all shadow-lg shadow-white/20"
            >
              {t.cta}
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      <ContactModal isOpen={contactModalOpen} onClose={() => setContactModalOpen(false)} />
    </>
  );
}
