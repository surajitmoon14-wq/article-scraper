'use client';

import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { ScraperForm } from './components/ScraperForm';
import { ResultsView } from './components/ResultsView';
import { AnimatedBackground } from './components/AnimatedBackground';
import { AboutSection } from './components/AboutSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { Logo } from './components/Logo';
import { ArrowRight, FileText, Sparkles, Shield, Zap } from 'lucide-react';

interface ScrapeData {
  title: string;
  author: string | null;
  published_date: string;
  content_html: string;
  content_text: string;
  source: string;
  word_count: number;
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<ScrapeData | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const handleScrape = async (url: string) => {
    setIsLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await fetch('/api/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch the article');
      }

      setData(result);

      // Scroll to results
      setTimeout(() => {
        const resultsElement = document.getElementById('results');
        if (resultsElement) {
          resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToExtractor = () => {
    const extractor = document.getElementById('extractor');
    if (extractor) {
      extractor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#0a0a0f] text-[#f5f5f7]">
      <AnimatedBackground />

      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 px-4">
          {/* Decorative Floating Elements - Left */}
          <motion.div 
            style={{ y: y1 }}
            className="absolute left-[5%] top-[20%] hidden lg:block"
          >
            <motion.div
              animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="p-4 rounded-3xl bg-[#1a1a24] border border-[#2a2a3a] shadow-2xl"
            >
              <FileText className="w-10 h-10 text-[#6366f1]" />
            </motion.div>
          </motion.div>
          
          <motion.div 
            style={{ y: y2 }}
            className="absolute left-[15%] bottom-[20%] hidden lg:block"
          >
            <motion.div
              animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="p-4 rounded-full bg-[#1a1a24]/50 border border-[#2a2a3a] shadow-xl"
            >
              <Sparkles className="w-6 h-6 text-amber-400" />
            </motion.div>
          </motion.div>

          {/* Decorative Floating Elements - Right */}
          <motion.div 
            style={{ y: y1 }}
            className="absolute right-[5%] top-[30%] hidden lg:block"
          >
            <motion.div
              animate={{ y: [0, 25, 0], rotate: [0, -10, 0] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="p-5 rounded-3xl bg-[#1a1a24] border border-[#2a2a3a] shadow-2xl"
            >
              <Zap className="w-8 h-8 text-[#8b5cf6]" />
            </motion.div>
          </motion.div>
          
          <motion.div 
            style={{ y: y2 }}
            className="absolute right-[12%] bottom-[25%] hidden lg:block"
          >
            <motion.div
              animate={{ y: [0, -20, 0], rotate: [0, 8, 0] }}
              transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="p-4 rounded-full bg-[#1a1a24]/20 border border-[#2a2a3a] shadow-xl"
            >
              <Shield className="w-6 h-6 text-emerald-400" />
            </motion.div>
          </motion.div>

          {/* Hero Content */}
          <div className="relative z-10 max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="mb-10 inline-block"
            >
              <div className="relative p-1 rounded-full bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#3b82f6]">
                <div className="px-6 py-2 rounded-full bg-[#0a0a0f] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#6366f1] animate-pulse" />
                  <span className="text-sm font-medium tracking-wider text-gray-300 uppercase">Premium Content Extraction</span>
                </div>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl sm:text-7xl lg:text-8xl font-black text-white mb-8 tracking-tighter leading-[0.9]"
            >
              The Art of
              <br />
              <span className="bg-gradient-to-b from-[#6366f1] via-[#8b5cf6] to-[#3b82f6] bg-clip-text text-transparent italic px-2">
                Pure Reading
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="text-lg sm:text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-12 font-medium"
            >
              Experience The Guardian like never before. We strip away the digital clutter, 
              leaving only the words that matter in a beautiful, focused environment.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <button
                onClick={scrollToExtractor}
                className="group relative px-10 py-5 rounded-full overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(99,102,241,0.3)]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6]" />
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
                <div className="relative flex items-center gap-3 text-white font-bold text-lg">
                  Get Started
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
              
              <button
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                className="group text-gray-400 hover:text-white font-semibold transition-colors flex items-center gap-2"
              >
                Learn more
                <div className="w-6 h-[1px] bg-gray-600 group-hover:w-10 transition-all" />
              </button>
            </motion.div>
          </div>
          
          {/* Hero Scroll Indicator */}
          <motion.div 
            style={{ opacity }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-bold">Scroll</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-[#6366f1] to-transparent" />
          </motion.div>
        </section>

        {/* Tool Section */}
        <section id="extractor" className="relative py-32 px-4 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6">Article Extractor</h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Paste your Guardian URL below and watch the magic happen.
            </p>
          </motion.div>

          <div className="w-full max-w-4xl relative">
            {/* Soft glow behind the form */}
            <div className="absolute -inset-4 bg-gradient-to-r from-[#6366f1]/20 to-[#8b5cf6]/20 blur-[60px] opacity-50 rounded-[40px]" />
            <ScraperForm onScrape={handleScrape} isLoading={isLoading} externalError={error} />
          </div>
        </section>

        {/* Results Section */}
        {data ? (
          <section id="results" className="py-24 px-4">
            <div className="mx-auto max-w-5xl">
              <ResultsView data={data} />
            </div>
          </section>
        ) : null}

        {/* About & Process Sections */}
        <div className="relative">
          {/* Subtle separator glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-px bg-gradient-to-r from-transparent via-[#2a2a3a] to-transparent" />
          
          <AboutSection />
          <HowItWorksSection />
        </div>
      </main>

      {/* Footer */}
      <footer className="relative py-20 px-4 overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-center text-center gap-10">
            <div className="flex flex-col items-center gap-4">
              <Logo size={40} />
              <span className="text-2xl font-black tracking-tighter text-white">EXTRACT.</span>
            </div>

            <nav className="flex flex-wrap justify-center gap-x-12 gap-y-6">
              {['Features', 'Process', 'Privacy', 'API'].map((item) => (
                <a key={item} href="#" className="text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-[#6366f1] transition-colors">
                  {item}
                </a>
              ))}
            </nav>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-[#2a2a3a] to-transparent" />

            <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-6 text-gray-500 text-xs font-bold uppercase tracking-[0.2em]">
              <p>© 2024 Pure Reading Experience</p>
              <p>Powered by The Guardian Content API</p>
              <p>Built for the Web</p>
            </div>
          </div>
        </div>
        
        {/* Subtle background wash for footer */}
        <div className="absolute -bottom-[20%] left-1/2 -translate-x-1/2 w-[120%] h-[50%] bg-[#6366f1]/5 blur-[100px] rounded-[100%]" />
      </footer>
    </div>
  );
}
