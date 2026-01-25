"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { MapPin, Linkedin, Twitter, Mail, ArrowRight, Calendar } from "lucide-react";
import { useLocale } from "@/lib/i18n/context";
import Image from "next/image";
import ContactModal from "./contact-modal";

export default function AboutChris() {
  const locale = useLocale();
  const [contactModalOpen, setContactModalOpen] = useState(false);

  const content = {
    en: {
      badge: "WHO YOU’LL WORK WITH",
      greeting: "Hi, I'm Chris",
      tagline: "I help teams reclaim 20+ hours/week with smart automation",
      bio: [
        "I’ve been where you are—drowning in repetitive tasks that eat up the day. After automating my own workflows and saving hundreds of hours, I started doing the same for other teams.",
        "Now I help marketing agencies, SaaS companies, and growing businesses turn their biggest time-wasters into hands-off systems.",
        "My style? Hands-on and practical. I don’t just give advice—I build the systems, make sure they work, and stick around to help you get value from them.",
      ],
      location: "Bavaria, Germany",
      cta: "Let's Chat About Your Automation Needs",
      ctaSecondary: "Book a 15-min Call",
      expertise: {
        title: "What I Bring to the Table",
        items: [
          "Deep expertise in n8n and workflow automation",
          "OpenAI/GPT integration & prompt engineering",
          "Full-stack development (Next.js, React, Node.js)",
          "Strategic thinking + hands-on execution",
        ],
      },
      socialProof: "Currently working with agencies and SaaS teams across Europe",
    },
    de: {
      badge: "IHR ANSPRECHPARTNER",
      greeting: "Hi, ich bin Chris",
      tagline: "Ich helfe Teams, 20+ Stunden/Woche zurückzugewinnen",
      bio: [
        "Ich war da, wo Sie jetzt sind—in sich wiederholenden Aufgaben versunken, die den Tag auffressen. Nachdem ich meine eigenen Workflows automatisiert und hunderte Stunden gespart habe, mache ich das Gleiche für andere Teams.",
        "Heute helfe ich Marketing-Agenturen, SaaS-Unternehmen und wachsenden Firmen, ihre größten Zeitfresser in Systeme zu verwandeln, die von selbst laufen.",
        "Mein Stil? Praktisch und hands-on. Ich gebe nicht nur Ratschläge—ich baue die Systeme, stelle sicher, dass sie funktionieren, und bleibe dran, um Ihnen zu helfen, echten Nutzen daraus zu ziehen.",
      ],
      location: "Bayern, Deutschland",
      cta: "Sprechen wir über Ihre Automatisierungsbedürfnisse",
      ctaSecondary: "15-min Gespräch buchen",
      expertise: {
        title: "Meine Expertise",
        items: [
          "Tiefgreifende Expertise in n8n und Workflow-Automatisierung",
          "OpenAI/GPT-Integration & Prompt Engineering",
          "Full-Stack Entwicklung (Next.js, React, Node.js)",
          "Strategisches Denken + praktische Umsetzung",
        ],
      },
      socialProof: "Aktuell arbeite ich mit Agenturen und SaaS-Teams in ganz Europa",
    },
  };

  const t = content[locale as keyof typeof content] || content.en;

  const socialLinks = [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/seventeenlabs-io",
      icon: Linkedin,
    },
    {
      name: "X (Twitter)",
      href: "https://twitter.com/chrislutzxy",
      icon: Twitter,
    },
    {
      name: "Email",
      href: "mailto:chris@seventeenlabs.io",
      icon: Mail,
    },
  ];

  return (
    <section id="about" className="relative bg-black py-24 lg:py-32">
      {/* Section divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent"></div>
      
      {/* Subtle background accent */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -z-10"></div>
      
      <div className="relative w-full px-6 sm:px-12 lg:px-16 xl:px-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start"
          >
            {/* Left side - Photo and quick info */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Badge */}
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-medium uppercase tracking-wider mb-6">
                  {t.badge}
                </span>

                {/* Photo container */}
                <div className="relative mb-6">
                  <div className="relative w-48 h-48 lg:w-56 lg:h-56 rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-blue-500/20 to-orange-500/20">
                    {/* Placeholder for headshot - using gradient background */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-32 h-32 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                        <span className="text-5xl font-light text-white/60">C</span>
                      </div>
                    </div>
                    {/* Uncomment when you have the image:
                    <Image
                      src="/images/chris-headshot.jpg"
                      alt="Chris - Founder of SeventeenLabs"
                      fill
                      className="object-cover"
                    />
                    */}
                  </div>
                  {/* Decorative element */}
                  <div className="absolute -bottom-3 -right-3 w-24 h-24 bg-gradient-to-br from-blue-500/30 to-orange-500/30 rounded-xl blur-xl -z-10"></div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-2 text-white/60 text-sm mb-4">
                  <MapPin className="w-4 h-4" />
                  <span>{t.location}</span>
                </div>

                {/* Social links */}
                <div className="flex items-center gap-3">
                  {socialLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <a
                        key={link.name}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-200"
                        aria-label={link.name}
                      >
                        <Icon className="w-4 h-4" />
                      </a>
                    );
                  })}
                </div>
              </motion.div>
            </div>

            {/* Right side - Bio and expertise */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl lg:text-4xl font-light text-white mb-3 tracking-tight">
                  {t.greeting}
                </h2>
                <p className="text-lg text-blue-400/80 font-medium mb-8">
                  {t.tagline}
                </p>

                {/* Bio paragraphs */}
                <div className="space-y-4 mb-8">
                  {t.bio.map((paragraph, index) => (
                    <p key={index} className="text-white/70 font-light leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Expertise */}
                <div className="mb-8 p-6 rounded-xl bg-white/5 border border-white/10">
                  <h3 className="text-sm font-medium text-white/80 uppercase tracking-wider mb-4">
                    {t.expertise.title}
                  </h3>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {t.expertise.items.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-white/60 text-sm">
                        <span className="text-blue-400 mt-1">→</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Social proof */}
                <p className="text-sm text-white/40 mb-8 italic">
                  {t.socialProof}
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => setContactModalOpen(true)}
                    className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-black font-medium hover:bg-white/90 transition-all duration-300 shadow-lg shadow-white/10"
                  >
                    <Mail className="w-5 h-5" />
                    {t.cta}
                  </button>
                  <a
                    href="https://cal.com/christian-lutz-pw2nn4/15min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-white/20 text-white font-medium hover:bg-white/5 hover:border-white/40 transition-all duration-300"
                  >
                    <Calendar className="w-5 h-5" />
                    {t.ctaSecondary}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Contact Modal */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        prefillMessage="Hi Chris, I'd like to discuss how AI automation could help my business. Let's connect!"
      />
    </section>
  );
}
