"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useTranslations } from "@/lib/i18n/context";
import Image from "next/image";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  image?: string;
  quote: string;
  rating: number;
  result?: string;
}

export default function Testimonials() {
  const { t } = useTranslations();

  // Default testimonials - will be replaced with real data
  const testimonials: Testimonial[] = t.testimonials?.items || [
    {
      name: "Sarah Mitchell",
      role: "Marketing Director",
      company: "Growth Agency Co.",
      quote: "SeventeenLabs automated our entire client reporting process. We're saving 23 hours every month and our clients love the new dashboards.",
      rating: 5,
      result: "23 hours saved monthly",
    },
    {
      name: "Michael Chen",
      role: "Founder",
      company: "TechConsult Pro",
      quote: "The AI automation they built for our CRM integration works flawlessly. What would have taken us months to develop was done in 3 weeks.",
      rating: 5,
      result: "3-week delivery",
    },
    {
      name: "Emma Rodriguez",
      role: "Operations Manager",
      company: "Scale SaaS",
      quote: "Our team was drowning in manual data entry. Now everything syncs automatically. Game-changer for our productivity.",
      rating: 5,
      result: "Zero manual data entry",
    },
  ];

  return (
    <section className="relative bg-black py-24 lg:py-32 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl lg:text-5xl font-light text-white mb-4">
            {t.testimonials?.title || "What Our Clients Say"}
          </h2>
          <p className="text-xl text-white/60 font-light max-w-2xl mx-auto">
            {t.testimonials?.subtitle || 
              "Real results from businesses who transformed their operations with AI automation"}
          </p>
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative border border-white/10 bg-white/[0.02] rounded-2xl p-8 hover:bg-white/[0.04] hover:border-white/20 transition-all duration-300"
            >
              {/* Quote icon */}
              <div className="absolute top-6 right-6 opacity-10">
                <Quote className="w-12 h-12 text-orange-400" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-orange-400 text-orange-400"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-white/80 font-light leading-relaxed mb-6">
                "{testimonial.quote}"
              </p>

              {/* Result badge */}
              {testimonial.result && (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-6">
                  {testimonial.result}
                </div>
              )}

              {/* Author */}
              <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                {testimonial.image ? (
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500/20 to-blue-500/20 flex items-center justify-center">
                    <span className="text-white font-medium text-lg">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                )}
                <div>
                  <div className="text-white font-medium text-sm">
                    {testimonial.name}
                  </div>
                  <div className="text-white/50 text-xs">
                    {testimonial.role} • {testimonial.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
