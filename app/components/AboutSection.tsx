'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, ShieldCheck, Zap, Globe, Sparkles } from 'lucide-react';

const features = [
  {
    icon: Leaf,
    title: 'Clean Extraction',
    description:
      'Instantly extract article content without ads, sidebars, or distractions. Get pure, readable text.',
    color: 'from-emerald-400 to-teal-500'
  },
  {
    icon: ShieldCheck,
    title: 'Reliable Source',
    description:
      'Powered by the official Guardian Content API. Accurate, authorized, and consistently updated.',
    color: 'from-teal-400 to-emerald-500'
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description:
      'Get your extracted content in seconds. No waiting, no processing delays.',
    color: 'from-emerald-300 to-emerald-500'
  },
  {
    icon: Globe,
    title: 'Always Available',
    description:
      'Access Guardian articles from anywhere. Built for reliability and performance.',
    color: 'from-teal-300 to-emerald-600'
  },
];

export function AboutSection() {
  return (
    <section id="about" className="relative py-48 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-32"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-emerald-50 border border-emerald-100 mb-10 shadow-sm"
          >
            <Sparkles className="w-5 h-5 text-emerald-600" />
            <span className="text-xs font-black uppercase tracking-[0.3em] text-emerald-800">The Pure Experience</span>
          </motion.div>
          
          <h2 className="text-5xl sm:text-8xl font-black text-slate-900 mb-10 tracking-tighter leading-tight">
            Elevating <br/><span className="italic bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">Digital Focus.</span>
          </h2>
          <p className="text-xl sm:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium">
            Beyond extraction, we offer a sanctuary. Every article is a journey into 
            uninterrupted thought and absolute clarity.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              whileHover={{ y: -20 }}
              className="group"
            >
              <div className="h-full p-10 sm:p-14 rounded-[3.5rem] bg-white/60 border border-emerald-100 shadow-[0_20px_50px_rgba(16,185,129,0.05)] hover:shadow-[0_40px_100px_rgba(16,185,129,0.1)] hover:border-emerald-300 transition-all duration-700 glass-emerald backdrop-blur-md relative overflow-hidden">
                {/* Decorative background element */}
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <div className={`relative z-10 inline-flex items-center justify-center w-20 h-20 rounded-[2rem] bg-gradient-to-br ${feature.color} p-5 mb-10 shadow-2xl shadow-emerald-500/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-700`}>
                  <feature.icon className="w-full h-full text-white" />
                </div>
                
                <h3 className="relative z-10 text-3xl sm:text-4xl font-black text-slate-900 mb-6 tracking-tight">
                  {feature.title}
                </h3>
                <p className="relative z-10 text-slate-600 leading-relaxed text-xl font-medium">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
