"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Check, Clock, Shield, Zap, BarChart3, Mail, MessageSquare, FileText, TrendingUp, X } from "lucide-react";
import LandingHeader from "@/components/landing-header";
import SiteFooter from "@/components/site-footer";
import ContactModal from "@/components/contact-modal";

interface ProductsPageClientProps {
  locale: string;
}

const useCases = [
  {
    icon: FileText,
    title: "Automated Weekly Client Reports",
    description: "Generate and send comprehensive reports automatically"
  },
  {
    icon: Mail,
    title: "Instant Lead Follow-ups",
    description: "Automatic email or WhatsApp responses to new leads"
  },
  {
    icon: Zap,
    title: "GPT-Generated Ad Copy",
    description: "AI-powered campaign content creation"
  },
  {
    icon: BarChart3,
    title: "Automatic CRM Updates",
    description: "Keep your CRM synchronized without manual entry"
  },
  {
    icon: MessageSquare,
    title: "Slack Notifications",
    description: "Real-time alerts for new leads and opportunities"
  },
  {
    icon: TrendingUp,
    title: "Performance Dashboards",
    description: "Live metrics and KPI tracking"
  }
];

const included = [
  {
    title: "Workflow Analysis",
    description: "We'll map your current marketing operations and spot where automation saves the most time.",
    icon: BarChart3
  },
  {
    title: "Automation Design",
    description: "We outline how tools like n8n and OpenAI can handle repetitive work in your current stack.",
    icon: Zap
  },
  {
    title: "Full Implementation",
    description: "You'll get one real automation built and tested for your agency — with a Loom walkthrough.",
    icon: Check
  }
];

const benefits = [
  "✅ Delivered in 3–5 days",
  "✅ 100% free (5 spots only)",
  "✅ GDPR-compliant, built on EU servers"
];

export default function ProductsPageClient({ locale }: ProductsPageClientProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    agencyName: "",
    website: "",
    email: "",
    timeConsumingProcess: "",
    currentTools: "",
    gdprConsent: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
    setModalOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <LandingHeader />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-transparent" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6">
              <Clock className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-blue-300 font-medium">5 Free Spots Available</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-white mb-6 leading-tight">
              Free AI Workflow Audit<br />
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                for Marketing Agencies
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/60 mb-8 max-w-3xl mx-auto font-light">
              Get one workflow analyzed and automated — free (5 spots available)
            </p>

            <p className="text-base text-white/50 mb-10 max-w-2xl mx-auto">
              Understand where AI can create real efficiency in your agency — not hype, but working automation.
            </p>

            <button
              onClick={() => {
                const form = document.getElementById('audit-form');
                form?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 rounded-lg font-semibold hover:bg-slate-100 transition-all duration-200 shadow-lg shadow-white/10"
            >
              Apply for Free Audit
              <Zap className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Banner */}
      <section className="py-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-light text-white">
              We help marketing agencies work smarter with AI automation
            </h2>
            <div className="h-8 w-px bg-white/20 hidden md:block" />
            <p className="text-lg text-white/60">
              Now offering 5 free AI workflow audits + implementations
            </p>
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
              What's Included in the Free AI Workflow Audit
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {included.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center mb-6">
                  <item.icon className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{item.title}</h3>
                <p className="text-white/60 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center py-4 px-6 bg-green-500/10 border border-green-500/20 rounded-lg"
              >
                <p className="text-green-300 font-medium">{benefit}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why We're Doing This */}
      <section className="py-24 px-6 bg-white/5 border-y border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-light text-white mb-8">
              Why We're Doing This
            </h2>
            <p className="text-xl text-white/70 leading-relaxed mb-6">
              At SeventeenLabs, we build AI-driven systems for marketing agencies.
            </p>
            <p className="text-lg text-white/60 leading-relaxed mb-8">
              These five free projects help us showcase what's possible — and demonstrate how automation 
              can reduce repetitive work by 30–50%.
            </p>
            <p className="text-base text-white/50 italic">
              Each project becomes a real case study we can share (with your permission).
            </p>

            <button
              onClick={() => {
                const form = document.getElementById('audit-form');
                form?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="mt-10 inline-flex items-center gap-2 px-8 py-4 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-all duration-200"
            >
              Apply for Free Audit
            </button>
          </motion.div>
        </div>
      </section>

      {/* Example Use Cases */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
              Example Use Cases
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Each workflow is built with n8n, OpenAI, and other no-code tools — fully hosted in the EU.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className="w-10 h-10 bg-purple-500/10 border border-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                  <useCase.icon className="w-5 h-5 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{useCase.title}</h3>
                <p className="text-white/60 text-sm">{useCase.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="audit-form" className="py-24 px-6 bg-gradient-to-b from-transparent to-blue-500/5">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
              Apply for a Free AI Workflow Audit
            </h2>
            <p className="text-lg text-white/60">
              Tell us a bit about your agency so we can understand your workflow.<br />
              We'll review your answers and select five agencies for the program.
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12 backdrop-blur-sm"
          >
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="agencyName" className="block text-sm font-medium text-white/80 mb-2">
                  Agency Name *
                </label>
                <input
                  type="text"
                  id="agencyName"
                  name="agencyName"
                  required
                  value={formData.agencyName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  placeholder="Your agency name"
                />
              </div>

              <div>
                <label htmlFor="website" className="block text-sm font-medium text-white/80 mb-2">
                  Website *
                </label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  required
                  value={formData.website}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  placeholder="https://youragency.com"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  placeholder="you@agency.com"
                />
              </div>

              <div>
                <label htmlFor="timeConsumingProcess" className="block text-sm font-medium text-white/80 mb-2">
                  What's the most time-consuming process in your agency? *
                </label>
                <textarea
                  id="timeConsumingProcess"
                  name="timeConsumingProcess"
                  required
                  rows={4}
                  value={formData.timeConsumingProcess}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
                  placeholder="Describe the process that takes up most of your team's time..."
                />
              </div>

              <div>
                <label htmlFor="currentTools" className="block text-sm font-medium text-white/80 mb-2">
                  What tools do you currently use (CRM, Ads, Content)? *
                </label>
                <textarea
                  id="currentTools"
                  name="currentTools"
                  required
                  rows={3}
                  value={formData.currentTools}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
                  placeholder="e.g., HubSpot, Google Ads, Canva, Slack..."
                />
              </div>

              <div className="flex items-start gap-3 pt-4">
                <input
                  type="checkbox"
                  id="gdprConsent"
                  name="gdprConsent"
                  required
                  checked={formData.gdprConsent}
                  onChange={handleChange}
                  className="mt-1 w-4 h-4 bg-white/5 border border-white/20 rounded text-blue-500 focus:ring-2 focus:ring-blue-500/50"
                />
                <label htmlFor="gdprConsent" className="text-sm text-white/70">
                  I agree to be contacted regarding my audit (GDPR) *
                </label>
              </div>

              <button
                type="submit"
                className="w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-lg shadow-blue-500/20"
              >
                Submit Application
              </button>

              <p className="text-xs text-white/40 text-center">
                By submitting this form, you agree to our privacy policy and terms of service.
              </p>
            </div>
          </motion.form>
        </div>
      </section>

      {/* Social Proof / Authority */}
      <section className="py-16 px-6 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-full">
            <Shield className="w-5 h-5 text-green-400" />
            <p className="text-white/70">
              We're currently building automation systems for early agency partners.
            </p>
          </div>
          <p className="text-white/50 mt-4">
            Want to be one of the first? Apply above.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 bg-gradient-to-t from-blue-500/10 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full mb-6">
              <Clock className="w-4 h-4 text-red-400" />
              <span className="text-sm text-red-300 font-medium">Limited to 5 Agencies</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
              5 Free AI Workflow Audits Available
            </h2>
            <p className="text-xl text-white/60 mb-10">
              Discover how much time your agency could save with the right automation.
            </p>
            <button
              onClick={() => {
                const form = document.getElementById('audit-form');
                form?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 rounded-lg font-semibold hover:bg-slate-100 transition-all duration-200 shadow-lg shadow-white/10"
            >
              Apply Now
              <Zap className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>

      <SiteFooter />
      <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
