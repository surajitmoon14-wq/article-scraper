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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass rounded-[2rem] p-4 sm:p-6 shadow-2xl shadow-emerald-900/5 border border-white/40"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="relative group">
          <div className="absolute left-6 top-1/2 -translate-y-1/2 text-emerald-600/50 group-focus-within:text-emerald-600 transition-colors z-10">
            <Globe className="w-6 h-6" />
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
            className="pl-16 h-20 text-lg rounded-2xl bg-white/40 border-emerald-100 focus:border-emerald-300 focus:ring-emerald-200/20 transition-all placeholder:text-emerald-800/30"
          />
          
          <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:block">
            <Button
              type="submit"
              className="h-14 px-8 text-base font-black rounded-xl bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-200"
              disabled={disabled}
              isLoading={isLoading}
              loadingText="Purifying..."
            >
              Start Extraction
            </Button>
          </div>
        </div>

        <div className="sm:hidden">
          <Button
            type="submit"
            className="w-full h-16 text-base font-black rounded-xl bg-emerald-600 hover:bg-emerald-700"
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
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="flex items-center gap-2 text-red-600 font-bold text-sm bg-red-50/50 backdrop-blur-sm px-6 py-3 rounded-xl border border-red-100 mt-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error || externalError}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </motion.div>
  );
}
