"use client";

import { motion } from "framer-motion";
import { Check, Star, AlertCircle } from "lucide-react";
import { useState } from "react";

interface PricingSectionProps {
  locale: string;
  onCtaClick: (plan: string) => void;
}

export default function AIAgentsPricing({ locale, onCtaClick }: PricingSectionProps) {
  const isGerman = locale === "de";
  const [blogPostsPerMonth, setBlogPostsPerMonth] = useState(4);

  const pricingPlans = isGerman ? [
    {
      name: "Starter",
      price: "€1.500",
      period: "/Monat",
      description: "Ideal zum Starten",
      features: [
        "Ein Agent (Vision ODER Loki)",
        "1 Projekt pro Woche",
        "48-Stunden-Bearbeitung",
        "E-Mail-Support",
        "Grundlegende Analysen"
      ],
      cta: "Jetzt starten",
      highlighted: false
    },
    {
      name: "Professional",
      price: "€3.500",
      period: "/Monat",
      description: "Für wachsende Agenturen",
      features: [
        "Alle 3 Agenten (Vision + Loki + Quill)",
        "Unbegrenzte Projekte",
        "24-48 Stunden Bearbeitung",
        "Slack-Support + wöchentliche Checks",
        "Priorisierte Verarbeitung",
        "Analytics Dashboard"
      ],
      cta: "Diese wählen",
      highlighted: true,
      badge: "BELIEBTESTE"
    },
    {
      name: "Enterprise",
      price: "€5.500",
      period: "/Monat",
      description: "Für Agenturen im Maßstab",
      features: [
        "Alle 4 Agenten (+ Fury - Recherche)",
        "Unbegrenzte Projekte",
        "24-Stunden-Bearbeitung",
        "Slack + zweiwöchentliche Strategie-Calls",
        "Maßgeschneiderte Agent-Schulung",
        "Dedicated Slack Channel"
      ],
      cta: "Kontaktieren Sie uns",
      highlighted: false
    }
  ] : [
    {
      name: "Starter",
      price: "€1.500",
      period: "/month",
      description: "Perfect for getting started",
      features: [
        "One agent (Vision OR Loki)",
        "1 project per week",
        "48-hour turnaround",
        "Email support",
        "Basic analytics"
      ],
      cta: "Get Started",
      highlighted: false
    },
    {
      name: "Professional",
      price: "€3.500",
      period: "/month",
      description: "For growing agencies",
      features: [
        "All 3 agents (Vision + Loki + Quill)",
        "Unlimited projects",
        "24-48 hour turnaround",
        "Slack support + weekly check-in",
        "Priority processing",
        "Analytics dashboard"
      ],
      cta: "Choose This",
      highlighted: true,
      badge: "MOST POPULAR"
    },
    {
      name: "Enterprise",
      price: "€5.500",
      period: "/month",
      description: "For agencies at scale",
      features: [
        "All 4 agents (+ Fury - Researcher)",
        "Unlimited projects",
        "24-hour turnaround",
        "Slack + bi-weekly strategy calls",
        "Custom agent training",
        "Dedicated Slack channel"
      ],
      cta: "Contact Us",
      highlighted: false
    }
  ];

  // ROI Calculator
  const costWithFreelancer = blogPostsPerMonth * 1500; // €1500 per blog post
  const costWithUs = 3500; // Professional plan
  const savings = costWithFreelancer - costWithUs;
  const hoursPerMonth = blogPostsPerMonth * 5; // ~5 hours per blog post
  const hoursSavedPerMonth = hoursPerMonth * 0.7; // 70% of hours saved with AI

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Pricing intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {isGerman ? "Transparente Preise, keine versteckten Gebühren" : "Transparent Pricing, No Surprises"}
          </h2>
          <p className="text-xl text-gray-600">
            {isGerman 
              ? "Alle Pläne beinhalten Überarbeitungen und Support. 30-Tage-Kündigungsrichtlinie." 
              : "All plans include revisions and support. 30-day cancellation clause."}
          </p>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`rounded-lg overflow-hidden transition-all duration-300 ${
                plan.highlighted
                  ? "ring-2 ring-blue-600 shadow-xl scale-105"
                  : "border border-gray-200 hover:border-gray-300"
              }`}
            >
              {plan.badge && (
                <div className="bg-blue-600 text-white text-center py-2 text-sm font-bold">
                  {plan.badge}
                </div>
              )}

              <div className={`p-8 ${plan.highlighted ? "bg-blue-50" : "bg-white"}`}>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-6 text-sm">{plan.description}</p>

                <div className="mb-8">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600 ml-2">{plan.period}</span>
                </div>

                <button
                  onClick={() => onCtaClick(plan.name)}
                  className={`w-full py-3 px-4 rounded-lg font-semibold mb-8 transition-all duration-200 ${
                    plan.highlighted
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "border-2 border-gray-300 text-gray-900 hover:border-gray-400"
                  }`}
                >
                  {plan.cta}
                </button>

                <div className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ROI Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-lg p-12"
        >
          <h3 className="text-3xl font-bold mb-8 text-center">
            {isGerman ? "ROI-Rechner" : "ROI Calculator"}
          </h3>

          <div className="max-w-2xl mx-auto">
            {/* Input slider */}
            <div className="mb-8">
              <label className="block text-lg font-semibold mb-4">
                {isGerman 
                  ? `Wie viele Blog-Beiträge benötigen Sie pro Monat? (${blogPostsPerMonth})` 
                  : `How many blog posts do you need per month? (${blogPostsPerMonth})`}
              </label>
              <input
                type="range"
                min="1"
                max="12"
                value={blogPostsPerMonth}
                onChange={(e) => setBlogPostsPerMonth(parseInt(e.target.value))}
                className="w-full h-2 bg-blue-400 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-sm text-blue-100 mt-2">
                <span>1</span>
                <span>12</span>
              </div>
            </div>

            {/* Results */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur">
                <p className="text-blue-100 text-sm mb-2">
                  {isGerman ? "Mit Freelancern:" : "With Freelancers:"}
                </p>
                <p className="text-3xl font-bold">€{costWithFreelancer.toLocaleString()}</p>
                <p className="text-blue-100 text-xs mt-2">
                  {isGerman ? `${blogPostsPerMonth} Posts × €1.500` : `${blogPostsPerMonth} posts × €1.500`}
                </p>
              </div>

              <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur">
                <p className="text-blue-100 text-sm mb-2">
                  {isGerman ? "Mit uns (Professional):" : "With Us (Professional):"}
                </p>
                <p className="text-3xl font-bold">€3.500</p>
                <p className="text-blue-100 text-xs mt-2">
                  {isGerman ? "Unbegrenzte Projekte" : "Unlimited projects"}
                </p>
              </div>

              <div className="bg-green-500 bg-opacity-20 rounded-lg p-6 backdrop-blur border border-green-300">
                <p className="text-green-100 text-sm mb-2">
                  {isGerman ? "Sie sparen:" : "You Save:"}
                </p>
                <p className="text-3xl font-bold">€{savings.toLocaleString()}</p>
                <p className="text-green-100 text-xs mt-2">
                  {isGerman ? `+ ${Math.round(hoursSavedPerMonth)} Stunden/Monat` : `+ ${Math.round(hoursSavedPerMonth)} hours/month`}
                </p>
              </div>
            </div>

            {/* Note */}
            <div className="mt-8 flex gap-3 bg-white bg-opacity-10 rounded-lg p-4">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-100">
                {isGerman 
                  ? "Die Freelancer-Kosten basieren auf durchschnittlichen Preisen für hochwertige Blog-Beiträge. Ihr tatsächliches Sparpotenzial kann höher sein." 
                  : "Freelancer costs based on average high-quality blog post pricing. Your actual savings may be higher."}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
