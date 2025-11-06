"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Check, Clock, Shield, Zap, BarChart3, Mail, MessageSquare, FileText, TrendingUp, X } from "lucide-react";
import LandingHeader from "@/components/landing-header";
import SiteFooter from "@/components/site-footer";
import ContactModal from "@/components/contact-modal";

interface AiWorkflowAuditClientProps {
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
    description: "We'll map your current process and identify exactly where automation can save the most time and eliminate manual work.",
    icon: BarChart3
  },
  {
    title: "Automation Design",
    description: "We'll design a custom workflow using n8n and OpenAI that integrates seamlessly with your existing tools.",
    icon: Zap
  },
  {
    title: "Complete Build + Training",
    description: "You'll get the full automation built, tested, and ready to use — with a video walkthrough showing you exactly how it works.",
    icon: Check
  }
];

const benefits = [
  "✅ Analysis + Full Build Included",
  "✅ Delivered in 3–5 days",
  "✅ Only 5 spots available"
];

export default function AiWorkflowAuditClient({ locale }: AiWorkflowAuditClientProps) {
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
    <div className="relative min-h-screen">
      <LandingHeader />

      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden bg-black">
        {/* Simple gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/10 via-black to-black" />

        <div className="relative z-10 w-full">
          <div className="flex min-h-screen items-center">
            <div className="px-6 sm:px-12 lg:px-16 xl:px-20 py-32 lg:py-40 w-full">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                {/* Left column - Content */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                >
                  {/* Badge */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-sm mb-8"
                  >
                    <Clock className="w-4 h-4 text-blue-400" />
                    <span className="text-sm text-blue-400 font-light">5 Free Spots Available</span>
                  </motion.div>

                  {/* Title */}
                  <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light text-white tracking-tight mb-6 leading-[1.1]"
                  >
                    We'll Build You a<br />
                    <span className="text-blue-400">Free AI Workflow Automation</span>
                  </motion.h1>

                  {/* Description */}
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    className="text-base sm:text-lg lg:text-xl text-white/60 font-light leading-relaxed mb-10"
                  >
                    Pick one repetitive task that's draining your team's time. We'll analyze it, design a custom automation, and build it for free. 
                    You get a working workflow that runs on autopilot. Only 5 spots available.
                  </motion.p>

                  {/* CTA Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.5 }}
                    className="flex flex-col sm:flex-row gap-4 mb-12"
                  >
                    <button
                      onClick={() => {
                        const form = document.getElementById('audit-form');
                        form?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="group px-8 py-4 text-sm font-medium text-black bg-blue-500 rounded-lg hover:bg-blue-400 transition-all duration-300 shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2"
                    >
                      Claim Your Free Automation
                      <Zap className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button
                      onClick={() => {
                        const examples = document.querySelector('section:nth-of-type(3)');
                        examples?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="group px-8 py-4 text-sm font-light text-white border border-white/30 rounded-lg hover:border-white/60 hover:bg-white/5 transition-all duration-300"
                    >
                      See Examples
                    </button>
                  </motion.div>

                  {/* Trust indicators */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.6 }}
                    className="flex flex-wrap gap-6 text-sm text-white/50"
                  >
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-blue-400" />
                      <span>Analysis + Full Build</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-blue-400" />
                      <span>Delivered in 3–5 days</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-blue-400" />
                      <span>Only 5 spots available</span>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Right column - Visual Element */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="hidden lg:block"
                >
                  <div className="relative">
                    {/* Benefits Cards */}
                    <div className="space-y-4">
                      {[
                        { 
                          icon: BarChart3, 
                          title: "Process Analysis", 
                          description: "We map your workflow step-by-step",
                          delay: 0.6
                        },
                        { 
                          icon: Zap, 
                          title: "Custom Automation", 
                          description: "Built with n8n, OpenAI & your tools",
                          delay: 0.8
                        },
                        { 
                          icon: Check, 
                          title: "Ready to Use", 
                          description: "Delivered working in 3-5 days",
                          delay: 1.0
                        }
                      ].map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: item.delay }}
                          className="p-6 rounded-lg border border-white/10 bg-white/[0.02] backdrop-blur-sm"
                        >
                          <div className="flex items-start gap-4">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20 flex-shrink-0">
                              <item.icon className="w-5 h-5 text-blue-400" />
                            </div>
                            <div>
                              <h3 className="text-sm font-medium text-white mb-1">{item.title}</h3>
                              <p className="text-xs text-white/60 font-light">{item.description}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Stats badge */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 1.2 }}
                      className="absolute -bottom-4 -right-4 p-4 rounded-lg border border-blue-500/20 bg-blue-500/10 backdrop-blur-sm"
                    >
                      <div className="text-center">
                        <div className="text-xl font-light text-white">5</div>
                        <div className="text-xs text-blue-400">Spots Left</div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="relative bg-black py-20 lg:py-32">
        <div className="w-full px-6 sm:px-12 lg:px-16 xl:px-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight mb-6">
              What You Get (100% Free)
            </h2>
            <p className="text-lg text-white/60 font-light leading-relaxed max-w-3xl">
              A complete, working automation built specifically for your agency — no cost, no strings attached.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {included.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
                  <item.icon className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-light text-white mb-2">{item.title}</h3>
                <p className="text-white/60 font-light leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Example Use Cases */}
      <section className="relative bg-black py-20 lg:py-32">
        <div className="w-full px-6 sm:px-12 lg:px-16 xl:px-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight mb-6">
              Example Workflows
            </h2>
            <p className="text-lg text-white/60 font-light leading-relaxed max-w-3xl">
              Each automation is custom-built with n8n, OpenAI, and integrates with your existing tools.
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
                className="p-6 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
                  <useCase.icon className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-light text-white mb-2">{useCase.title}</h3>
                <p className="text-white/60 font-light leading-relaxed">{useCase.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="audit-form" className="relative bg-black py-20 lg:py-32">
        <div className="w-full px-6 sm:px-12 lg:px-16 xl:px-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight mb-6">
              Apply for Your Free Automation
            </h2>
            <p className="text-lg text-white/60 font-light leading-relaxed">
              Tell us about your agency and the workflow you want automated. We'll review all applications and select five agencies to work with.
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="max-w-3xl p-6 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm"
          >
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-light text-white/80 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-blue-500/50 transition-all font-light"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="agencyName" className="block text-sm font-light text-white/80 mb-2">
                  Agency Name *
                </label>
                <input
                  type="text"
                  id="agencyName"
                  name="agencyName"
                  required
                  value={formData.agencyName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-blue-500/50 transition-all font-light"
                  placeholder="Your agency name"
                />
              </div>

              <div>
                <label htmlFor="website" className="block text-sm font-light text-white/80 mb-2">
                  Website *
                </label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  required
                  value={formData.website}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-blue-500/50 transition-all font-light"
                  placeholder="https://youragency.com"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-light text-white/80 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-blue-500/50 transition-all font-light"
                  placeholder="you@agency.com"
                />
              </div>

              <div>
                <label htmlFor="timeConsumingProcess" className="block text-sm font-light text-white/80 mb-2">
                  What's the most time-consuming process in your agency? *
                </label>
                <textarea
                  id="timeConsumingProcess"
                  name="timeConsumingProcess"
                  required
                  rows={4}
                  value={formData.timeConsumingProcess}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-blue-500/50 resize-none transition-all font-light"
                  placeholder="Describe the process that takes up most of your team's time..."
                />
              </div>

              <div>
                <label htmlFor="currentTools" className="block text-sm font-light text-white/80 mb-2">
                  What tools do you currently use (CRM, Ads, Content)? *
                </label>
                <textarea
                  id="currentTools"
                  name="currentTools"
                  required
                  rows={3}
                  value={formData.currentTools}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-blue-500/50 resize-none transition-all font-light"
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
                  className="mt-1 w-4 h-4 bg-black/50 border border-white/20 rounded text-blue-500 focus:ring-2 focus:ring-blue-500/50"
                />
                <label htmlFor="gdprConsent" className="text-sm text-white/60 font-light">
                  I agree to be contacted regarding my application *
                </label>
              </div>

              <button
                type="submit"
                className="w-full px-8 py-4 text-sm font-medium text-black bg-blue-500 rounded-lg hover:bg-blue-400 transition-all duration-300 shadow-lg shadow-blue-500/25"
              >
                Submit Application
              </button>

              <p className="text-xs text-white/40 text-center font-light">
                By submitting this form, you agree to our privacy policy and terms of service.
              </p>
            </div>
          </motion.form>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative bg-black py-20 lg:py-32">
        <div className="w-full px-6 sm:px-12 lg:px-16 xl:px-20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 mb-8">
                <Clock className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-blue-400 font-light">Limited to 5 Agencies</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight mb-4">
                Don't Miss Your Free Automation
              </h2>
              <p className="text-lg text-white/60 font-light leading-relaxed mb-10 max-w-2xl mx-auto">
                We'll analyze, design, and build one complete workflow automation for your agency — absolutely free. Only 5 spots available.
              </p>
              <button
                onClick={() => {
                  const form = document.getElementById('audit-form');
                  form?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group px-8 py-4 font-medium text-black bg-blue-500 rounded-lg hover:bg-blue-400 transition-all duration-300 shadow-lg shadow-blue-500/25 inline-flex items-center justify-center gap-2"
              >
                Apply Now
                <Zap className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      <SiteFooter />
      <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
