import { motion } from "framer-motion";
import { Clock, TrendingUp, Zap, Shield } from "lucide-react";

const benefits = [
  {
    title: "Save Time",
    description: "Automate repetitive tasks and workflows. What used to take hours now happens automatically in the background.",
    icon: Clock,
    stat: "10+ hrs/week saved",
  },
  {
    title: "Smarter Growth",
    description: "AI-powered insights and automation help you make data-driven decisions that scale your business intelligently.",
    icon: TrendingUp,
    stat: "3x faster scaling",
  },
  {
    title: "Easy Implementation", 
    description: "No complex setup or technical expertise required. Start seeing results within days, not months.",
    icon: Zap,
    stat: "Setup in 24hrs",
  },
  {
    title: "Trusted Support",
    description: "Expert guidance and ongoing support ensure you get maximum value from every tool and workflow.",
    icon: Shield,
    stat: "24/7 support",
  },
];

export default function WhySeventeenLabs() {
  return (
    <section className="bg-slate-950 px-6 py-24 text-slate-100">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            Why Choose SeventeenLabs?
          </h2>
          <p className="mt-4 text-xl text-slate-300 max-w-3xl mx-auto">
            Built for small businesses ready to embrace automation and AI-powered growth.
          </p>
        </motion.div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            
            return (
              <motion.div 
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group text-center"
              >
                <div className="relative mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl bg-slate-900 border border-slate-800 group-hover:border-slate-700 transition-colors">
                  <Icon className="size-8 text-slate-300" aria-hidden />
                </div>
                
                <div className="mb-2 text-sm font-bold text-slate-400 uppercase tracking-wider">
                  {benefit.stat}
                </div>
                
                <h3 className="mb-3 text-xl font-bold text-white">
                  {benefit.title}
                </h3>
                
                <p className="text-sm text-slate-300 leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/50 border border-slate-800 px-6 py-3 text-sm text-slate-300">
            <div className="size-2 rounded-full bg-slate-500 animate-pulse"></div>
            <span>Ready to serve small businesses worldwide</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
