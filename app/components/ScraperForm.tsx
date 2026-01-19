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
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative p-[1px] rounded-[32px] overflow-hidden"
    >
      {/* Animated Border Gradient */}
      <motion.div 
        animate={{ 
          rotate: [0, 360],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute inset-[-50%] bg-[conic-gradient(from_0deg,#6366f1,transparent,transparent,#8b5cf6,transparent,transparent,#6366f1)]"
      />

      <div className="relative bg-[#1a1a24] rounded-[31px] p-6 sm:p-10 shadow-2xl">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#6366f1] transition-colors">
              <Globe className="w-5 h-5" />
            </div>
            <Input
              placeholder="https://www.theguardian.com/..."
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                if (error) setError('');
              }}
              error={error}
              disabled={isLoading}
              inputMode="url"
              autoComplete="off"
              className="pl-12 transition-all"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <Button
              type="submit"
              className="w-full sm:w-auto h-14 sm:h-16 px-10 text-lg font-bold tracking-tight"
              disabled={disabled}
              isLoading={isLoading}
              loadingText="Deconstructing..."
            >
              Start Extraction
            </Button>

            <AnimatePresence>
              {externalError && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="flex items-center gap-2 text-red-400 font-medium text-sm bg-red-400/10 px-4 py-2 rounded-full border border-red-400/20"
                >
                  <AlertCircle className="w-4 h-4" />
                  {externalError}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
