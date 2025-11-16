"use client";

import { motion } from "framer-motion";
import { useTranslations } from "@/lib/i18n/context";
import { FileText, Map, Zap, LineChart } from "lucide-react";

export default function AIAppointmentEngineDeliverables() {
  const { t } = useTranslations();

  const features = [
    {
      icon: Zap,
      title: "Lightning Response Module",
      description: "Captures and responds to every lead in under 3 minutes, ensuring you never lose another opportunity to slow follow-up.",
    },
    {
      icon: Map,
      title: "Smart Nurturing Engine",
      description: "Runs 7-touch follow-up sequences across 5 channels, eliminating 13+ hours of manual nurturing work weekly.",
    },
    {
      icon: LineChart,
      title: "Qualification Intelligence System",
      description: "Filters out unqualified leads automatically, so you only spend time with prospects worth $5k+ in potential revenue.",
    },
    {
      icon: FileText,
      title: "Calendar Automation Hub",
      description: "Books qualified prospects directly into your calendar while handling reminders, rescheduling, and no-show recovery.",
    },
  ];

  return (
    <section className="relative py-24 sm:py-32 bg-zinc-950">
      <div className="relative z-10 w-full px-6 sm:px-12 lg:px-16 xl:px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl"
        >
          <span className="text-sm font-light text-white/60 tracking-wider uppercase mb-4 block">
            What's Included
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight mb-6">
            Inside the AI Appointment Engine™ <strong className="font-semibold text-blue-400">System</strong>
          </h2>
          <p className="text-lg text-white/60 font-light leading-relaxed max-w-3xl mb-8">
            Four core components that work together to deliver 11+ qualified appointments while eliminating 17 hours of manual work per week.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="p-6 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm"
                >
                  <Icon className="w-8 h-8 text-blue-400 mb-4" />
                  <h3 className="text-xl font-light text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-white/60 font-light text-sm leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
