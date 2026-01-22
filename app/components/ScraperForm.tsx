'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { Globe, AlertCircle } from 'lucide-react';

interface ScraperFormProps {
  onScrape: (url: string) => void;
  isLoading: boolean;
  externalError?: string | null;
}

function isValidGuardianArticleUrl(value: string): boolean {
  try {
    const parsed = new URL(value);
    if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') return false;
    if (parsed.hostname !== 'www.theguardian.com') return false;
    if (!parsed.pathname || parsed.pathname === '/') return false;
    return true;
  } catch {
    return false;
  }
}

export function ScraperForm({ onScrape, isLoading, externalError }: ScraperFormProps) {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const validationMessage = 'Please enter a valid The Guardian article URL.';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmed = url.trim();

    if (!trimmed || !isValidGuardianArticleUrl(trimmed)) {
      setError(validationMessage);
      return;
    }

    setError('');
    onScrape(trimmed);
  };

  const disabled = isLoading || url.trim().length === 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="glass rounded-[2.5rem] p-6 sm:p-8 shadow-[0_20px_50px_rgba(16,185,129,0.1)] border border-white/60 relative overflow-hidden"
    >
      {/* Decorative inner glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.05),transparent_70%)] pointer-events-none" />

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
        <div className="relative group">
          <div className="absolute left-7 top-1/2 -translate-y-1/2 text-emerald-600/40 group-focus-within:text-emerald-600 transition-all duration-500 z-10 group-focus-within:scale-110">
            <Globe className="w-7 h-7" />
          </div>
          <Input
            placeholder="Paste Guardian article link..."
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              if (error) setError('');
            }}
            error={error}
            disabled={isLoading}
            inputMode="url"
            autoComplete="off"
            className="pl-20 h-24 text-xl rounded-3xl bg-white/60 border-emerald-100/50 focus:border-emerald-400 focus:ring-8 focus:ring-emerald-500/5 transition-all duration-500 placeholder:text-emerald-800/20 font-medium"
          />
          
          <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden lg:block">
            <Button
              type="submit"
              size="lg"
              className="px-10 h-16 text-lg font-black rounded-2xl bg-emerald-600 hover:bg-emerald-700 shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all active:scale-95"
              disabled={disabled}
              isLoading={isLoading}
              loadingText="Purifying..."
            >
              Start Extraction
            </Button>
          </div>
        </div>

        <div className="lg:hidden">
          <Button
            type="submit"
            className="w-full h-20 text-xl font-black rounded-2xl bg-emerald-600 hover:bg-emerald-700 shadow-xl shadow-emerald-500/20"
            disabled={disabled}
            isLoading={isLoading}
            loadingText="Purifying..."
          >
            Start Extraction
          </Button>
        </div>

        <AnimatePresence>
          {(error || externalError) && (
            <motion.div
              initial={{ opacity: 0, y: 10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: 10, height: 0 }}
              className="overflow-hidden"
            >
              <div className="flex items-center gap-3 text-red-600 font-bold text-sm bg-red-50/80 backdrop-blur-md px-8 py-4 rounded-2xl border border-red-100 mt-2 shadow-sm">
                <AlertCircle className="w-5 h-5 shrink-0" />
                {error || externalError}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>

      {/* Loading Overlay */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-white/40 backdrop-blur-sm z-20 flex flex-col items-center justify-center gap-4"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-600 rounded-full"
          />
          <span className="text-emerald-800 font-black tracking-widest uppercase text-sm animate-pulse">Purifying Article...</span>
        </motion.div>
      )}
    </motion.div>
  );
}
