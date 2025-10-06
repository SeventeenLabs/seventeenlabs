"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MessageSquare, Workflow, ArrowRight, BarChart3, Zap, Shield, Brain, MessageCircle, Clock } from "lucide-react";
import { use } from "react";

interface AppsPageProps {
  params: Promise<{
    locale: string;
  }>;
}

const applications = [
  {
    title: "SenseFeedback",
    tagline: "Understand your customers",
    description: "Intelligent feedback collection and analysis platform that turns customer insights into actionable business decisions.",
    href: "https://sensefeedback.com",
    icon: MessageSquare,
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&auto=format&fit=crop&q=80",
    features: [
      {
        name: "Smart Survey Builder",
        description: "Create intelligent surveys that adapt based on responses. Maximize completion rates with conditional logic and smart branching.",
        icon: MessageSquare,
      },
      {
        name: "AI-Powered Analysis",
        description: "Automatically categorize and analyze feedback using advanced AI. Identify trends, sentiment, and actionable insights instantly.",
        icon: Brain,
      },
      {
        name: "Real-time Insights",
        description: "Monitor feedback as it comes in with live dashboards. Track metrics, sentiment scores, and customer satisfaction in real-time.",
        icon: BarChart3,
      },
    ],
  },
  {
    title: "SenseResponse",
    tagline: "Respond faster, connect better",
    description: "Automated response management system that streamlines customer communications across all your channels.",
    href: "https://senseresponse.com",
    icon: Workflow,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
    features: [
      {
        name: "Multi-Channel Support",
        description: "Manage all customer communications from a single dashboard. Email, chat, social media, and more—all in one place.",
        icon: MessageCircle,
      },
      {
        name: "Smart Auto-Response",
        description: "AI-powered automatic responses that sound human. Handle common inquiries instantly while maintaining a personal touch.",
        icon: Zap,
      },
      {
        name: "Analytics Dashboard",
        description: "Track response times, customer satisfaction, and team performance. Make data-driven decisions to improve support quality.",
        icon: Clock,
      },
    ],
  },
];

export default function AppsPage({ params }: AppsPageProps) {
  const { locale } = use(params);

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Our Applications
            </h1>
            <p className="mt-6 text-lg text-slate-400 max-w-2xl mx-auto">
              Professional SaaS tools designed to streamline your business operations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Application Feature Sections */}
      {applications.map((app, appIndex) => (
        <section key={app.title} className="overflow-hidden py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className={`mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 ${appIndex % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
              <div className={`lg:pt-4 ${appIndex % 2 === 1 ? 'lg:pl-8 lg:col-start-2' : 'lg:pr-8'}`}>
                <div className="lg:max-w-lg">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <h2 className="text-base font-semibold text-slate-400">{app.tagline}</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                      {app.title}
                    </p>
                    <p className="mt-6 text-lg leading-8 text-slate-300">
                      {app.description}
                    </p>
                    <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-slate-400 lg:max-w-none">
                      {app.features.map((feature) => (
                        <div key={feature.name} className="relative pl-9">
                          <dt className="inline font-semibold text-white">
                            <feature.icon aria-hidden="true" className="absolute left-1 top-1 h-5 w-5 text-slate-400" />
                            {feature.name}
                          </dt>{' '}
                          <dd className="inline">{feature.description}</dd>
                        </div>
                      ))}
                    </dl>
                    <div className="mt-10">
                      <a
                        href={app.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-900 font-semibold rounded-lg hover:bg-slate-100 transition-all duration-200"
                      >
                        Visit {app.title}
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </div>
                  </motion.div>
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className={`flex items-center ${appIndex % 2 === 1 ? 'lg:col-start-1' : ''}`}
              >
                <img
                  alt={`${app.title} screenshot`}
                  src={app.image}
                  className="w-full max-w-none rounded-xl shadow-2xl ring-1 ring-white/10"
                />
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      {/* Call to Action */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl bg-slate-900/50 backdrop-blur-sm border border-slate-800 p-12"
          >
            <div className="relative z-10 text-center">
              <h2 className="text-2xl font-semibold text-white mb-3">
                Need a Custom Solution?
              </h2>
              <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
                Our agency specializes in building tailored applications for your unique business requirements.
              </p>
              <Link
                href={`/${locale}/agency`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-900 font-semibold rounded-lg hover:bg-slate-100 transition-all duration-200"
              >
                Contact Us
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}