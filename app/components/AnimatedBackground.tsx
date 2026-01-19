'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Quote, BookOpen, Pen, Globe, Zap } from 'lucide-react';

const icons = [
  { Icon: FileText, delay: 0, duration: 8 },
  { Icon: Quote, delay: 0.5, duration: 7 },
  { Icon: BookOpen, delay: 1, duration: 9 },
  { Icon: Pen, delay: 1.5, duration: 6.5 },
  { Icon: Globe, delay: 2, duration: 7.5 },
  { Icon: Zap, delay: 2.5, duration: 8.5 },
];

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      {/* Gradient background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f0f14] via-[#121218] to-[#0f0f14]" />

      {/* Ambient gradient orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#6366f1]/10 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#8b5cf6]/10 blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />

      {/* Floating icons */}
      {icons.map(({ Icon, delay, duration }, index) => {
        const positions = [
          { top: '10%', left: '5%' },
          { top: '20%', right: '10%' },
          { top: '60%', left: '8%' },
          { top: '40%', right: '5%' },
          { top: '75%', right: '15%' },
          { top: '30%', left: '15%' },
        ];

        const pos = positions[index % positions.length];

        return (
          <motion.div
            key={index}
            className={`absolute ${pos.top} ${pos.left} ${pos.right || ''}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0.15, 0.25, 0.15],
              scale: 1,
              y: [0, -20, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Icon className="w-12 h-12 sm:w-16 sm:h-16 text-[#6366f1]" strokeWidth={1.5} />
          </motion.div>
        );
      })}

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />
    </div>
  );
}
