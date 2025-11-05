"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MessageSquare, Workflow, ArrowRight, BarChart3, Zap, Brain, MessageCircle, Clock } from "lucide-react";
import Script from "next/script";
import { getLocalizedPath } from "@/lib/i18n/utils";
import { getLocaleFromString } from "@/lib/i18n/config";

interface AppsPageClientProps {
  locale: string;
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

export default function AppsPageClient({ locale }: AppsPageClientProps) {
  const normalizedLocale = getLocaleFromString(locale);
  const isGerman = normalizedLocale === "de";
  const heroContent = isGerman
    ? {
        eyebrow: "KI-gestützte Tools",
        title: "Kundenwissen & Automatisierung für moderne Agenturen",
        description:
          "Entdecken Sie die Produkt-Suite von SeventeenLabs: Feedback erfassen, Antworten automatisieren und mit Echtzeit-Dashboards stets den Überblick behalten.",
        ctaHeading: "Benötigen Sie eine individuelle Lösung?",
        ctaCopy:
          "Unsere Agentur entwickelt maßgeschneiderte Anwendungen, die exakt zu Ihren Geschäftsanforderungen passen.",
        ctaLabel: "Kontakt aufnehmen",
      }
    : {
        eyebrow: "AI-Powered Tools",
        title: "Customer Intelligence & Automation Apps for Modern Agencies",
        description:
          "Discover the SeventeenLabs product suite built to capture actionable feedback, automate responses, and give your team real-time visibility from a single dashboard.",
        ctaHeading: "Need a Custom Solution?",
        ctaCopy:
          "Our agency specializes in building tailored applications designed around your unique business requirements.",
        ctaLabel: "Contact Us",
      };

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://seventeenlabs.io";
  const productSchemas = applications.map((app) => ({
    "@context": "https://schema.org",
    "@type": "Product",
    name: app.title,
    description: app.description,
    brand: {
      "@type": "Brand",
      name: "SeventeenLabs",
    },
    url: app.href,
    image: app.image,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/PreOrder",
      seller: {
        "@type": "Organization",
        name: "SeventeenLabs",
        url: baseUrl,
      },
    },
  }));

  return (
    <div className="min-h-screen bg-slate-950">
      <Script
        id="apps-product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchemas) }}
      />

      <section className="py-24 sm:py-28">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-white/50 mb-4">
            {heroContent.eyebrow}
          </p>
          <h1 className="text-4xl sm:text-5xl font-light text-white tracking-tight">
            {heroContent.title}
          </h1>
          <p className="mt-6 text-lg text-white/60">
            {heroContent.description}
          </p>
        </div>
      </section>

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
                    <p className="text-base font-semibold text-slate-400 uppercase tracking-wider">
                      {app.tagline}
                    </p>
                    <h2 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight text-white">
                      {app.title}
                    </h2>
                    <p className="mt-6 text-lg leading-8 text-slate-300">
                      {app.description}
                    </p>
                    <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-slate-400 lg:max-w-none">
                      {app.features.map((feature) => (
                        <div key={feature.name} className="relative pl-9">
                          <dt className="inline font-semibold text-white">
                            <feature.icon aria-hidden="true" className="absolute left-1 top-1 h-5 w-5 text-slate-400" />
                            {feature.name}
                          </dt>{" "}
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

      <section className="border-t border-white/10 py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-semibold text-white tracking-tight">
            {heroContent.ctaHeading}
          </h2>
          <p className="mt-4 text-lg text-white/60">
            {heroContent.ctaCopy}
          </p>
          <Link
            href={getLocalizedPath(normalizedLocale, "/agency")}
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-100"
          >
            {heroContent.ctaLabel}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
