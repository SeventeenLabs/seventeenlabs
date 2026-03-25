"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock, Zap, Calendar, MessageSquare, Target } from "lucide-react";

export default function FreeOfferSection() {
  const freeFeatures = [
    {
      icon: Zap,
      title: "Full AI Appointment Engine™ Setup",
      description: "Complete 4-module system connected to your CRM, calendar, and communication channels in 48 hours"
    },
    {
      icon: MessageSquare,
      title: "Lightning Response Module Active",
      description: "Watch AI respond to your real leads in under 3 minutes across all 5 communication channels"
    },
    {
      icon: Calendar,
      title: "Smart Booking System Live",
      description: "See qualified prospects book directly into your calendar while unqualified leads get filtered out automatically"
    },
    {
      icon: Target,
      title: "7-Day Performance Preview",
      description: "Track real appointments booked and hours saved during your risk-free trial period"
    },
  ];

  return (
    <section className="relative py-24 sm:py-32 bg-zinc-950">
      <div className="relative z-10 w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mb-16"
        >
          <span className="text-sm font-light text-white/60 tracking-wider uppercase mb-4 block">
            Risk-Free Trial
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight mb-6">
            Experience the AI Appointment Engine™ <strong className="font-semibold text-blue-400">Risk-Free</strong>
          </h2>
          <p className="text-lg text-white/60 font-light leading-relaxed max-w-3xl">
            We'll build your complete system in 48 hours and let you test it with your real leads. See the appointments start booking before you invest a single dollar.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {freeFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-blue-500/30 hover:bg-blue-500/5 transition-all duration-300 hover:scale-105"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4 group-hover:bg-blue-500/20 group-hover:border-blue-500/40 transition-all duration-300">
                  <Icon className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-light text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-white/60 font-light text-sm leading-relaxed group-hover:text-white/80 transition-colors duration-300">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="max-w-4xl"
        >
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button className="group px-8 py-3.5 text-sm font-medium text-black bg-blue-500 rounded-lg hover:bg-blue-400 transition-all duration-300 flex items-center gap-2">
              Get Your Free Build
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="p-6 rounded-xl border border-blue-500/30 bg-gradient-to-r from-blue-500/10 to-blue-600/5 backdrop-blur-sm shadow-lg shadow-blue-500/10"
          >
            <p className="text-sm text-white/80 font-light">
              <strong className="text-white font-medium">Why offer this risk-free trial?</strong> Because the AI Appointment Engine™ is the only system that guarantees results. 87% of our trial users book their first 3 appointments within 9 days.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}