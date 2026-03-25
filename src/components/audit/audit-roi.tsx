"use client";

import { motion } from "framer-motion";
import { TrendingUp, Clock, DollarSign, FileText } from "lucide-react";

interface AuditROIProps {
  locale: string;
  t: any;
}

const roiData = [
  {
    workflow: "Client Onboarding",
    hoursSaved: "10h",
    monthlyValue: "$1,200",
  },
  {
    workflow: "Report Generation",
    hoursSaved: "8h",
    monthlyValue: "$800",
  },
  {
    workflow: "Meeting Summaries",
    hoursSaved: "3h",
    monthlyValue: "$300",
  }
];

export default function AuditROI({ locale, t }: AuditROIProps) {
  return (
    <section className="relative py-24 sm:py-32 bg-black">
      <div className="relative z-10 w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="text-sm font-light text-white/60 tracking-wider uppercase">
              {t.audit.roi.eyebrow}
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight"
          >
            {t.audit.roi.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 text-white/70 font-light leading-relaxed max-w-3xl"
          >
            {t.audit.roi.subtitle}
          </motion.p>
        </div>

        {/* Case Study */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16 max-w-3xl"
        >
          <p className="text-lg text-white/70 font-light leading-relaxed">
            "{t.audit.roi.quote.text1}{" "}
            <span className="text-white">{t.audit.roi.quote.text2}</span> {t.audit.roi.quote.text3}{" "}
            <span className="text-white">{t.audit.roi.quote.text4}</span> {t.audit.roi.quote.text5}"
          </p>
        </motion.div>

        {/* ROI Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-4xl"
        >
          <div className="border border-white/10">
            {/* Table Header */}
            <div className="grid grid-cols-3 gap-4 p-6 border-b border-white/10">
              <div className="text-white/60 font-light uppercase tracking-wider text-xs">
                {t.audit.roi.table.workflow}
              </div>
              <div className="text-white/60 font-light uppercase tracking-wider text-xs text-center">
                {t.audit.roi.table.timeSaved}
              </div>
              <div className="text-white/60 font-light uppercase tracking-wider text-xs text-right">
                {t.audit.roi.table.costSavings}
              </div>
            </div>

            {/* Table Rows */}
            {roiData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="grid grid-cols-3 gap-4 p-6 border-b border-white/10 last:border-b-0"
              >
                <div className="text-white font-light">
                  {item.workflow}
                </div>
                <div className="text-center">
                  <span className="text-white font-light">
                    {item.hoursSaved}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-white font-light">
                    {item.monthlyValue}
                  </span>
                </div>
              </motion.div>
            ))}

            {/* Total Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="grid grid-cols-3 gap-4 p-6 bg-white/5"
            >
              <div className="text-white font-light">
                Total Impact
              </div>
              <div className="text-center">
                <span className="text-white font-light">
                  21h
                </span>
              </div>
              <div className="text-right">
                <span className="text-white font-light">
                  $2,300
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-white/40 mt-8 text-xs font-light max-w-4xl"
        >
          * Example based on $100/hour value estimation. Your results may vary based on your specific workflows.
        </motion.p>
      </div>
    </section>
  );
}
