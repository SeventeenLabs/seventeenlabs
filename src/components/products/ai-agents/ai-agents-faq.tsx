"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface FAQSectionProps {
  locale: string;
}

export default function AIAgentsFAQ({ locale }: FAQSectionProps) {
  const isGerman = locale === "de";
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = isGerman ? [
    {
      question: "Wie weise ich den Agenten Arbeit zu?",
      answer: "Es ist einfach: Schreiben Sie eine Nachricht in Slack. Zum Beispiel: \"Schreiben Sie 5 Blog-Beiträge über AI-Automatisierung. Fällig Freitag.\" Das war's! Die Agenten verstehen natürliche Sprache und beginnen sofort zu arbeiten."
    },
    {
      question: "Was ist, wenn mir die Lieferung nicht gefällt?",
      answer: "Keine Sorge. Überarbeitungen sind enthalten – normalerweise 1-2 Runden. Geben Sie einfach Feedback: \"Weniger technisch, mehr auf CEO fokussiert\" und die Agenten überarbeiten es. Wir bekommen es richtig."
    },
    {
      question: "Kann ich jederzeit kündigen?",
      answer: "Ja. Es gibt eine 30-Tage-Kündigungsrichtlinie. Keine langfristigen Verträge, keine versteckten Gebühren. Sie zahlen monatlich und können jederzeit kündigen. Einfach so."
    },
    {
      question: "Wem gehören die erstellten Inhalte?",
      answer: "Ihnen. Sie besitzen jeden Artikel, jeden Social-Media-Post, jeden Bericht, den die Agenten erstellen. Wir besitzen die Agenten, Sie besitzen die Ergebnisse. Das ist der Deal."
    },
    {
      question: "Wie unterscheidet sich das von Freelance-Plattformen?",
      answer: "Drei Dinge: Konsistenz (die gleichen Agenten, jedes Mal), Geschwindigkeit (24-48 Stunden, nicht Wochen) und Einfachheit (keine Projektbewirtschaftung, keine Verträge mit einzelnen Freelancern). Sie führen eine Konversation mit einem Team, nicht mit 10 verschiedenen Menschen."
    },
    {
      question: "Was ist mit benutzerdefinierten Agenten?",
      answer: "Im Enterprise-Plan enthalten. Wir können die Agenten für Ihr Unternehmen, Ihren Stil und Ihre spezifischen Anforderungen trainieren. Benutzerdefinierte Expertise, bewährte Ausführung."
    },
    {
      question: "Wie lange dauert es, bis die erste Lieferung erfolgt?",
      answer: "Nach der Einrichtung (1-2 Tage für Slack-Integration) erhalten Sie Ihre erste Lieferung in 24-48 Stunden. Walten Sie einfach die Art der Arbeit aus und die Frist."
    },
    {
      question: "Können die Agenten zusammenarbeiten?",
      answer: "Ja! Genau darum geht es. Sie können sagen: \"Vision, recherchieren Sie dieses Thema. Loki, schreiben Sie dann einen Blog-Beitrag. Quill, erstellen Sie die Social-Medien-Posts.\" Sie koordinieren sich automatisch."
    }
  ] : [
    {
      question: "How do I assign work to the agents?",
      answer: "It's simple: message in Slack. For example: \"Write 5 blog posts about AI automation. Due Friday.\" That's it. The agents understand natural language and start working immediately."
    },
    {
      question: "What if I don't like the deliverable?",
      answer: "Revisions are included – usually 1-2 rounds. Just give feedback: \"Less technical, more CEO-focused\" and the agents revise. We'll get it right."
    },
    {
      question: "Can I cancel anytime?",
      answer: "Yes. 30-day cancellation clause. No long-term contracts, no hidden fees. You pay monthly and can cancel anytime. That's it."
    },
    {
      question: "Who owns the deliverables?",
      answer: "You do. You own every article, every social post, every report the agents create. We own the agents, you own the output. That's the deal."
    },
    {
      question: "How is this different from freelance platforms?",
      answer: "Three things: consistency (same agents, every time), speed (24-48 hours, not weeks), and simplicity (no project management, no contracts with individual freelancers). You're having a conversation with a team, not managing 10 different people."
    },
    {
      question: "What about custom agents?",
      answer: "Included in the Enterprise plan. We can train the agents on your company, your voice, and your specific needs. Custom expertise, proven execution."
    },
    {
      question: "How long until my first deliverable?",
      answer: "After setup (1-2 days for Slack integration), you'll get your first deliverable in 24-48 hours. Just specify the work type and deadline."
    },
    {
      question: "Can the agents work together on projects?",
      answer: "Yes, that's the whole point. You can say: \"Vision, research this topic. Loki, then write a blog post. Quill, create the social posts.\" They coordinate automatically."
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {isGerman ? "Häufig gestellte Fragen" : "Frequently Asked Questions"}
          </h2>
          <p className="text-xl text-gray-600">
            {isGerman 
              ? "Antworten auf häufige Fragen von Agenturführern." 
              : "Everything you need to know about our AI agents."}
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="border border-gray-200 rounded-lg overflow-hidden hover:border-blue-300 transition-colors duration-200"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 bg-white hover:bg-gray-50 transition-colors duration-200"
              >
                <h3 className="text-lg font-semibold text-gray-900 text-left">
                  {faq.question}
                </h3>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 transition-transform duration-300 flex-shrink-0 ml-4 ${
                    openIndex === index ? "transform rotate-180" : ""
                  }`}
                />
              </button>

              {openIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-t border-gray-200 bg-gray-50 p-6"
                >
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-12 p-8 bg-blue-50 border-2 border-blue-200 rounded-lg text-center"
        >
          <p className="text-gray-700 mb-4">
            {isGerman 
              ? "Haben Sie andere Fragen?" 
              : "Still have questions?"}
          </p>
          <p className="text-sm text-gray-600">
            {isGerman 
              ? "Kontaktieren Sie uns unter hello@seventeenlabs.io oder buchen Sie eine Demo." 
              : "Reach out at hello@seventeenlabs.io or book a demo."}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
