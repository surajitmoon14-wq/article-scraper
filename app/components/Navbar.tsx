'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Logo } from './Logo';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0f0f14]/80 backdrop-blur-md border-b border-[#2a2a3a]'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 sm:h-20 items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo size={28} />
            <span className="text-lg sm:text-xl font-semibold text-white tracking-tight">
              Extract
            </span>
          </div>

          <div className="flex items-center gap-4 sm:gap-8">
            <button
              onClick={() => scrollToSection('about')}
              className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors duration-200"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors duration-200"
            >
              How it works
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
