"use client";

import { motion } from "framer-motion";
import { useTranslations } from "@/lib/i18n/context";
import { Calendar, Users, FileSearch, Presentation } from "lucide-react";

export default function AIAppointmentEngineProcess() {
  const { t } = useTranslations();

  const steps = [
    {
      number: "01",
      icon: Calendar,
      title: "AI System Deployment",
      description: "We build and deploy your AI Appointment Engine™ to capture every lead instantly across all channels, so you never miss another opportunity again.",
      duration: "Week 1",
    },
    {
      number: "02",
      icon: FileSearch,
      title: "Smart Qualification & Nurturing",
      description: "The system qualifies leads automatically and nurtures them with personalized follow-ups, eliminating 15+ hours of manual work per week.",
      duration: "Weeks 2-4",
    },
    {
      number: "03",
      icon: Users,
      title: "Appointments Delivered",
      description: "Qualified prospects book directly into your calendar while unqualified leads are filtered out, giving you 11+ high-value appointments in 3 months.",
      duration: "Months 1-3",
    },
  ];

  return (
    <section className="relative bg-black py-20 lg:py-32 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, rgb(59 130 246 / 0.1) 1px, transparent 1px),
                           linear-gradient(to bottom, rgb(59 130 246 / 0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.1 }}
        transition={{ duration: 2 }}
        viewport={{ once: true }}
        className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px]"
      />

      <div className="relative z-10 w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight mb-6">
            How We <strong className="font-semibold text-blue-400">Deliver Results</strong>
          </h2>
          <p className="text-lg text-white/60 font-light leading-relaxed max-w-3xl">
            From setup to appointments in your calendar — here's our proven 3-step process.
          </p>
        </motion.div>

        <div className="space-y-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row gap-6 p-6 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm hover:border-blue-500/30 transition-colors"
              >
                <div className="flex-shrink-0">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/20">
                    <Icon className="w-8 h-8 text-blue-400" />
                  </div>
                </div>
                
                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl font-light text-blue-400">{step.number}</span>
                    <h3 className="text-xl font-light text-white">{step.title}</h3>
                  </div>
                  <p className="text-white/60 font-light leading-relaxed mb-2">
                    {step.description}
                  </p>
                  <span className="text-sm text-blue-400/80 font-light">
                    {step.duration}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
