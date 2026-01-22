'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 bg-[#f0f9f6]">
      {/* Soft glowing orbs */}
      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[10%] left-[10%] w-[30%] h-[30%] rounded-full bg-emerald-200/20 blur-[80px]"
      />
      <motion.div
        animate={{
          x: [0, -40, 0],
          y: [0, 60, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[40%] right-[15%] w-[25%] h-[25%] rounded-full bg-yellow-200/20 blur-[80px]"
      />
      <motion.div
        animate={{
          x: [0, 30, 0],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-[20%] left-[20%] w-[35%] h-[35%] rounded-full bg-emerald-100/30 blur-[100px]"
      />

      {/* Waves */}
      <div className="absolute inset-0 flex flex-col justify-end overflow-hidden opacity-40">
        <Wave 
          color="#10b981" 
          duration={25} 
          height={120} 
          opacity={0.2} 
          yOffset={0}
        />
        <Wave 
          color="#34d399" 
          duration={35} 
          height={100} 
          opacity={0.15} 
          yOffset={20}
        />
        <Wave 
          color="#059669" 
          duration={30} 
          height={80} 
          opacity={0.1} 
          yOffset={40}
        />
      </div>
    </div>
  );
}

function Wave({ color, duration, height, opacity, yOffset }: { 
  color: string; 
  duration: number; 
  height: number; 
  opacity: number;
  yOffset: number;
}) {
  return (
    <motion.div
      className="absolute bottom-0 left-0 h-full w-[200%]"
      animate={{
        x: ["-50%", "0%"],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "linear",
      }}
      style={{ 
        bottom: `-${yOffset}px`,
        opacity 
      }}
    >
      <div className="absolute bottom-0 w-full flex items-end">
        <svg
          viewBox="0 0 1200 120"
          className="w-1/2 h-auto"
          preserveAspectRatio="none"
          style={{ height: `${height}px`, fill: color }}
        >
          <path d="M0,60 C150,110 300,10 450,60 C600,110 750,10 900,60 C1050,110 1200,60 1200,60 V120 H0 Z" />
        </svg>
        <svg
          viewBox="0 0 1200 120"
          className="w-1/2 h-auto"
          preserveAspectRatio="none"
          style={{ height: `${height}px`, fill: color }}
        >
          <path d="M0,60 C150,110 300,10 450,60 C600,110 750,10 900,60 C1050,110 1200,60 1200,60 V120 H0 Z" />
        </svg>
      </div>
    </motion.div>
  );
}
