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
    <section id="about" className="relative py-24 overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 border border-gray-200 mb-6">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-bold uppercase tracking-wide text-gray-600">The Experience</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-gray-900 mb-8 tracking-tight">
            Designed for <br/><span className="italic text-blue-600">Clarity.</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            We believe that great journalism deserves a great reading environment. 
            Extract is more than a tool—it&apos;s a sanctuary for your mind.
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
              className="group"
            >
              <div className="h-full p-8 sm:p-10 rounded-3xl bg-white border-2 border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} p-3 mb-6 shadow-sm`}>
                  <feature.icon className="w-full h-full text-white" />
                </div>
                
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
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
