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
    <section id="how-it-works" className="relative py-24 overflow-hidden bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center lg:text-left"
          >
            <h2 className="text-4xl sm:text-6xl font-black text-gray-900 mb-8 tracking-tight">
              The Pure <br/><span className="text-gray-500 italic">Workflow.</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0">
              A seamless transition from cluttered web pages to a refined reading environment in three elegant steps.
            </p>
            
            <div className="space-y-4">
              {['End-to-end encryption', 'Official Guardian API', 'Zero data persistence'].map((item) => (
                <div key={item} className="flex items-center gap-3 justify-center lg:justify-start">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-sm font-semibold text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="flex-1 w-full max-w-2xl">
            <div className="space-y-6">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-2xl bg-white border-2 border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
                >
                  <div 
                    className="w-16 h-16 shrink-0 rounded-2xl flex items-center justify-center"
                    style={{ backgroundColor: `${step.color}20`, color: step.color }}
                  >
                    <step.icon className="w-8 h-8" />
                  </div>
                  <div className="text-center sm:text-left">
                    <div className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Step 0{index + 1}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
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
