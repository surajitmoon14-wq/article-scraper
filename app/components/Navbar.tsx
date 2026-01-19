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
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 sm:p-6 pointer-events-none"
    >
      <div 
        className={`flex items-center gap-6 px-6 py-3 rounded-full border transition-all duration-500 pointer-events-auto ${
          scrolled 
            ? 'bg-[#1a1a24] border-[#2a2a3a] shadow-[0_8px_32px_rgba(0,0,0,0.5)]' 
            : 'bg-transparent border-transparent'
        }`}
        style={{
          boxShadow: scrolled ? '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 0 10px rgba(99, 102, 241, 0.1)' : 'none'
        }}
      >
        <button
          onClick={() => scrollToSection('about')}
          className="hidden sm:block text-xs uppercase tracking-widest text-gray-400 hover:text-[#6366f1] transition-colors duration-300"
        >
          About
        </button>

        <div className="flex items-center gap-3">
          <Logo size={32} />
          <span className="text-lg font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            EXTRACT
          </span>
        </div>

        <button
          onClick={() => scrollToSection('how-it-works')}
          className="hidden sm:block text-xs uppercase tracking-widest text-gray-400 hover:text-[#6366f1] transition-colors duration-300"
        >
          Process
        </button>
      </div>
    </motion.nav>
  );
}
