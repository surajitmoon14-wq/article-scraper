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
        className={`flex items-center gap-10 px-8 py-4 rounded-3xl border transition-all duration-700 pointer-events-auto ${
          scrolled 
            ? 'bg-white/80 border-emerald-200 shadow-[0_20px_40px_rgba(16,185,129,0.1)] backdrop-blur-xl scale-95' 
            : 'bg-white/40 backdrop-blur-md border-white/60 shadow-sm'
        }`}
      >
        <button
          onClick={() => scrollToSection('about')}
          className="hidden sm:block text-xs uppercase tracking-[0.3em] text-emerald-900/60 hover:text-emerald-600 transition-all duration-300 font-black"
        >
          Features
        </button>

        <div className="flex items-center gap-4 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <Logo size={40} glow={scrolled} />
          <div className="flex flex-col leading-none">
            <span className="text-xl font-black tracking-[0.1em] text-emerald-950">
              PURE
            </span>
            <span className="text-[10px] font-black tracking-[0.4em] text-emerald-600/40 uppercase">
              Experience
            </span>
          </div>
        </div>

        <button
          onClick={() => scrollToSection('how-it-works')}
          className="hidden sm:block text-xs uppercase tracking-[0.3em] text-emerald-900/60 hover:text-emerald-600 transition-all duration-300 font-black"
        >
          Process
        </button>
      </div>
    </motion.nav>
  );
}
