'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from './ui/Input';
import { Button } from './ui/Button';

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
      transition={{ duration: 0.6, delay: 0.2 }}
      className="relative rounded-2xl bg-[#1a1a24] border border-[#2a2a3a] p-6 sm:p-8"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-6">
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
        />

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6">
          <Button
            type="submit"
            className="w-full sm:w-auto sm:min-w-[160px]"
            disabled={disabled}
            size="lg"
          >
            {isLoading ? 'Extracting…' : 'Extract Article'}
          </Button>

          {externalError ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-red-400 flex items-center gap-2"
            >
              <svg
                className="w-4 h-4 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {externalError}
            </motion.p>
          ) : null}
        </div>
      </form>
    </motion.div>
  );
}
