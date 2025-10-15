'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Settings, GraduationCap, Shield } from 'lucide-react';

interface AutomationServicesProps {
  locale: string;
}

export function AutomationServices({ locale }: AutomationServicesProps) {
  const content = {
    en: {
      badge: 'What We Offer',
      title: 'Comprehensive Consulting Services',
      description: 'End-to-end automation expertise tailored to your needs',
      services: [
        {
          icon: TrendingUp,
          title: 'Process Optimization',
          description: 'Identify inefficiencies and design optimized workflows that save time and reduce costs.',
          features: [
            'Current state analysis',
            'Bottleneck identification',
            'ROI calculation',
            'Implementation roadmap',
          ],
        },
        {
          icon: Settings,
          title: 'Workflow Design',
          description: 'Create custom automation workflows that integrate seamlessly with your existing tools.',
          features: [
            'Custom workflow architecture',
            'Tool integration planning',
            'Scalability design',
            'Testing & validation',
          ],
        },
        {
          icon: GraduationCap,
          title: 'Team Training',
          description: 'Empower your team to manage and optimize automation solutions independently.',
          features: [
            'Hands-on workshops',
            'Documentation & guides',
            'Best practices training',
            'Ongoing support access',
          ],
        },
        {
          icon: Shield,
          title: 'Ongoing Support',
          description: 'Continuous optimization and support to ensure your automation delivers maximum value.',
          features: [
            'Regular health checks',
            'Performance optimization',
            'Priority support',
            'Strategic consultation',
          ],
        },
      ],
    },
    de: {
      badge: 'Unser Angebot',
      title: 'Umfassende Beratungsleistungen',
      description: 'End-to-End Automatisierungs-Expertise für Ihre Anforderungen',
      services: [
        {
          icon: TrendingUp,
          title: 'Prozessoptimierung',
          description: 'Identifizieren Sie Ineffizienzen und gestalten Sie optimierte Workflows.',
          features: [
            'Ist-Analyse',
            'Engpass-Identifikation',
            'ROI-Berechnung',
            'Implementierungs-Roadmap',
          ],
        },
        {
          icon: Settings,
          title: 'Workflow-Design',
          description: 'Erstellen Sie maßgeschneiderte Automatisierungen für Ihre Tools.',
          features: [
            'Custom Workflow-Architektur',
            'Tool-Integrationsplanung',
            'Skalierbarkeits-Design',
            'Testing & Validierung',
          ],
        },
        {
          icon: GraduationCap,
          title: 'Team-Schulung',
          description: 'Befähigen Sie Ihr Team, Automatisierungen eigenständig zu verwalten.',
          features: [
            'Praktische Workshops',
            'Dokumentation & Anleitungen',
            'Best-Practices-Training',
            'Fortlaufender Support',
          ],
        },
        {
          icon: Shield,
          title: 'Laufender Support',
          description: 'Kontinuierliche Optimierung für maximalen Mehrwert.',
          features: [
            'Regelmäßige Health Checks',
            'Performance-Optimierung',
            'Prioritäts-Support',
            'Strategische Beratung',
          ],
        },
      ],
    },
  };

  const t = content[locale as keyof typeof content] || content.en;

  return (
    <section className="bg-muted/30 py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
            <span className="text-sm font-medium text-primary">{t.badge}</span>
          </div>
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">{t.title}</h2>
          <p className="text-lg text-muted-foreground">{t.description}</p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {t.services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group rounded-2xl border bg-card p-8 shadow-sm transition-all hover:shadow-lg"
            >
              <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3">
                <service.icon className="h-6 w-6 text-primary" />
              </div>
              
              <h3 className="mb-3 text-xl font-bold">{service.title}</h3>
              <p className="mb-6 text-muted-foreground">{service.description}</p>
              
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm">
                    <div className="mr-2 h-1.5 w-1.5 rounded-full bg-primary" />
                    {feature}
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
