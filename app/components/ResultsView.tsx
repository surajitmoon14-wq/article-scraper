'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/Button';
import { Check, Calendar, User, Hash, Copy, Share2, BookOpen } from 'lucide-react';

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

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(data.content_text);
      setShowToast(true);
    } catch {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = data.content_text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setShowToast(true);
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-lg"
    >
      <header className="px-8 sm:px-16 pt-16 pb-12 text-center border-b border-gray-200">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wide mb-8"
        >
          <BookOpen className="w-3 h-3" />
          Article Extracted
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl sm:text-5xl font-black text-gray-900 mb-8 tracking-tight leading-tight max-w-4xl mx-auto"
        >
          {data.title}
        </motion.h2>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-6 text-sm font-semibold text-gray-600"
        >
          {data.author && (
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-blue-600" />
              <span>{data.author}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-600" />
            <span>{formatDate(data.published_date)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Hash className="w-4 h-4 text-blue-600" />
            <span>{data.word_count.toLocaleString()} words</span>
          </div>
        </motion.div>
      </header>

      <div className="px-8 sm:px-16 py-12">
        <div className="flex items-center justify-between mb-12">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Article Content</h3>
          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={copyToClipboard}
            >
              {showToast ? (
                <span className="flex items-center gap-2 text-green-600">
                  <Check className="w-4 h-4" />
                  Copied
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Copy className="w-4 h-4" />
                  Copy Text
                </span>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
            >
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <article
          className="prose prose-lg max-w-3xl mx-auto prose-p:text-gray-700 prose-p:leading-relaxed prose-p:text-lg sm:prose-p:text-xl prose-headings:text-gray-900 prose-headings:font-bold prose-strong:text-gray-900"
          dangerouslySetInnerHTML={{ __html: data.content_html }}
        />
      </div>

      <footer className="px-8 sm:px-16 py-8 bg-gray-50 border-t border-gray-200 text-center">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          Source: {data.source}
        </p>
      </footer>

      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 bg-blue-600 text-white rounded-full font-bold shadow-lg"
          >
            Copied to clipboard
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
