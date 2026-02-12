"use client";

import { motion } from "framer-motion";
import { Brain, Pen, Share2, Zap } from "lucide-react";

interface SolutionSectionProps {
  locale: string;
}

const agents = [
  {
    icon: Brain,
    nameEn: "Vision",
    nameDe: "Vision",
    titleEn: "SEO Analyst & Researcher",
    titleDe: "SEO-Analyst & Rechercheur",
    descriptionEn: "Deep competitor analysis, keyword research, market positioning",
    descriptionDe: "Tiefgreifende Konkurrenzanalyse, Keyword-Recherche, Marktpositionierung",
    deliverables: [
      { en: "Competitor analysis reports", de: "Konkurrenzanalyse-Berichte" },
      { en: "Keyword research & content strategy", de: "Keyword-Recherche & Content-Strategie" },
      { en: "Market research & positioning", de: "Marktforschung & Positionierung" }
    ],
    turnaroundEn: "2-3 day turnaround",
    turnaroundDe: "2-3 Tage Bearbeitungszeit",
    color: "blue"
  },
  {
    icon: Pen,
    nameEn: "Loki",
    nameDe: "Loki",
    titleEn: "Content Writer",
    titleDe: "Content-Autor",
    descriptionEn: "Blog posts, sales pages, email sequences that convert",
    descriptionDe: "Blog-Beiträge, Verkaufsseiten, E-Mail-Sequenzen, die konvertieren",
    deliverables: [
      { en: "Blog posts (1,500-2,500 words)", de: "Blog-Beiträge (1.500-2.500 Wörter)" },
      { en: "Sales pages & email sequences", de: "Verkaufsseiten & E-Mail-Sequenzen" },
      { en: "Website copy & landing pages", de: "Website-Text & Landing Pages" }
    ],
    turnaroundEn: "1-2 day turnaround",
    turnaroundDe: "1-2 Tage Bearbeitungszeit",
    color: "purple"
  },
  {
    icon: Share2,
    nameEn: "Quill",
    nameDe: "Quill",
    titleEn: "Social Media Manager",
    titleDe: "Social-Media-Manager",
    descriptionEn: "Platform-specific posts, calendars, consistent brand voice",
    descriptionDe: "Plattformspezifische Posts, Kalender, konsistente Markenstimme",
    deliverables: [
      { en: "4-week social media calendars", de: "4-Wochen-Social-Media-Kalender" },
      { en: "Platform-specific posts (LinkedIn, X, etc)", de: "Plattformspezifische Posts (LinkedIn, X, etc)" },
      { en: "28+ unique posts per calendar", de: "28+ einzigartige Posts pro Kalender" }
    ],
    turnaroundEn: "3-5 day turnaround",
    turnaroundDe: "3-5 Tage Bearbeitungszeit",
    color: "green"
  }
];

const colorClasses = {
  blue: "border-blue-500 bg-blue-50",
  purple: "border-purple-500 bg-purple-50",
  green: "border-green-500 bg-green-50"
};

const colorTextClasses = {
  blue: "text-blue-600",
  purple: "text-purple-600",
  green: "text-green-600"
};

export default function AIAgentsSolution({ locale }: SolutionSectionProps) {
  const isGerman = locale === "de";

  const title = isGerman 
    ? "Die Lösung: 3 KI-Agenten, bereit zu arbeiten" 
    : "The Solution: 3 AI Agents Ready to Work";

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-xl text-gray-600">
            {isGerman 
              ? "Keine Einrichtung nötig, keine Schulung. Weisen Sie einfach Arbeit über Slack zu und erhalten Sie Ergebnisse." 
              : "No setup needed, no training. Just assign work via Slack and get results."}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {agents.map((agent, index) => {
            const Icon = agent.icon;
            const colorClass = colorClasses[agent.color as keyof typeof colorClasses];
            const textColorClass = colorTextClasses[agent.color as keyof typeof colorTextClasses];

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`border-l-4 ${colorClass} rounded-lg p-8 hover:shadow-lg transition-shadow duration-300`}
              >
                <div className={`${textColorClass} mb-4`}>
                  <Icon className="w-12 h-12" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  {isGerman ? agent.nameDe : agent.nameEn}
                </h3>
                <p className={`${textColorClass} font-semibold mb-3`}>
                  {isGerman ? agent.titleDe : agent.titleEn}
                </p>
                <p className="text-gray-700 mb-6">
                  {isGerman ? agent.descriptionDe : agent.descriptionEn}
                </p>

                <div className="space-y-3 mb-6">
                  {agent.deliverables.map((item, idx) => (
                    <div key={idx} className="flex gap-2 text-sm text-gray-700">
                      <span className={`${textColorClass} font-bold flex-shrink-0`}>✓</span>
                      <span>{isGerman ? item.de : item.en}</span>
                    </div>
                  ))}
                </div>

                <div className={`${textColorClass} font-semibold text-sm border-t pt-4`}>
                  {isGerman ? agent.turnaroundDe : agent.turnaroundEn}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Key Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white border-2 border-blue-200 rounded-lg p-8"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Zap className="w-6 h-6 text-blue-600" />
            {isGerman ? "Was Sie bekommen" : "What You Get"}
          </h3>
          <ul className="grid md:grid-cols-2 gap-4">
            {[
              { en: "No setup needed – agents are pre-configured and ready to go", de: "Keine Einrichtung nötig – Agenten sind vorkonfiguriert und einsatzbereit" },
              { en: "No training required – just brief them and they execute", de: "Keine Schulung erforderlich – briefen Sie sie einfach und sie führen aus" },
              { en: "Work assigned via Slack – it's how you already communicate", de: "Arbeit über Slack zugewiesen – so kommunizieren Sie bereits" },
              { en: "Deliverables in dashboard – track everything in real-time", de: "Liefergegenstände im Dashboard – verfolgen Sie alles in Echtzeit" }
            ].map((item, idx) => (
              <div key={idx} className="flex gap-3">
                <span className="text-blue-600 font-bold flex-shrink-0">✓</span>
                <span className="text-gray-700">{isGerman ? item.de : item.en}</span>
              </div>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
