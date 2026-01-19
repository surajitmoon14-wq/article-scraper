'use client';

import React, { useEffect, useId, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/Button';
import { Check, FileText, Calendar, User, Hash } from 'lucide-react';

interface ResultsViewProps {
  data: {
    title: string;
    author: string | null;
    published_date: string;
    content_html: string;
    content_text: string;
    source: string;
    word_count: number;
  };
}

export function ResultsView({ data }: ResultsViewProps) {
  const [showToast, setShowToast] = useState(false);
  const toastId = useId();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(data.content_text);
      setShowToast(true);
      return;
    } catch {
      // Fall through to basic DOM fallback
    }

    try {
      const textarea = document.createElement('textarea');
      textarea.value = data.content_text;
      textarea.setAttribute('readonly', 'true');
      textarea.style.position = 'fixed';
      textarea.style.left = '-9999px';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setShowToast(true);
    } catch {
      // Ignore
    }
  };

  useEffect(() => {
    if (!showToast) return;
    const timer = window.setTimeout(() => setShowToast(false), 2000);
    return () => window.clearTimeout(timer);
  }, [showToast]);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      aria-label="Result"
      className="relative rounded-2xl bg-[#1a1a24] border border-[#2a2a3a] overflow-hidden"
    >
      {/* Glow effect */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#6366f1]" />

      <header className="px-6 sm:px-8 py-6 border-b border-[#2a2a3a]">
        <h2 className="text-xl sm:text-2xl font-semibold leading-tight text-[#f5f5f7]">
          {data.title}
        </h2>

        <div className="mt-4 flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-gray-400">
          {data.author && (
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-[#6366f1]" />
              <span>{data.author}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#6366f1]" />
            <span>{formatDate(data.published_date)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Hash className="w-4 h-4 text-[#6366f1]" />
            <span>{data.word_count.toLocaleString()} words</span>
          </div>
        </div>
      </header>

      <div className="relative px-6 sm:px-8 py-6">
        <div className="flex justify-end mb-6">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={copyToClipboard}
            className="relative"
          >
            {showToast ? (
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4" />
                Copied!
              </span>
            ) : (
              'Copy article text'
            )}
          </Button>
        </div>

        <div className="sr-only" aria-live="polite" aria-atomic="true" id={toastId}>
          {showToast ? 'Copied to clipboard' : ''}
        </div>

        <div className="mx-auto max-w-3xl">
          <article
            className="prose prose-invert prose-lg max-w-none prose-headings:font-semibold prose-headings:text-[#f5f5f7] prose-p:text-gray-300 prose-p:leading-8 prose-p:text-base sm:prose-p:text-lg prose-a:text-[#6366f1] hover:prose-a:text-[#8b5cf6] prose-a:no-underline hover:prose-a:underline prose-strong:text-[#f5f5f7]"
            dangerouslySetInnerHTML={{ __html: data.content_html }}
          />
        </div>
      </div>
    </motion.section>
  );
}
