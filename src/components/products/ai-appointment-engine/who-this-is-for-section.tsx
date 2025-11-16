"use client";

import { motion } from "framer-motion";
import { Users, Briefcase, TrendingUp, Target, Zap, MessageCircle, Calendar, BarChart3 } from "lucide-react";

export default function WhoThisIsForSection() {
  const targets = [
    { 
      icon: Briefcase, 
      title: "Digital Marketing Agencies",
      description: "Book 13+ qualified client discovery calls monthly while saving 17 hours on manual follow-up work"
    },
    { 
      icon: Users, 
      title: "B2B Consultants & Coaches",
      description: "Fill your calendar with 11+ high-value prospects worth $5k+ each without chasing leads manually"
    },
    { 
      icon: TrendingUp, 
      title: "Professional Service Firms",
      description: "Convert 37% more website inquiries into confirmed consultations while eliminating admin work"
    },
    { 
      icon: Calendar, 
      title: "SaaS Sales Teams",
      description: "Generate 15+ qualified demo bookings monthly with zero manual lead nurturing or follow-up"
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
          className="max-w-4xl mb-16"
        >
          <span className="text-sm font-light text-white/60 tracking-wider uppercase mb-4 block">
            Perfect For
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight mb-6">
            Perfect for <strong className="font-semibold text-blue-400">B2B Service Providers</strong>
          </h2>
          <p className="text-lg text-white/60 font-light leading-relaxed max-w-3xl">
            The AI Appointment Engine™ is specifically designed for service-based businesses generating 20+ leads monthly but struggling to convert them into booked appointments.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {targets.map((target, index) => {
            const Icon = target.icon;
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
                  {target.title}
                </h3>
                <p className="text-white/60 font-light text-sm leading-relaxed">
                  {target.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}