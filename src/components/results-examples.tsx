"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { 
  TrendingUp, 
  Zap, 
  ArrowRight, 
  MessageSquare, 
  BarChart3,
  Mail,
  Users,
  ExternalLink
} from "lucide-react";
import { useLocale } from "@/lib/i18n/context";
import ContactModal from "./contact-modal";

type CaseStudy = {
  industry: string;
  company: string;
  title: string;
  problem: string;
  solution: string;
  results: {
    metric: string;
    value: string;
    label: string;
  }[];
  tools: string[];
  source: string;
  icon: typeof TrendingUp;
  color: string;
};

export default function ResultsExamples() {
  const locale = useLocale();
  const [contactModalOpen, setContactModalOpen] = useState(false);

  const content = {
    en: {
      badge: "REAL RESULTS",
      title: "What Others Have Achieved",
      subtitle: "Documented case studies from companies using the same tools I work with.",
      sourceLabel: "Source",
      cta: "Ready to Get Started?",
      ctaButton: "Book Free Discovery Call",
      caseStudies: [
        {
          industry: "SaaS Company",
          company: "Vendasta",
          title: "AI-Powered Lead Qualification",
          problem: "Sales team wasting time on unqualified leads. No systematic way to score and prioritize incoming prospects.",
          solution: "Automated lead scoring system that analyzes incoming leads, enriches data, scores based on fit criteria, and routes hot leads directly to sales reps.",
          results: [
            { metric: "revenue", value: "$1M+", label: "Recovered Revenue" },
            { metric: "time", value: "15hrs", label: "Saved Weekly per Rep" },
            { metric: "response", value: "< 5min", label: "Lead Response Time" },
          ],
          tools: ["Zapier", "CRM", "Clearbit", "Slack"],
          source: "zapier.com/customer-stories",
          icon: TrendingUp,
          color: "blue",
        },
        {
          industry: "HR Tech",
          company: "Remote.com",
          title: "Automated IT Support Workflows",
          problem: "IT team drowning in repetitive requests. Employee onboarding taking too long, support tickets piling up.",
          solution: "End-to-end automation for employee onboarding, IT provisioning, and common support requests with AI-assisted ticket routing.",
          results: [
            { metric: "savings", value: "$500K", label: "Annual Savings" },
            { metric: "tickets", value: "80%", label: "Tickets Auto-Resolved" },
            { metric: "onboarding", value: "2 days", label: "vs 2 Weeks Before" },
          ],
          tools: ["Zapier", "Okta", "Slack", "Jira"],
          source: "zapier.com/customer-stories",
          icon: Users,
          color: "emerald",
        },
        {
          industry: "B2B Services",
          company: "Contractor Appointments",
          title: "Lead Nurture & Follow-Up Automation",
          problem: "Leads falling through cracks. Manual follow-up inconsistent. Sales team couldn't scale outreach.",
          solution: "Automated lead capture, instant response sequences, and intelligent follow-up based on engagement signals.",
          results: [
            { metric: "revenue", value: "$134M", label: "Client Revenue Generated" },
            { metric: "response", value: "< 1min", label: "Lead Response Time" },
            { metric: "conversion", value: "3×", label: "Higher Conversion" },
          ],
          tools: ["Zapier", "CRM", "Twilio", "Email"],
          source: "zapier.com/customer-stories",
          icon: Mail,
          color: "orange",
        },
        {
          industry: "AI/SaaS",
          company: "Otter.ai",
          title: "Customer Support Automation",
          problem: "Support team overwhelmed. Repetitive questions consuming hours. Customer wait times increasing.",
          solution: "AI-powered ticket classification, auto-responses for common questions, and intelligent routing for complex issues.",
          results: [
            { metric: "resolved", value: "1,000+", label: "Tickets Auto-Resolved/Month" },
            { metric: "time", value: "70%", label: "Faster Resolution" },
            { metric: "satisfaction", value: "+35%", label: "CSAT Improvement" },
          ],
          tools: ["Zapier", "Intercom", "OpenAI", "Notion"],
          source: "zapier.com/customer-stories",
          icon: MessageSquare,
          color: "blue",
        },
        {
          industry: "Food Delivery",
          company: "Delivery Hero",
          title: "Operations & Reporting Automation",
          problem: "200+ hours monthly spent on manual data tasks. Reporting delayed. Operations team stretched thin.",
          solution: "Automated data pipelines connecting all platforms, real-time dashboards, and scheduled reports to stakeholders.",
          results: [
            { metric: "time", value: "200hrs", label: "Saved Monthly" },
            { metric: "reporting", value: "Real-time", label: "vs Weekly Before" },
            { metric: "accuracy", value: "99%", label: "Data Accuracy" },
          ],
          tools: ["n8n", "APIs", "Google Sheets", "Slack"],
          source: "n8n.io/case-studies",
          icon: BarChart3,
          color: "emerald",
        },
        {
          industry: "Telecom",
          company: "Vodafone UK",
          title: "Security & IT Ops Automation",
          problem: "Manual security processes. Slow incident response. High operational costs for routine IT tasks.",
          solution: "Automated security monitoring, incident response workflows, and self-service IT operations for common requests.",
          results: [
            { metric: "savings", value: "£2.2M", label: "Cost Avoided" },
            { metric: "incidents", value: "90%", label: "Faster Response" },
            { metric: "manual", value: "-75%", label: "Manual Work Reduced" },
          ],
          tools: ["n8n", "Security Tools", "ServiceNow", "APIs"],
          source: "n8n.io/case-studies",
          icon: Zap,
          color: "orange",
        },
      ] as CaseStudy[],
    },
    de: {
      badge: "ECHTE ERGEBNISSE",
      title: "Was andere erreicht haben",
      subtitle: "Dokumentierte Fallstudien von Unternehmen, die dieselben Tools nutzen wie ich.",
      sourceLabel: "Quelle",
      cta: "Bereit loszulegen?",
      ctaButton: "Kostenloses Erstgespräch buchen",
      caseStudies: [
        {
          industry: "SaaS-Unternehmen",
          company: "Vendasta",
          title: "KI-gestützte Lead-Qualifizierung",
          problem: "Sales-Team verschwendete Zeit mit unqualifizierten Leads. Kein System zur Bewertung und Priorisierung.",
          solution: "Automatisiertes Lead-Scoring analysiert Leads, reichert Daten an, bewertet nach Kriterien und leitet heiße Leads direkt an Sales.",
          results: [
            { metric: "revenue", value: "$1M+", label: "Wiedergewonnener Umsatz" },
            { metric: "time", value: "15h", label: "Gespart pro Rep/Woche" },
            { metric: "response", value: "< 5min", label: "Lead-Antwortzeit" },
          ],
          tools: ["Zapier", "CRM", "Clearbit", "Slack"],
          source: "zapier.com/customer-stories",
          icon: TrendingUp,
          color: "blue",
        },
        {
          industry: "HR Tech",
          company: "Remote.com",
          title: "Automatisierte IT-Support-Workflows",
          problem: "IT-Team überfordert mit repetitiven Anfragen. Onboarding dauerte zu lange, Tickets stauten sich.",
          solution: "End-to-End-Automatisierung für Onboarding, IT-Bereitstellung und Support-Anfragen mit KI-Ticket-Routing.",
          results: [
            { metric: "savings", value: "$500K", label: "Jährliche Einsparung" },
            { metric: "tickets", value: "80%", label: "Tickets auto-gelöst" },
            { metric: "onboarding", value: "2 Tage", label: "statt 2 Wochen" },
          ],
          tools: ["Zapier", "Okta", "Slack", "Jira"],
          source: "zapier.com/customer-stories",
          icon: Users,
          color: "emerald",
        },
        {
          industry: "B2B-Dienstleister",
          company: "Contractor Appointments",
          title: "Lead-Nurturing & Follow-Up-Automatisierung",
          problem: "Leads gingen verloren. Manuelles Follow-up inkonsistent. Sales konnte Outreach nicht skalieren.",
          solution: "Automatisierte Lead-Erfassung, sofortige Antwort-Sequenzen und intelligentes Follow-up basierend auf Engagement.",
          results: [
            { metric: "revenue", value: "$134M", label: "Generierter Kundenumsatz" },
            { metric: "response", value: "< 1min", label: "Lead-Antwortzeit" },
            { metric: "conversion", value: "3×", label: "Höhere Conversion" },
          ],
          tools: ["Zapier", "CRM", "Twilio", "E-Mail"],
          source: "zapier.com/customer-stories",
          icon: Mail,
          color: "orange",
        },
        {
          industry: "KI/SaaS",
          company: "Otter.ai",
          title: "Kundensupport-Automatisierung",
          problem: "Support-Team überlastet. Repetitive Fragen fraßen Stunden. Wartezeiten stiegen.",
          solution: "KI-Ticket-Klassifizierung, Auto-Antworten für häufige Fragen, intelligentes Routing für komplexe Themen.",
          results: [
            { metric: "resolved", value: "1.000+", label: "Tickets auto-gelöst/Monat" },
            { metric: "time", value: "70%", label: "Schnellere Lösung" },
            { metric: "satisfaction", value: "+35%", label: "CSAT-Verbesserung" },
          ],
          tools: ["Zapier", "Intercom", "OpenAI", "Notion"],
          source: "zapier.com/customer-stories",
          icon: MessageSquare,
          color: "blue",
        },
        {
          industry: "Lieferdienst",
          company: "Delivery Hero",
          title: "Operations- & Reporting-Automatisierung",
          problem: "200+ Stunden monatlich für manuelle Datenaufgaben. Reporting verzögert. Ops-Team überlastet.",
          solution: "Automatisierte Datenpipelines, Echtzeit-Dashboards und geplante Reports an Stakeholder.",
          results: [
            { metric: "time", value: "200h", label: "Monatlich gespart" },
            { metric: "reporting", value: "Echtzeit", label: "statt wöchentlich" },
            { metric: "accuracy", value: "99%", label: "Datengenauigkeit" },
          ],
          tools: ["n8n", "APIs", "Google Sheets", "Slack"],
          source: "n8n.io/case-studies",
          icon: BarChart3,
          color: "emerald",
        },
        {
          industry: "Telekommunikation",
          company: "Vodafone UK",
          title: "Security- & IT-Ops-Automatisierung",
          problem: "Manuelle Sicherheitsprozesse. Langsame Incident-Response. Hohe Kosten für Routine-IT.",
          solution: "Automatisiertes Security-Monitoring, Incident-Response-Workflows und Self-Service für IT-Anfragen.",
          results: [
            { metric: "savings", value: "£2,2M", label: "Vermiedene Kosten" },
            { metric: "incidents", value: "90%", label: "Schnellere Response" },
            { metric: "manual", value: "-75%", label: "Weniger manuelle Arbeit" },
          ],
          tools: ["n8n", "Security Tools", "ServiceNow", "APIs"],
          source: "n8n.io/case-studies",
          icon: Zap,
          color: "orange",
        },
      ] as CaseStudy[],
    },
  };

  const t = content[locale as keyof typeof content] || content.en;

  return (
    <section id="results" className="relative bg-black pt-16 lg:pt-20 pb-4 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl lg:text-5xl font-light text-white tracking-tight mb-4">
            {t.title}
          </h2>
          <p className="text-xl text-white/60 font-light max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Case Studies Grid - 2x3 layout */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {t.caseStudies.map((study, index) => {
            const Icon = study.icon;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/20 p-6 transition-all duration-300"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Icon className="w-5 h-5 text-white/50" />
                    <span className="text-xs text-white/40 font-medium">{study.industry}</span>
                  </div>
                  <span className="text-xs text-white/30 font-medium">{study.company}</span>
                </div>

                <h3 className="text-lg font-medium text-white mb-3 group-hover:text-white/90 transition-colors leading-tight">
                  {study.title}
                </h3>

                {/* Problem - compact */}
                <p className="text-sm text-white/50 font-light leading-relaxed mb-4">
                  {study.problem}
                </p>

                {/* Results - horizontal */}
                <div className="grid grid-cols-3 gap-3 mb-4 py-4 border-y border-white/5">
                  {study.results.map((result, i) => (
                    <div key={i} className="text-center">
                      <p className="text-xl font-light text-white mb-0.5">
                        {result.value}
                      </p>
                      <p className="text-[10px] text-white/40 leading-tight">
                        {result.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Footer: Tools + Source */}
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {study.tools.slice(0, 3).map((tool, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded bg-white/5 text-white/40 text-[10px] font-medium"
                      >
                        {tool}
                      </span>
                    ))}
                    {study.tools.length > 3 && (
                      <span className="px-2 py-0.5 text-white/30 text-[10px]">
                        +{study.tools.length - 3}
                      </span>
                    )}
                  </div>
                  <a 
                    href={`https://${study.source}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[10px] text-white/30 hover:text-white/50 transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" />
                    {t.sourceLabel}
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-white/50 mb-6 font-light">
            {t.cta}
          </p>
          <a
            href="https://cal.com/christian-lutz-pw2nn4/15min"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-medium hover:bg-white/90 transition-all duration-300 shadow-2xl shadow-white/20 hover:scale-105"
          >
            {t.ctaButton}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>

      {/* Contact Modal */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        prefillMessage="I'm interested in achieving similar automation results for my business. Let's discuss what's possible for my specific use case."
      />
    </section>
  );
}
