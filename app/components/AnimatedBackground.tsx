'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 bg-[#f0f9f6]">
      {/* Dynamic Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.1),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(254,252,232,0.3),transparent_50%)]" />
      
      {/* Soft glowing orbs */}
      <motion.div
        animate={{
          x: [0, 80, 0],
          y: [0, 50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[10%] left-[5%] w-[40%] h-[40%] rounded-full bg-emerald-200/30 blur-[120px]"
      />
      <motion.div
        animate={{
          x: [0, -60, 0],
          y: [0, 90, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[30%] right-[5%] w-[35%] h-[35%] rounded-full bg-yellow-100/40 blur-[120px]"
      />
      <motion.div
        animate={{
          x: [0, 40, 0],
          y: [0, -70, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-[10%] left-[15%] w-[45%] h-[45%] rounded-full bg-emerald-100/40 blur-[150px]"
      />

      {/* Floating Nature Particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: `${(i * 137.5) % 100}%`, 
            y: `${(i * 161.8) % 100}%`,
            opacity: 0 
          }}
          animate={{
            y: [null, "-20%", "120%"],
            opacity: [0, 0.4, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 15 + (i % 5) * 4,
            repeat: Infinity,
            delay: (i % 7) * 1.5,
            ease: "linear"
          }}
          className="absolute w-2 h-2 rounded-full bg-emerald-400/20 blur-[2px]"
        />
      ))}

      {/* Top Waves (Subtle) */}
      <div className="absolute top-0 left-0 w-full rotate-180 opacity-20 h-64 overflow-hidden">
        <Wave 
          color="#10b981" 
          duration={40} 
          height={60} 
          opacity={0.3} 
          yOffset={0}
        />
        <Wave 
          color="#34d399" 
          duration={50} 
          height={50} 
          opacity={0.2} 
          yOffset={10}
        />
      </div>

      {/* Bottom Waves */}
      <div className="absolute bottom-0 left-0 w-full h-[40vh] flex flex-col justify-end overflow-hidden opacity-50">
        <Wave 
          color="#10b981" 
          duration={25} 
          height={140} 
          opacity={0.25} 
          yOffset={0}
        />
        <Wave 
          color="#34d399" 
          duration={35} 
          height={110} 
          opacity={0.2} 
          yOffset={30}
        />
        <Wave 
          color="#059669" 
          duration={30} 
          height={90} 
          opacity={0.15} 
          yOffset={60}
        />
        <Wave 
          color="#d1fae5" 
          duration={45} 
          height={70} 
          opacity={0.3} 
          yOffset={90}
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
