"use client";

import { motion } from "framer-motion";
import { MapPin, Linkedin, Mail, ArrowRight } from "lucide-react";
import { useLocale } from "@/lib/i18n/context";
import Image from "next/image";

export default function AboutChris() {
  const locale = useLocale();

  const content = {
    en: {
      title: "A quick note from me",
      name: "Christian Lutz",
      intro: "I build automation systems for B2B teams.",
      story: "I got tired of watching smart people waste hours on work that machines should do. So I started fixing that.",
      approach: "No fancy agency overhead. Just one person who knows the tools, builds fast, and actually answers when you have questions.",
      cta: "If you're drowning in repetitive work, let's talk.",
      location: "Bavaria, Germany",
      button: "Book a Call",
    },
    de: {
      title: "Kurz zu mir",
      name: "Christian Lutz",
      intro: "Ich baue Automatisierungssysteme für B2B-Teams.",
      story: "Es hat mich genervt zu sehen, wie kluge Leute Stunden mit Arbeit verschwenden, die Maschinen erledigen sollten. Also habe ich angefangen, das zu ändern.",
      approach: "Kein Agentur-Overhead. Nur eine Person, die die Tools kennt, schnell baut und tatsächlich antwortet, wenn Sie Fragen haben.",
      cta: "Wenn Sie in Routinearbeit ertrinken, lassen Sie uns reden.",
      location: "Bayern, Deutschland",
      button: "Gespräch buchen",
    },
  };

  const t = content[locale as keyof typeof content] || content.en;

  return (
    <section id="about" className="relative bg-black pt-10 pb-16 lg:pb-20 border-t border-white/5">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Photo */}
          <div className="mb-8 flex justify-center">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/10">
              <Image
                src="/images/chris.jpg"
                alt="Christian Lutz"
                width={96}
                height={96}
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-sm uppercase tracking-wider text-white/40 mb-2">
            {t.title}
          </h2>
          
          {/* Name */}
          <h3 className="text-xl font-medium text-white mb-6">
            {t.name}
          </h3>

          {/* Content - clean and direct */}
          <div className="space-y-6 mb-10">
            <p className="text-2xl lg:text-3xl font-light text-white leading-relaxed">
              {t.intro}
            </p>
            <p className="text-lg text-white/60 font-light leading-relaxed">
              {t.story}
            </p>
            <p className="text-lg text-white/60 font-light leading-relaxed">
              {t.approach}
            </p>
            <p className="text-lg text-white/80 font-light leading-relaxed">
              {t.cta}
            </p>
          </div>

          {/* Location + Socials */}
          <div className="flex items-center justify-center gap-6 mb-10 text-white/40 text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{t.location}</span>
            </div>
            <a
              href="https://www.linkedin.com/in/christian17labs/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-white/60 transition-colors"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
            <a
              href="mailto:chris@seventeenlabs.io"
              className="flex items-center gap-2 hover:text-white/60 transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>Email</span>
            </a>
          </div>

          {/* Single CTA */}
          <a
            href="https://cal.com/christian-lutz-pw2nn4/15min"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-medium hover:bg-white/90 transition-all duration-300"
          >
            {t.button}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
