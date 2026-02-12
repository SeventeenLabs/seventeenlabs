"use client";

import { motion } from "framer-motion";
import { MessageSquare, Zap, Download } from "lucide-react";

interface HowItWorksSectionProps {
  locale: string;
}

export default function AIAgentsHowItWorks({ locale }: HowItWorksSectionProps) {
  const isGerman = locale === "de";

  const steps = isGerman ? [
    {
      number: "1",
      title: "Agenten briefen",
      description: "Schreiben Sie eine Nachricht in Slack: \"Schreiben Sie 4 Blog-Beiträge über AI-Automatisierung. Fällig Freitag.\"",
      icon: MessageSquare,
      details: [
        "Einfache, natürliche Sprache verwenden",
        "Anforderungen, Ton, Format festlegen",
        "Fälligkeitsdatum angeben"
      ]
    },
    {
      number: "2",
      title: "Agenten führen aus",
      description: "Vision recherchiert, Loki schreibt, Quill plant soziale Inhalte. Alles gleichzeitig.",
      icon: Zap,
      details: [
        "Parallele Verarbeitung",
        "Agenten koordinieren sich automatisch",
        "Entwürfe in Echtzeit angezeigt"
      ]
    },
    {
      number: "3",
      title: "Sie veröffentlichen",
      description: "Laden Sie herunter, überprüfen Sie, nimm kleine Änderungen vor, fertig.",
      icon: Download,
      details: [
        "Download von Entwürfen im Dashboard",
        "1-2 Überarbeitungsrunden enthalten",
        "Veröffentlichen Sie direkt"
      ]
    }
  ] : [
    {
      number: "1",
      title: "Brief Agents",
      description: "Message in Slack: \"Write 4 blog posts about AI automation. Due Friday.\"",
      icon: MessageSquare,
      details: [
        "Use simple, natural language",
        "Specify requirements, tone, format",
        "Set your deadline"
      ]
    },
    {
      number: "2",
      title: "Agents Execute",
      description: "Vision researches, Loki writes, Quill plans social content. All at the same time.",
      icon: Zap,
      details: [
        "Parallel processing",
        "Agents coordinate automatically",
        "Drafts shown in real-time"
      ]
    },
    {
      number: "3",
      title: "You Publish",
      description: "Download, review, make minor tweaks, done.",
      icon: Download,
      details: [
        "Download drafts from dashboard",
        "1-2 revision rounds included",
        "Publish directly"
      ]
    }
  ];

  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {isGerman ? "So funktioniert es" : "How It Works"}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {isGerman 
              ? "Ein 3-Schritte-Prozess: Briefing, Ausführung, Veröffentlichung. Keine komplizierte Einrichtung, keine Verzögerungen." 
              : "A 3-step workflow: brief, execute, publish. No complicated setup, no delays."}
          </p>
        </motion.div>

        <div className="space-y-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="grid md:grid-cols-3 gap-8 items-center">
                  {/* Step number and icon */}
                  <div className="flex flex-col items-center md:items-start">
                    <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                      {step.number}
                    </div>
                    <div className="text-blue-600 mb-4">
                      <Icon className="w-8 h-8" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="md:col-span-2">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-lg text-gray-700 mb-4">{step.description}</p>
                    <ul className="space-y-2">
                      {step.details.map((detail, idx) => (
                        <li key={idx} className="flex gap-2 text-gray-600">
                          <span className="text-blue-600 font-bold">→</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="flex justify-center md:justify-start mt-8">
                    <div className="w-1 h-12 bg-gradient-to-b from-blue-600 to-blue-200"></div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Timeline visualization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 p-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            {isGerman ? "Typischer Workflow" : "Typical Workflow"}
          </h3>
          <div className="grid md:grid-cols-5 gap-4">
            {[
              { time: isGerman ? "Mo 10:00" : "Mon 10am", text: isGerman ? "Briefing senden" : "Send brief" },
              { time: isGerman ? "Mo 14:00" : "Mon 2pm", text: isGerman ? "Agenten arbeiten" : "Agents working" },
              { time: isGerman ? "Di 14:00" : "Tue 2pm", text: isGerman ? "Entwürfe bereit" : "Drafts ready" },
              { time: isGerman ? "Mi 10:00" : "Wed 10am", text: isGerman ? "Überarbeitungen" : "Revisions" },
              { time: isGerman ? "Mi 15:00" : "Wed 3pm", text: isGerman ? "Veröffentlicht!" : "Published!" }
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="text-sm font-semibold text-blue-600 mb-1">{item.time}</div>
                <div className="text-sm text-gray-700">{item.text}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
