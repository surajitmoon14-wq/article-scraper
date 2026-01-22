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
    <section id="how-it-works" className="relative py-32 overflow-hidden bg-emerald-50/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center lg:text-left"
          >
            <h2 className="text-4xl sm:text-6xl font-black text-slate-900 mb-8 tracking-tighter">
              The Pure <br/><span className="text-emerald-600 italic">Workflow.</span>
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0">
              A seamless transition from cluttered web pages to a refined reading environment in three elegant steps.
            </p>
            
            <div className="space-y-4">
              {['Official Guardian API', 'Zero data persistence', 'Purely Distraction-free'].map((item) => (
                <div key={item} className="flex items-center gap-3 justify-center lg:justify-start">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                  <span className="text-sm font-bold text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="flex-1 w-full max-w-2xl relative">
            {/* Animated Progress Line */}
            <div className="absolute left-[2.75rem] top-10 bottom-10 w-0.5 bg-emerald-100 hidden sm:block">
              <motion.div 
                className="w-full bg-emerald-500 origin-top"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </div>

            <div className="space-y-8">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="flex flex-col sm:flex-row items-start gap-6 p-8 rounded-3xl bg-white border border-emerald-100 shadow-xl shadow-emerald-900/5 relative z-10"
                >
                  <div 
                    className="w-14 h-14 shrink-0 rounded-2xl flex items-center justify-center shadow-inner"
                    style={{ backgroundColor: `${step.color}15`, color: step.color }}
                  >
                    <step.icon className="w-7 h-7" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-black text-emerald-500 uppercase tracking-widest mb-1">Step 0{index + 1}</div>
                    <h3 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">{step.title}</h3>
                    <p className="text-slate-600 leading-relaxed text-lg">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
