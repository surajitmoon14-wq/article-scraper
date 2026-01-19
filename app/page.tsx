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
    <div className="flex min-h-screen flex-col">
      <AnimatedBackground />

      <Navbar />

      <main className="flex-1 pt-16 sm:pt-20">
        {/* Hero Section */}
        <section className="relative py-16 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              {/* Animated logo in hero */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="flex justify-center mb-8"
              >
                <div className="relative">
                  <motion.div
                    animate={{
                      boxShadow: [
                        '0 0 20px rgba(99, 102, 241, 0.3)',
                        '0 0 40px rgba(99, 102, 241, 0.5)',
                        '0 0 20px rgba(99, 102, 241, 0.3)',
                      ],
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute inset-0 rounded-3xl blur-2xl bg-[#6366f1]/20"
                  />
                  <div className="relative p-6 bg-[#1a1a24]/50 backdrop-blur-sm rounded-3xl border border-[#2a2a3a]">
                    <Logo size={64} />
                  </div>
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl sm:text-5xl lg:text-7xl font-bold text-[#f5f5f7] mb-6 tracking-tight"
              >
                Extract Content
                <br />
                <span className="bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#6366f1] bg-clip-text text-transparent">
                  Without the Noise
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-10"
              >
                Clean, readable Guardian articles in seconds. No ads, no sidebars, just the content
                you need.
              </motion.p>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                onClick={scrollToExtractor}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white rounded-xl font-semibold text-base sm:text-lg hover:from-[#5558e8] hover:to-[#7a4df0] transition-all duration-300 shadow-lg shadow-[#6366f1]/25 hover:shadow-xl hover:shadow-[#6366f1]/35"
              >
                Start Extracting
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </section>

        {/* Input Section */}
        <section id="extractor" className="py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <ScraperForm onScrape={handleScrape} isLoading={isLoading} externalError={error} />
          </div>
        </section>

        {/* Results Section */}
        {data ? (
          <section id="results" className="py-16 sm:py-24">
            <div className="mx-auto max-w-5xl px-4 sm:px-6">
              <ResultsView data={data} />
            </div>
          </section>
        ) : null}

        {/* About Section */}
        <AboutSection />

        {/* How It Works Section */}
        <HowItWorksSection />
      </main>

      {/* Footer */}
      <footer className="border-t border-[#2a2a3a] bg-[#0f0f14] py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <Logo size={28} />
              <span className="text-lg font-semibold text-[#f5f5f7]">Extract</span>
            </div>

            <p className="text-sm text-gray-500 text-center sm:text-left">
              Content provided via The Guardian Content API
            </p>

            <div className="text-sm text-gray-500">
              Built with care for clean reading
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
