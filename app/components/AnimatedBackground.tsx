'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      {/* Deep base background */}
      <div className="absolute inset-0 bg-[#0a0a0f]" />
      
      {/* Primary Glow Layer - Large, slow moving blobs */}
      <motion.div
        className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] rounded-full bg-[#6366f1]/20 blur-[120px]"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-[#8b5cf6]/15 blur-[100px]"
        animate={{
          x: [0, -40, 0],
          y: [0, 60, 0],
          scale: [1.1, 1, 1.1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />

      <motion.div
        className="absolute -bottom-[10%] left-[20%] w-[55%] h-[55%] rounded-full bg-[#3b82f6]/10 blur-[110px]"
        animate={{
          x: [0, 30, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 5,
        }}
      />

      {/* Secondary Glows - Smaller, faster drifting light balls */}
      <motion.div
        className="absolute top-[40%] left-[40%] w-64 h-64 rounded-full bg-cyan-500/10 blur-[80px]"
        animate={{
          x: [-100, 100, -100],
          y: [-50, 50, -50],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      <motion.div
        className="absolute bottom-[30%] right-[30%] w-72 h-72 rounded-full bg-amber-500/5 blur-[90px]"
        animate={{
          x: [150, -150, 150],
          y: [100, -100, 100],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'linear',
          delay: 3,
        }}
      />

      {/* Radial Wash */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(10,10,15,0.8)_100%)]" />

      {/* Soft Vignette */}
      <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.5)]" />
    </div>
  );
}
