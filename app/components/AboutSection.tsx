'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { BookOpen, Shield, Zap, Globe } from 'lucide-react';

const features = [
  {
    icon: BookOpen,
    title: 'Clean Extraction',
    description:
      'Instantly extract article content without ads, sidebars, or distractions. Get pure, readable text.',
  },
  {
    icon: Shield,
    title: 'Reliable Source',
    description:
      'Powered by the official Guardian Content API. Accurate, authorized, and consistently updated.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description:
      'Get your extracted content in seconds. No waiting, no processing delays.',
  },
  {
    icon: Globe,
    title: 'Always Available',
    description:
      'Access Guardian articles from anywhere. Built for reliability and performance.',
  },
];

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 sm:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f5f5f7] mb-6">
            About Extract
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Extract provides a clean, distraction-free way to access Guardian article content.
            Perfect for researchers, writers, and readers who want pure text without clutter.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative rounded-2xl bg-[#1a1a24] border border-[#2a2a3a] p-6 sm:p-8 hover:border-[#6366f1]/50 transition-all duration-300"
            >
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[#6366f1]/10 mb-4 sm:mb-6 group-hover:bg-[#6366f1]/20 transition-colors duration-300">
                  <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 text-[#6366f1]" strokeWidth={2} />
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-[#f5f5f7] mb-3">
                  {feature.title}
                </h3>
                <p className="text-base sm:text-lg text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Subtle glow on hover */}
              <motion.div
                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#6366f1]/0 via-transparent to-[#8b5cf6]/0 group-hover:from-[#6366f1]/5 group-hover:to-[#8b5cf6]/5 transition-all duration-500"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
