"use client";

import { motion } from "framer-motion";
import { useTranslations } from "@/lib/i18n/context";

export default function DevelopmentTechStack() {
  const { t } = useTranslations();

  const technologies = [
    {
      category: t("services.development.techStack.categories.ai.title"),
      tools: [
        "OpenAI GPT-4",
        "Anthropic Claude",
        "LangChain",
        "Vector Databases",
        "Fine-tuning",
      ],
    },
    {
      category: t("services.development.techStack.categories.automation.title"),
      tools: [
        "n8n",
        "Make",
        "Zapier",
        "Custom APIs",
        "Webhooks",
      ],
    },
    {
      category: t("services.development.techStack.categories.web.title"),
      tools: [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Node.js",
      ],
    },
    {
      category: t("services.development.techStack.categories.data.title"),
      tools: [
        "PostgreSQL",
        "Supabase",
        "MongoDB",
        "Redis",
        "Data Pipelines",
      ],
    },
  ];

  return (
    <section className="relative bg-black py-20 lg:py-32">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight mb-6">
            {t("services.development.techStack.title")}
          </h2>
          <p className="text-lg text-white/60 font-light leading-relaxed max-w-3xl">
            {t("services.development.techStack.description")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-6 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm"
            >
              <h3 className="text-lg font-light text-emerald-400 mb-4">
                {tech.category}
              </h3>
              <ul className="space-y-2">
                {tech.tools.map((tool, idx) => (
                  <li key={idx} className="text-sm text-white/70 font-light">
                    {tool}
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
