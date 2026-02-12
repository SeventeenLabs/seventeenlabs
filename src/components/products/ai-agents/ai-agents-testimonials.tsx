"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface TestimonialsSectionProps {
  locale: string;
}

export default function AIAgentsTestimonials({ locale }: TestimonialsSectionProps) {
  const isGerman = locale === "de";

  const testimonials = isGerman ? [
    {
      quote: "Wir haben unsere Produktivität um 40 % gesteigert und unsere Kosten um €3K pro Monat gesenkt.",
      author: "Sarah Müller",
      title: "Gründerin, Design Agency",
      company: "Creative Minds",
      image: "SM",
      stat: "40% More Output"
    },
    {
      quote: "30 Stunden pro Monat gespart, während wir gleichzeitig bessere Inhalte liefern. Das Beste ist, kein Burnout mehr bei unserem Team.",
      author: "Thomas Weber",
      title: "CEO, Marketing-Agentur",
      company: "Growth Partners",
      image: "TW",
      stat: "30 Hours/Month Saved"
    },
    {
      quote: "Wir haben 3x mehr Kampagnen gestartet, ohne unser Team zu vergrößern. Die Agenten sind zuverlässiger als jeder Freelancer.",
      author: "Julia Schmidt",
      title: "Operations Lead",
      company: "Strategy First",
      image: "JS",
      stat: "3x More Campaigns"
    }
  ] : [
    {
      quote: "We increased productivity by 40% while cutting costs by €3K per month. Best decision we made.",
      author: "Sarah Miller",
      title: "Founder, Design Agency",
      company: "Creative Minds",
      image: "SM",
      stat: "40% More Output"
    },
    {
      quote: "30 hours saved per month and our content got better. The team is happier and more focused on strategy.",
      author: "Thomas Brown",
      title: "CEO, Marketing Agency",
      company: "Growth Partners",
      image: "TB",
      stat: "30 Hours/Month Saved"
    },
    {
      quote: "We launched 3x more client campaigns without growing our team. These agents are more reliable than any freelancer.",
      author: "Julia Chen",
      title: "Operations Lead",
      company: "Strategy First",
      image: "JC",
      stat: "3x More Campaigns"
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {isGerman ? "Was unsere Kunden sagen" : "What Our Customers Say"}
          </h2>
          <p className="text-xl text-gray-600">
            {isGerman 
              ? "Agenturen wie Sie nutzen diese Agenten bereits." 
              : "Agencies like yours are already using these agents."}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-shadow duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-700 mb-6 italic leading-relaxed">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {testimonial.image}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.author}</p>
                    <p className="text-sm text-gray-600">{testimonial.title}</p>
                    <p className="text-xs text-blue-600 font-semibold">{testimonial.company}</p>
                  </div>
                </div>

                {/* Stat badge */}
                <div className="mt-4 bg-blue-50 border border-blue-200 rounded px-3 py-2 text-center">
                  <p className="text-xs font-semibold text-blue-600">{testimonial.stat}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 grid md:grid-cols-4 gap-6 text-center"
        >
          {[
            { label: isGerman ? "Zufriedene Kunden" : "Happy Customers", value: "50+" },
            { label: isGerman ? "Inhalte erstellt" : "Content Pieces", value: "10K+" },
            { label: isGerman ? "Stunden gespart" : "Hours Saved", value: "5K+" },
            { label: isGerman ? "Durchschn. ROI" : "Avg ROI", value: "+350%" }
          ].map((stat, index) => (
            <div key={index} className="p-6 bg-gray-50 rounded-lg">
              <p className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</p>
              <p className="text-gray-700 text-sm">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
