"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock, TrendingUp, CheckCircle2 } from "lucide-react";
import Link from "next/link";

interface CaseStudy {
  title: string;
  company: string;
  industry: string;
  challenge: string;
  solution: string;
  results: {
    metric: string;
    value: string;
  }[];
  tags: string[];
  slug: string;
}

interface CaseStudiesListProps {
  locale: string;
}

export default function CaseStudiesList({ locale }: CaseStudiesListProps) {
  const isGerman = locale === "de";

  // Sample case studies - replace with real data
  const caseStudies: CaseStudy[] = [
    {
      title: isGerman ? "Automatisierte Client-Berichterstattung" : "Automated Client Reporting",
      company: "Growth Marketing Agency",
      industry: isGerman ? "Marketing Agentur" : "Marketing Agency",
      challenge: isGerman
        ? "Verbrachten 23 Stunden pro Monat mit manueller Berichtserstellung für 15 Kunden"
        : "Spent 23 hours monthly creating manual reports for 15 clients",
      solution: isGerman
        ? "AI Appointment Engine™ - automatisierte Datensammlung aus 5 Plattformen, KI-generierte Insights, automatischer Versand"
        : "AI Appointment Engine™ - automated data collection from 5 platforms, AI-generated insights, automatic delivery",
      results: [
        { metric: isGerman ? "Zeit gespart" : "Time Saved", value: "23 hrs/mo" },
        { metric: isGerman ? "Kundenzufriedenheit" : "Client Satisfaction", value: "+35%" },
        { metric: "ROI", value: "420%" },
      ],
      tags: ["n8n", "Data Integration", "Reporting"],
      slug: "automated-client-reporting",
    },
    {
      title: isGerman ? "CRM-Automatisierung für SaaS" : "CRM Automation for SaaS",
      company: "TechScale Solutions",
      industry: "SaaS",
      challenge: isGerman
        ? "Manuelle Dateneingabe zwischen 3 Systemen führte zu Fehlern und Verzögerungen"
        : "Manual data entry between 3 systems led to errors and delays",
      solution: isGerman
        ? "Bi-direktionale Sync-Automatisierung zwischen HubSpot, Stripe und Intercom mit Echtzeit-Updates"
        : "Bi-directional sync automation between HubSpot, Stripe, and Intercom with real-time updates",
      results: [
        { metric: isGerman ? "Fehlerrate" : "Error Rate", value: "-95%" },
        { metric: isGerman ? "Produktivität" : "Productivity", value: "+40%" },
        { metric: isGerman ? "Amortisation" : "Payback", value: "6 weeks" },
      ],
      tags: ["CRM", "Integration", "Real-time Sync"],
      slug: "crm-automation-saas",
    },
    {
      title: isGerman ? "KI-gestützte Lead-Qualifizierung" : "AI-Powered Lead Qualification",
      company: "B2B Consulting Firm",
      industry: isGerman ? "Beratung" : "Consulting",
      challenge: isGerman
        ? "50% der qualifizierten Leads wurden zu spät kontaktiert oder übersehen"
        : "50% of qualified leads were contacted too late or missed entirely",
      solution: isGerman
        ? "KI-Agent analysiert eingehende Leads, priorisiert nach Fit-Score, automatische Übergabe an Vertrieb"
        : "AI agent analyzes incoming leads, prioritizes by fit score, automatic handoff to sales",
      results: [
        { metric: isGerman ? "Lead-Response-Zeit" : "Lead Response Time", value: "-85%" },
        { metric: isGerman ? "Conversion Rate" : "Conversion Rate", value: "+60%" },
        { metric: isGerman ? "Gewonnene Deals" : "Deals Won", value: "+12/mo" },
      ],
      tags: ["AI Agent", "Lead Scoring", "Sales Automation"],
      slug: "ai-lead-qualification",
    },
  ];

  return (
    <section className="relative bg-black py-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
        <div className="space-y-12">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-3xl p-8 lg:p-12 hover:border-orange-500/30 transition-all duration-300"
            >
              {/* Header */}
              <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-2xl lg:text-3xl font-light text-white mb-2">
                    {study.title}
                  </h3>
                  <div className="flex items-center gap-3 text-white/50 text-sm">
                    <span className="font-medium text-orange-400">{study.company}</span>
                    <span>•</span>
                    <span>{study.industry}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {study.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Content grid */}
              <div className="grid lg:grid-cols-2 gap-8 mb-8">
                {/* Challenge */}
                <div>
                  <div className="flex items-center gap-2 text-white/40 text-sm uppercase tracking-wider mb-3">
                    <Clock className="w-4 h-4" />
                    {isGerman ? "Herausforderung" : "Challenge"}
                  </div>
                  <p className="text-white/70 font-light leading-relaxed">
                    {study.challenge}
                  </p>
                </div>

                {/* Solution */}
                <div>
                  <div className="flex items-center gap-2 text-white/40 text-sm uppercase tracking-wider mb-3">
                    <CheckCircle2 className="w-4 h-4" />
                    {isGerman ? "Lösung" : "Solution"}
                  </div>
                  <p className="text-white/70 font-light leading-relaxed">
                    {study.solution}
                  </p>
                </div>
              </div>

              {/* Results */}
              <div className="flex items-center gap-2 text-white/40 text-sm uppercase tracking-wider mb-4">
                <TrendingUp className="w-4 h-4" />
                {isGerman ? "Ergebnisse" : "Results"}
              </div>
              <div className="grid grid-cols-3 gap-6 mb-8">
                {study.results.map((result, i) => (
                  <div key={i} className="text-center lg:text-left">
                    <div className="text-3xl font-light text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 mb-1">
                      {result.value}
                    </div>
                    <div className="text-sm text-white/50 font-light">
                      {result.metric}
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <Link
                href={`/${locale === "de" ? "de/" : ""}case-studies/${study.slug}`}
                className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors text-sm font-medium group-hover:gap-3 transition-all"
              >
                {isGerman ? "Vollständige Fallstudie lesen" : "Read Full Case Study"}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
