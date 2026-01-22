'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { ScraperForm } from './components/ScraperForm';
import { ResultsView } from './components/ResultsView';
import { AnimatedBackground } from './components/AnimatedBackground';
import { AboutSection } from './components/AboutSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { Logo } from './components/Logo';
import { ArrowRight } from 'lucide-react';

interface ScrapeData {
  title: string;
  author: string | null;
  published_date: string;
  content_html: string;
  content_text: string;
  source: string;
  word_count: number;
  thumbnail: string | null;
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<ScrapeData | null>(null);
  const [error, setError] = useState<string | null>(null);

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
    <div className="flex min-h-screen flex-col bg-[#f0f9f6] text-slate-900">
      <AnimatedBackground />

      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20 px-4">
          {/* Hero Content */}
          <div className="relative z-10 max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-8 inline-block"
            >
              <div className="px-6 py-2 rounded-full bg-emerald-50 border border-emerald-100 backdrop-blur-md">
                <span className="text-sm font-bold tracking-widest text-emerald-700 uppercase">Premium Reading Experience</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl sm:text-7xl lg:text-9xl font-black text-slate-900 mb-8 tracking-tight leading-none"
            >
              The Art of
              <br />
              <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600 bg-clip-text text-transparent animate-gradient-x italic">
                Pure Reading
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg sm:text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-12"
            >
              Escape the digital noise. We transform cluttered Guardian articles into a serene, 
              distraction-free sanctuary for deep focus and pure understanding.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <button
                onClick={scrollToExtractor}
                className="px-12 py-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xl transition-all duration-500 shadow-[0_20px_40px_rgba(16,185,129,0.3)] hover:shadow-[0_25px_50px_rgba(16,185,129,0.4)] flex items-center gap-4 active:scale-95 group relative overflow-hidden"
              >
                <span className="relative z-10">Start Extraction</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform relative z-10" />
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
              </button>
              
              <button
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-12 py-5 rounded-2xl bg-white/60 backdrop-blur-md border border-emerald-100 text-emerald-950 font-black text-xl transition-all duration-500 hover:bg-white/90 flex items-center gap-2 active:scale-95 shadow-lg shadow-emerald-900/5 hover:border-emerald-300"
              >
                Learn More
              </button>
            </motion.div>
          </div>

          {/* Floating Wave Behind Content */}
          <motion.div 
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 2, 0]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[150%] h-[30%] opacity-20 pointer-events-none"
          >
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full fill-emerald-400">
              <path d="M0,60 C150,110 300,10 450,60 C600,110 750,10 900,60 C1050,110 1200,60 1200,60 V120 H0 Z" />
            </svg>
          </motion.div>
        </section>

        {/* Tool Section */}
        <section id="extractor" className="relative py-48 px-4 flex flex-col items-center overflow-hidden">
          {/* Section Decoration */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.03),transparent_70%)] pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20 relative z-10"
          >
            <h2 className="text-4xl sm:text-6xl font-black text-slate-900 mb-8 tracking-tighter leading-tight">
              Ready to <span className="text-emerald-600 italic">Purify?</span>
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-xl leading-relaxed font-medium">
              Join thousands of readers who have rediscovered the joy of pure focus. 
              Paste your article link below to begin.
            </p>
          </motion.div>

          <div className="w-full max-w-4xl relative z-20">
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
        <AboutSection />
        <HowItWorksSection />
      </main>

      {/* Footer */}
      <footer className="relative py-24 px-4 bg-emerald-950 text-emerald-100 overflow-hidden">
        {/* Animated background element for footer */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-50" />
        
        <div className="mx-auto max-w-7xl relative z-10">
          <div className="flex flex-col items-center justify-center text-center gap-12">
            <div className="flex flex-col items-center gap-4">
              <Logo size={48} glow={true} />
              <span className="text-2xl font-black tracking-[0.2em] text-white">PURE.</span>
            </div>

            <nav className="flex flex-wrap justify-center gap-x-12 gap-y-6">
              {['Features', 'Process', 'Privacy', 'API'].map((item) => (
                <a key={item} href="#" className="text-sm font-black uppercase tracking-widest text-emerald-300/60 hover:text-white transition-all duration-300">
                  {item}
                </a>
              ))}
            </nav>

            <div className="w-full max-w-4xl h-px bg-emerald-900" />

            <div className="flex flex-col md:flex-row items-center justify-between w-full gap-8 text-emerald-500/50 text-xs font-bold uppercase tracking-widest">
              <p>© 2024 Pure Reading Experience</p>
              <div className="flex gap-8">
                <p>Guardian Content API</p>
                <p>Distraction-Free</p>
              </div>
              <p>Crafted for Clarity</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
