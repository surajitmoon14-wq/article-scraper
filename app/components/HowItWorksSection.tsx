'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Link, Search, Wind, CheckCircle2 } from 'lucide-react';

const steps = [
  {
    icon: Link,
    title: 'Identify',
    description: 'Paste the URL of any Guardian article you wish to read without distractions.',
    color: '#10b981'
  },
  {
    icon: Search,
    title: 'Process',
    description: 'Our engine communicates with the Guardian Content API to retrieve raw data.',
    color: '#059669'
  },
  {
    icon: Wind,
    title: 'Purify',
    description: 'The content is stripped of noise and formatted for peak nature-inspired readability.',
    color: '#064e3b'
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative py-48 overflow-hidden bg-emerald-50/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-24">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 text-center lg:text-left"
          >
            <h2 className="text-5xl sm:text-8xl font-black text-slate-900 mb-10 tracking-tighter leading-tight">
              The Pure <br/><span className="text-emerald-600 italic">Workflow.</span>
            </h2>
            <p className="text-2xl text-slate-600 leading-relaxed mb-12 max-w-xl mx-auto lg:mx-0 font-medium">
              A seamless transition from cluttered web pages to a refined reading environment in three elegant steps.
            </p>
            
            <div className="flex flex-col gap-5">
              {['Official Guardian API', 'Zero data persistence', 'Purely Distraction-free'].map((item) => (
                <motion.div 
                  key={item} 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4 justify-center lg:justify-start group"
                >
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center group-hover:bg-emerald-600 group-hover:scale-110 transition-all duration-300 shadow-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-lg font-black text-slate-700 tracking-tight">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="flex-1 w-full max-w-2xl relative">
            {/* Animated Progress Line */}
            <div className="absolute left-[3.25rem] top-12 bottom-12 w-1 bg-emerald-100/50 hidden sm:block rounded-full overflow-hidden">
              <motion.div 
                className="w-full bg-emerald-500 origin-top shadow-[0_0_20px_rgba(16,185,129,0.5)]"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </div>

            <div className="space-y-12">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.25 }}
                  className="flex flex-col sm:flex-row items-start gap-8 p-10 rounded-[3rem] bg-white border border-emerald-100 shadow-[0_30px_60px_rgba(16,185,129,0.05)] hover:shadow-[0_40px_100px_rgba(16,185,129,0.1)] transition-all duration-700 relative z-10 group"
                >
                  <div 
                    className="w-20 h-20 shrink-0 rounded-[2rem] flex items-center justify-center shadow-inner group-hover:scale-110 transition-all duration-500"
                    style={{ backgroundColor: `${step.color}10`, color: step.color }}
                  >
                    <step.icon className="w-10 h-10" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-black text-emerald-500 uppercase tracking-[0.4em] mb-3">Step 0{index + 1}</div>
                    <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tighter">{step.title}</h3>
                    <p className="text-slate-600 leading-relaxed text-xl font-medium">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-emerald-50/50 to-transparent pointer-events-none" />
    </section>
  );
}
