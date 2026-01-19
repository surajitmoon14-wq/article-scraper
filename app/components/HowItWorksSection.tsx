'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link, Download, FileText } from 'lucide-react';

const steps = [
  {
    icon: Link,
    title: 'Copy Article URL',
    description: 'Find any article on The Guardian website and copy its URL from your browser.',
  },
  {
    icon: FileText,
    title: 'Paste & Extract',
    description: 'Paste the URL into the input field above and click Extract. We handle the rest.',
  },
  {
    icon: Download,
    title: 'Get Clean Content',
    description: 'Instantly receive the article content without ads, sidebars, or distractions.',
  },
];

export function HowItWorksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="how-it-works"
      className="py-20 sm:py-32 bg-gradient-to-b from-transparent via-[#1a1a24]/50 to-transparent"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 sm:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f5f5f7] mb-6">
            How It Works
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Three simple steps to get clean, readable article content in seconds.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative text-center"
            >
              {/* Step number */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] flex items-center justify-center text-white font-bold text-sm">
                {index + 1}
              </div>

              {/* Icon */}
              <div className="pt-8 pb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#1a1a24] border border-[#2a2a3a] mb-6">
                  <step.icon className="w-10 h-10 sm:w-12 sm:h-12 text-[#6366f1]" strokeWidth={1.5} />
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl sm:text-2xl font-semibold text-[#f5f5f7] mb-4">
                {step.title}
              </h3>
              <p className="text-base sm:text-lg text-gray-400 leading-relaxed">
                {step.description}
              </p>

              {/* Connector line (desktop only) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-[calc(50%+4rem)] w-full border-t-2 border-dashed border-[#2a2a3a]" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
