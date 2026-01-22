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
    <section id="about" className="relative py-32 overflow-hidden bg-white/30 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 border border-emerald-200 mb-6">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-black uppercase tracking-widest text-emerald-800">The Experience</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-slate-900 mb-8 tracking-tighter">
            Designed for <br/><span className="italic text-emerald-600">Pure Clarity.</span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            We believe that great journalism deserves a great reading environment. 
            Pure is more than a tool—it&apos;s a sanctuary for your mind.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group"
            >
              <div className="h-full p-8 sm:p-10 rounded-[2.5rem] bg-white/80 border border-emerald-100/50 hover:border-emerald-300 hover:shadow-2xl hover:shadow-emerald-900/5 transition-all duration-500 glass-emerald">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} p-4 mb-8 shadow-lg shadow-emerald-200 group-hover:animate-float`}>
                  <feature.icon className="w-full h-full text-white" />
                </div>
                
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-4 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed text-lg">
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
