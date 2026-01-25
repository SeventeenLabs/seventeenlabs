"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { 
  TrendingUp, 
  Clock, 
  Zap, 
  ArrowRight, 
  MessageSquare, 
  BarChart3,
  Mail,
  Users,
  FileText
} from "lucide-react";
import { useLocale } from "@/lib/i18n/context";
import ContactModal from "./contact-modal";

type CaseStudy = {
  industry: string;
  title: string;
  problem: string;
  solution: string;
  results: {
    metric: string;
    value: string;
    label: string;
  }[];
  tools: string[];
  icon: typeof TrendingUp;
  color: string;
};

export default function ResultsExamples() {
  const locale = useLocale();
  const [contactModalOpen, setContactModalOpen] = useState(false);

  const content = {
    en: {
      badge: "PROOF IT WORKS",
      title: "What’s Possible For You",
      subtitle: "Real results from AI automation projects. Each one started with a simple conversation about repetitive work.",
      disclaimer: "* Real client case studies coming soon – currently running beta pilots. Results shown are projected/anonymized based on similar implementations.",
      cta: "Want Similar Results?",
      ctaButton: "Book Free Discovery Call",
      caseStudies: [
        {
          industry: "Marketing Agency",
          title: "Automated Lead Qualification & Follow-Up",
          problem: "Manual lead scoring and email follow-ups consuming 20+ hours weekly. Sales team overwhelmed with unqualified leads.",
          solution: "Built an n8n workflow with GPT-4 that auto-scores incoming leads based on criteria, drafts personalized follow-up emails, and routes hot leads directly to sales.",
          results: [
            { metric: "time_saved", value: "65%", label: "Time Saved on Lead Processing" },
            { metric: "response_time", value: "2.3×", label: "Faster Response Rate" },
            { metric: "qualified_leads", value: "+40%", label: "More Qualified Leads to Sales" },
          ],
          tools: ["n8n", "GPT-4", "HubSpot", "Gmail"],
          icon: Mail,
          color: "blue",
        },
        {
          industry: "SaaS Startup",
          title: "Customer Support Ticket Triage",
          problem: "Support team spending 30% of time categorizing and routing tickets. Critical issues getting buried.",
          solution: "Created an AI-powered ticket classifier that analyzes incoming requests, assigns priority, routes to right team, and drafts initial responses.",
          results: [
            { metric: "resolution_time", value: "-45%", label: "Faster Resolution Time" },
            { metric: "first_response", value: "< 5min", label: "Average First Response" },
            { metric: "customer_sat", value: "+25%", label: "Customer Satisfaction Score" },
          ],
          tools: ["n8n", "OpenAI", "Zendesk", "Slack"],
          icon: MessageSquare,
          color: "emerald",
        },
        {
          industry: "E-commerce",
          title: "Automated Inventory & Reporting",
          problem: "Weekly inventory reports took 8+ hours to compile. Stock-outs due to delayed alerts.",
          solution: "Built automated reporting pipeline that pulls data from multiple sources, generates insights with AI, and sends formatted reports to stakeholders.",
          results: [
            { metric: "report_time", value: "8hrs → 10min", label: "Report Generation Time" },
            { metric: "stockouts", value: "-70%", label: "Reduction in Stock-outs" },
            { metric: "decisions", value: "Daily", label: "Data-Driven Decisions" },
          ],
          tools: ["n8n", "Shopify", "Google Sheets", "Slack"],
          icon: BarChart3,
          color: "orange",
        },
      ] as CaseStudy[],
    },
    de: {
      badge: "BEWEIS, DASS ES FUNKTIONIERT",
      title: "Was für Sie möglich ist",
      subtitle: "Echte Ergebnisse aus KI-Automatisierungsprojekten. Jedes begann mit einem einfachen Gespräch über sich wiederholende Arbeit.",
      disclaimer: "* Echte Fallstudien folgen in Kürze – wir führen derzeit Beta-Piloten durch. Die gezeigten Ergebnisse sind projiziert/anonymisiert basierend auf ähnlichen Implementierungen.",
      cta: "Ähnliche Ergebnisse gewünscht?",
      ctaButton: "Kostenloses Erstgespräch buchen",
      caseStudies: [
        {
          industry: "Marketing-Agentur",
          title: "Automatisierte Lead-Qualifizierung & Follow-Up",
          problem: "Manuelle Lead-Bewertung und E-Mail-Nachverfolgung verbrauchten 20+ Stunden wöchentlich. Sales-Team mit unqualifizierten Leads überlastet.",
          solution: "n8n-Workflow mit GPT-4 erstellt, der eingehende Leads automatisch bewertet, personalisierte Follow-up-E-Mails entwirft und heiße Leads direkt an den Vertrieb weiterleitet.",
          results: [
            { metric: "time_saved", value: "65%", label: "Zeitersparnis bei Lead-Verarbeitung" },
            { metric: "response_time", value: "2,3×", label: "Schnellere Antwortrate" },
            { metric: "qualified_leads", value: "+40%", label: "Mehr qualifizierte Leads für Sales" },
          ],
          tools: ["n8n", "GPT-4", "HubSpot", "Gmail"],
          icon: Mail,
          color: "blue",
        },
        {
          industry: "SaaS Startup",
          title: "Kundensupport-Ticket-Triage",
          problem: "Support-Team verbrachte 30% der Zeit mit Kategorisierung und Routing von Tickets. Kritische Probleme gingen unter.",
          solution: "KI-gestützten Ticket-Klassifikator erstellt, der eingehende Anfragen analysiert, Priorität zuweist, ans richtige Team weiterleitet und erste Antworten entwirft.",
          results: [
            { metric: "resolution_time", value: "-45%", label: "Schnellere Lösungszeit" },
            { metric: "first_response", value: "< 5min", label: "Durchschnittliche Erstantwort" },
            { metric: "customer_sat", value: "+25%", label: "Kundenzufriedenheits-Score" },
          ],
          tools: ["n8n", "OpenAI", "Zendesk", "Slack"],
          icon: MessageSquare,
          color: "emerald",
        },
        {
          industry: "E-Commerce",
          title: "Automatisiertes Inventar & Reporting",
          problem: "Wöchentliche Inventarberichte dauerten 8+ Stunden. Lieferengpässe durch verzögerte Warnungen.",
          solution: "Automatisierte Reporting-Pipeline gebaut, die Daten aus mehreren Quellen zieht, mit KI Insights generiert und formatierte Berichte an Stakeholder sendet.",
          results: [
            { metric: "report_time", value: "8h → 10min", label: "Berichterstellungszeit" },
            { metric: "stockouts", value: "-70%", label: "Weniger Lieferengpässe" },
            { metric: "decisions", value: "Täglich", label: "Datenbasierte Entscheidungen" },
          ],
          tools: ["n8n", "Shopify", "Google Sheets", "Slack"],
          icon: BarChart3,
          color: "orange",
        },
      ] as CaseStudy[],
    },
  };

  const t = content[locale as keyof typeof content] || content.en;

  const colorClasses = {
    blue: {
      border: "border-blue-500/20 hover:border-blue-500/40",
      bg: "bg-blue-500/5",
      iconBg: "bg-blue-500/10 border-blue-500/20",
      iconColor: "text-blue-400",
      badge: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    },
    emerald: {
      border: "border-emerald-500/20 hover:border-emerald-500/40",
      bg: "bg-emerald-500/5",
      iconBg: "bg-emerald-500/10 border-emerald-500/20",
      iconColor: "text-emerald-400",
      badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    },
    orange: {
      border: "border-orange-500/20 hover:border-orange-500/40",
      bg: "bg-orange-500/5",
      iconBg: "bg-orange-500/10 border-orange-500/20",
      iconColor: "text-orange-400",
      badge: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    },
  };

  return (
    <section id="results" className="relative bg-black py-24 lg:py-32">
      {/* Section divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent"></div>
      
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/[0.02] to-transparent pointer-events-none"></div>
      
      <div className="relative w-full px-6 sm:px-12 lg:px-16 xl:px-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium uppercase tracking-wider mb-6">
            <TrendingUp className="w-3.5 h-3.5" />
            {t.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight mb-4">
            {t.title}
          </h2>
          <p className="text-lg text-white/60 font-light max-w-2xl">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Case Studies Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {t.caseStudies.map((study, index) => {
            const Icon = study.icon;
            const colors = colorClasses[study.color as keyof typeof colorClasses];
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`group relative rounded-2xl border ${colors.border} ${colors.bg} backdrop-blur-sm p-6 lg:p-8 transition-all duration-300 hover:translate-y-[-4px] hover:shadow-xl`}
              >
                {/* Industry Badge */}
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${colors.badge} border text-xs font-medium mb-5`}>
                  <Icon className="w-3.5 h-3.5" />
                  {study.industry}
                </div>

                <h3 className="text-xl font-medium text-white mb-5 group-hover:text-white/90 transition-colors">
                  {study.title}
                </h3>

                {/* Problem */}
                <div className="mb-4">
                  <p className="text-[11px] text-white/40 uppercase tracking-wider mb-1.5 font-medium">{locale === 'de' ? 'Problem' : 'Problem'}</p>
                  <p className="text-sm text-white/60 font-light leading-relaxed">
                    {study.problem}
                  </p>
                </div>

                {/* Solution */}
                <div className="mb-6">
                  <p className="text-[11px] text-white/40 uppercase tracking-wider mb-1.5 font-medium">{locale === 'de' ? 'Lösung' : 'Solution'}</p>
                  <p className="text-sm text-white/60 font-light leading-relaxed">
                    {study.solution}
                  </p>
                </div>

                {/* Results */}
                <div className="grid grid-cols-3 gap-3 mb-6 py-4 border-y border-white/5">
                  {study.results.map((result, i) => (
                    <div key={i} className="text-center">
                      <p className={`text-xl lg:text-2xl font-light ${colors.iconColor}`}>
                        {result.value}
                      </p>
                      <p className="text-[10px] text-white/40 leading-tight mt-1">
                        {result.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Tools */}
                <div className="flex flex-wrap gap-2">
                  {study.tools.map((tool, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-white/50 text-xs font-medium"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-xs text-white/30 font-light text-center mb-12 max-w-2xl mx-auto"
        >
          {t.disclaimer}
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-xl text-white/80 font-light mb-6">{t.cta}</p>
          <button
            onClick={() => setContactModalOpen(true)}
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-black font-medium hover:bg-white/90 transition-all duration-300 shadow-lg shadow-white/10"
          >
            {t.ctaButton}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
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
