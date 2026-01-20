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
    <div className="flex min-h-screen flex-col bg-white text-gray-900">
      <AnimatedBackground />

      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 px-4">
          {/* Hero Content */}
          <div className="relative z-10 max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-8 inline-block"
            >
              <div className="px-6 py-2 rounded-full bg-gray-100 border border-gray-200">
                <span className="text-sm font-medium tracking-wide text-gray-600 uppercase">Premium Content Extraction</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl sm:text-7xl lg:text-8xl font-black text-gray-900 mb-8 tracking-tight leading-tight"
            >
              The Art of
              <br />
              <span className="text-blue-600 italic">
                Pure Reading
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12"
            >
              Experience The Guardian like never before. We strip away the digital clutter, 
              leaving only the words that matter in a beautiful, focused environment.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <button
                onClick={scrollToExtractor}
                className="px-10 py-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-3"
              >
                Get Started
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <button
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-gray-600 hover:text-gray-900 font-semibold transition-colors flex items-center gap-2"
              >
                Learn more
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </div>
        </section>

        {/* Tool Section */}
        <section id="extractor" className="relative py-24 px-4 flex flex-col items-center bg-gray-50">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-6">Article Extractor</h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Paste your Guardian URL below and watch the magic happen.
            </p>
          </motion.div>

          <div className="w-full max-w-4xl">
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
      <footer className="relative py-16 px-4 bg-white border-t border-gray-200">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-center text-center gap-8">
            <div className="flex flex-col items-center gap-3">
              <Logo size={36} glow={false} />
              <span className="text-xl font-black tracking-tight text-gray-900">EXTRACT.</span>
            </div>

            <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4">
              {['Features', 'Process', 'Privacy', 'API'].map((item) => (
                <a key={item} href="#" className="text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors">
                  {item}
                </a>
              ))}
            </nav>

            <div className="w-full max-w-2xl h-px bg-gray-200" />

            <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-4 text-gray-500 text-xs">
              <p>© 2024 Pure Reading Experience</p>
              <p>Powered by The Guardian Content API</p>
              <p>Built for the Web</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
