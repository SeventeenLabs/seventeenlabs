"use client";

import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title?: string;
  subtitle?: string;
  items: FAQItem[];
  className?: string;
}

export default function FAQSection({ title, subtitle, items, className = "" }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Don't render if no items
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section className={`relative bg-black py-24 lg:py-32 ${className}`}>
      <div className="max-w-4xl mx-auto px-6 sm:px-12 lg:px-16">
        {/* Header */}
        {(title || subtitle) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            {title && (
              <h2 className="text-3xl lg:text-5xl font-light text-white mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg text-white/60 font-light max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </motion.div>
        )}

        {/* FAQ Items */}
        <div className="space-y-4">
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="border border-white/10 rounded-xl overflow-hidden bg-gradient-to-br from-white/5 to-white/[0.02] hover:border-orange-500/30 transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between gap-4 p-6 text-left"
                >
                  <span className="text-lg text-white font-light flex-1">
                    {item.question}
                  </span>
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                    {isOpen ? (
                      <Minus className="w-4 h-4" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </div>
                </button>

                <motion.div
                  initial={false}
                  animate={{
                    height: isOpen ? "auto" : 0,
                    opacity: isOpen ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 text-white/70 font-light leading-relaxed">
                    {item.answer}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
