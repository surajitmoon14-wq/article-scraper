'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Shield, Zap, Globe, Sparkles } from 'lucide-react';

const features = [
  {
    icon: BookOpen,
    title: 'Clean Extraction',
    description:
      'Instantly extract article content without ads, sidebars, or distractions. Get pure, readable text.',
    color: 'from-blue-500 to-indigo-500'
  },
  {
    icon: Shield,
    title: 'Reliable Source',
    description:
      'Powered by the official Guardian Content API. Accurate, authorized, and consistently updated.',
    color: 'from-emerald-500 to-teal-500'
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description:
      'Get your extracted content in seconds. No waiting, no processing delays.',
    color: 'from-amber-500 to-orange-500'
  },
  {
    icon: Globe,
    title: 'Always Available',
    description:
      'Access Guardian articles from anywhere. Built for reliability and performance.',
    color: 'from-purple-500 to-violet-500'
  },
];

export function AboutSection() {
  return (
    <section id="about" className="relative py-32 overflow-hidden">
      {/* Background organic wash */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#6366f1]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1a1a24] border border-[#2a2a3a] mb-6">
            <Sparkles className="w-4 h-4 text-[#6366f1]" />
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">The Experience</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-white mb-8 tracking-tight">
            Designed for <br/><span className="italic text-[#6366f1]">Clarity.</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-medium">
            We believe that great journalism deserves a great reading environment. 
            Extract is more than a tool—it&apos;s a sanctuary for your mind.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative"
            >
              <div className="relative z-10 h-full p-8 sm:p-10 rounded-[40px] bg-[#1a1a24] border border-[#2a2a3a] hover:border-[#6366f1]/30 transition-all duration-500 overflow-hidden">
                {/* Internal Glow */}
                <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-500`} />
                
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-gradient-to-br ${feature.color} p-4 mb-8 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                  <feature.icon className="w-full h-full text-white" />
                </div>
                
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed text-lg font-medium">
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
