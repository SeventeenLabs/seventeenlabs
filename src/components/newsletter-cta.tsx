"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, MessageCircle, Calendar } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ctaOptions = [
  {
    icon: Mail,
    title: "Get Weekly Tips",
    description: "AI & automation insights delivered to your inbox",
    action: "email",
  },
  {
    icon: MessageCircle,
    title: "Join Our Community",
    description: "Connect with other small business owners",
    action: "discord",
  },
  {
    icon: Calendar,
    title: "Book a Free Call",
    description: "Get personalized automation recommendations",
    action: "call",
  },
];

export default function NewsletterCta() {
  return (
    <section className="bg-slate-950 px-6 py-24 relative">
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-px h-12 bg-gradient-to-b from-slate-700 to-transparent"></div>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-px h-12 bg-gradient-to-t from-slate-700 to-transparent"></div>
      
      <div className="mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            Ready to Transform Your Business?
          </h2>
          <p className="mt-4 text-xl text-slate-300 max-w-3xl mx-auto">
            Start your journey toward smarter automation and AI-powered growth with our tools and workflows.
          </p>
        </motion.div>

        {/* Main CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="mb-12 mx-auto max-w-2xl rounded-2xl border border-slate-800 bg-slate-900/50 p-8 text-center backdrop-blur sm:p-12"
        >
          <h3 className="text-2xl font-bold text-white mb-4">
            Start with Free Resources
          </h3>
          <p className="text-slate-300 mb-8">
            Get weekly automation tips, workflow templates, and AI tools recommendations delivered to your inbox.
          </p>
          
          <form className="flex flex-col gap-4 sm:flex-row sm:justify-center mb-6">
            <Input
              type="email"
              required
              placeholder="your@business-email.com"
              aria-label="Email address"
              className="sm:w-80 bg-slate-800 border-slate-700 text-white placeholder:text-slate-400 focus:border-blue-500"
            />
            <Button type="submit" size="lg" className="bg-slate-800 hover:bg-slate-700 border border-slate-600 sm:px-8">
              Get Free Tips
            </Button>
          </form>
          
          <p className="text-sm text-slate-400">
            No spam, unsubscribe anytime. Be among the first to get our latest resources.
          </p>
        </motion.div>

        {/* Alternative CTAs */}
        <div className="grid gap-6 md:grid-cols-3">
          {ctaOptions.map((option, index) => {
            const Icon = option.icon;
            
            return (
              <motion.div
                key={option.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Link
                  href={
                    option.action === "email" 
                      ? "#newsletter" 
                      : option.action === "discord" 
                      ? "https://discord.gg/seventeenlabs" 
                      : "mailto:hello@seventeenlabs.io?subject=Free Consultation"
                  }
                  className="block rounded-xl border border-slate-800 bg-slate-900/30 p-6 text-center backdrop-blur transition-all hover:border-slate-700 hover:bg-slate-900/50 hover:-translate-y-1"
                >
                  <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-xl bg-slate-800 text-slate-300 group-hover:bg-slate-700 transition-colors">
                    <Icon className="size-6" />
                  </div>
                  
                  <h4 className="text-lg font-semibold text-white mb-2">
                    {option.title}
                  </h4>
                  
                  <p className="text-sm text-slate-300">
                    {option.description}
                  </p>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
