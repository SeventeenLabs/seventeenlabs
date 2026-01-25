'use client';

import { motion } from 'framer-motion';
import { Code2, Workflow, Brain, Database } from 'lucide-react';

interface AboutTechProps {
  locale: string;
}

export function AboutTech({ locale }: AboutTechProps) {
  const content = {
    en: {
      eyebrow: 'Technology',
      title: 'Built on Modern AI & Automation',
      description: 'We leverage cutting-edge technologies to deliver robust, scalable solutions tailored to your business needs.',
      categories: [
        {
          icon: Brain,
          title: 'AI & Machine Learning',
          technologies: [
            'OpenAI GPT-4 & GPT-4o',
            'Claude (Anthropic)',
            'Custom ML Models',
            'LangChain & RAG',
            'Vector Databases',
          ],
        },
        {
          icon: Workflow,
          title: 'Automation Platforms',
          technologies: [
            'n8n Workflows',
            'Custom APIs',
            'Zapier',
            'Event-Driven Architecture',
            'Webhook Integrations',
          ],
        },
        {
          icon: Code2,
          title: 'Development Stack',
          technologies: [
            'Next.js & React',
            'TypeScript',
            'Python & FastAPI',
            'Node.js',
            'Serverless Functions',
          ],
        },
        {
          icon: Database,
          title: 'Data & Infrastructure',
          technologies: [
            'Supabase & PostgreSQL',
            'Firebase',
            'Cloud Storage',
            'Vercel & AWS',
            'Real-time Sync',
          ],
        },
      ],
    },
    de: {
      eyebrow: 'Technologie',
      title: 'Basierend auf moderner KI & Automatisierung',
      description: 'Wir nutzen modernste Technologien, um robuste, skalierbare Lösungen für Ihre Geschäftsanforderungen zu liefern.',
      categories: [
        {
          icon: Brain,
          title: 'KI & Machine Learning',
          technologies: [
            'OpenAI GPT-4 & GPT-4o',
            'Claude (Anthropic)',
            'Benutzerdefinierte ML-Modelle',
            'LangChain & RAG',
            'Vektor-Datenbanken',
          ],
        },
        {
          icon: Workflow,
          title: 'Automatisierungsplattformen',
          technologies: [
            'n8n Workflows',
            'Benutzerdefinierte APIs',
            'Zapier',
            'Event-gesteuerte Architektur',
            'Webhook-Integrationen',
          ],
        },
        {
          icon: Code2,
          title: 'Entwicklungs-Stack',
          technologies: [
            'Next.js & React',
            'TypeScript',
            'Python & FastAPI',
            'Node.js',
            'Serverless Functions',
          ],
        },
        {
          icon: Database,
          title: 'Daten & Infrastruktur',
          technologies: [
            'Supabase & PostgreSQL',
            'Firebase',
            'Cloud Storage',
            'Vercel & AWS',
            'Echtzeit-Synchronisation',
          ],
        },
      ],
    },
  };

  const t = content[locale as keyof typeof content] || content.en;

  return (
    <section className="bg-black py-16 sm:py-20">
      <div className="px-6 sm:px-12 lg:px-16 xl:px-20">
        <div className="max-w-2xl mb-12">
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
              className="mt-3 text-3xl sm:text-4xl font-light text-white"
            >
              {t.title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-base text-white/60 font-light leading-relaxed"
            >
              {t.description}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.categories.map((category, index) => {
              const Icon = category.icon;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <div className="h-full bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-6 transition-all duration-500 hover:border-white/20 hover:from-white/10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2.5 rounded-xl bg-white/5 text-white/80 group-hover:bg-white/10 transition-colors">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="text-lg font-light text-white">
                        {category.title}
                      </h3>
                    </div>
                    
                    <ul className="space-y-2">
                      {category.technologies.map((tech, techIndex) => (
                        <li
                          key={techIndex}
                          className="flex items-center gap-2 text-sm text-white/60 font-light"
                        >
                          <div className="w-1 h-1 rounded-full bg-white/40" />
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
      </div>
    </section>
  );
}
