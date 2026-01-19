'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Link, FileText, Download, CheckCircle2 } from 'lucide-react';

const steps = [
  {
    icon: Link,
    title: 'Identify',
    description: 'Copy the URL of any Guardian article you wish to read without distractions.',
    color: '#6366f1'
  },
  {
    icon: FileText,
    title: 'Process',
    description: 'Our engine communicates with the Content API to retrieve raw data.',
    color: '#8b5cf6'
  },
  {
    icon: Download,
    title: 'Purify',
    description: 'The content is stripped of noise and formatted for peak readability.',
    color: '#3b82f6'
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 text-center lg:text-left"
          >
            <h2 className="text-4xl sm:text-6xl font-black text-white mb-8 tracking-tighter">
              The Pure <br/><span className="text-gray-500 italic">Workflow.</span>
            </h2>
            <p className="text-xl text-gray-400 leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0">
              A seamless transition from cluttered web pages to a refined reading environment in three elegant steps.
            </p>
            
            <div className="space-y-6">
              {['End-to-end encryption', 'Official Guardian API', 'Zero data persistence'].map((item) => (
                <div key={item} className="flex items-center gap-3 justify-center lg:justify-start">
                  <div className="w-5 h-5 rounded-full bg-[#6366f1]/20 flex items-center justify-center">
                    <CheckCircle2 className="w-3 h-3 text-[#6366f1]" />
                  </div>
                  <span className="text-sm font-bold text-gray-300 uppercase tracking-widest">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="flex-1 w-full max-w-2xl relative">
            {/* Organic connecting path (SVG) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none hidden md:block" viewBox="0 0 400 600" fill="none">
              <motion.path 
                d="M200 100 C 200 200, 200 200, 200 300 C 200 400, 200 400, 200 500"
                stroke="url(#grad-line)"
                strokeWidth="2"
                strokeDasharray="10 10"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
              <defs>
                <linearGradient id="grad-line" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
            </svg>

            <div className="relative z-10 space-y-12">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="group flex flex-col sm:flex-row items-center gap-8 p-8 rounded-[32px] bg-[#1a1a24] border border-[#2a2a3a] hover:bg-[#252532] transition-colors"
                >
                  <div 
                    className="w-20 h-20 shrink-0 rounded-[24px] flex items-center justify-center transition-transform group-hover:scale-110 duration-500"
                    style={{ backgroundColor: `${step.color}20`, color: step.color }}
                  >
                    <step.icon className="w-10 h-10" />
                  </div>
                  <div className="text-center sm:text-left">
                    <div className="text-xs font-black text-gray-500 uppercase tracking-[0.3em] mb-2">Step 0{index + 1}</div>
                    <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">{step.title}</h3>
                    <p className="text-gray-400 font-medium leading-relaxed">{step.description}</p>
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
