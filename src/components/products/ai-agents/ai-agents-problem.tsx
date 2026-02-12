"use client";

import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

interface ProblemSectionProps {
  locale: string;
}

export default function AIAgentsProblem({ locale }: ProblemSectionProps) {
  const isGerman = locale === "de";

  const content = isGerman ? {
    title: "Das Problem: Sie benötigen mehr, aber das kostet zu viel",
    problems: [
      { text: "Sie brauchen mehr Content, mehr Recherche, mehr Output", impact: "Massive Nachfrage" },
      { text: "Aber Freelancer einstellen ist langsam, teuer und inkonsistent", impact: "Zu hohe Kosten" },
      { text: "Und Ihr Team ist bereits überlastet", impact: "Keine Zeit" }
    ]
  } : {
    title: "The Problem: You Need More, But It Costs Too Much",
    problems: [
      { text: "You need more content, more research, more output", impact: "Massive demand" },
      { text: "But hiring freelancers is slow, expensive, and inconsistent", impact: "High cost" },
      { text: "And your team is already stretched thin", impact: "No capacity" }
    ]
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-16"
        >
          {content.title}
        </motion.h2>

        <div className="space-y-6">
          {content.problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex gap-6 items-start p-6 bg-red-50 border-l-4 border-red-500 rounded-lg"
            >
              <div className="flex-shrink-0">
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
              <div className="flex-1">
                <p className="text-lg text-gray-800 font-medium mb-2">{problem.text}</p>
                <span className="inline-block px-3 py-1 bg-red-200 text-red-800 text-sm font-semibold rounded-full">
                  {problem.impact}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
