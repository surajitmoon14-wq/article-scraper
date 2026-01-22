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
    thumbnail: string | null;
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
      className="bg-white/80 border border-emerald-100 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-emerald-900/5 backdrop-blur-md"
    >
      <header className="px-8 sm:px-16 pt-16 pb-12 text-center border-b border-emerald-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-black uppercase tracking-widest mb-8"
        >
          <BookOpen className="w-3 h-3" />
          Article Purified
        </motion.div>

        {data.thumbnail && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-12 relative aspect-video w-full max-w-3xl mx-auto overflow-hidden rounded-[2rem] shadow-xl"
          >
            <img 
              src={data.thumbnail} 
              alt={data.title}
              className="object-cover w-full h-full"
            />
          </motion.div>
        )}

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 mb-8 tracking-tighter leading-tight max-w-4xl mx-auto"
        >
          {data.title}
        </motion.h2>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-8 text-sm font-bold text-slate-500"
        >
          {data.author && (
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-emerald-600" />
              <span>{data.author}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-emerald-600" />
            <span>{formatDate(data.published_date)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Hash className="w-4 h-4 text-emerald-600" />
            <span>{data.word_count.toLocaleString()} words</span>
          </div>
        </motion.div>
      </header>

      <div className="px-8 sm:px-16 py-16">
        <div className="flex items-center justify-between mb-16">
          <h3 className="text-xs font-black text-emerald-800/40 uppercase tracking-[0.2em]">Article Content</h3>
          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={copyToClipboard}
              className="border-emerald-100 hover:bg-emerald-50 hover:border-emerald-200 text-emerald-800"
            >
              {showToast ? (
                <span className="flex items-center gap-2 text-emerald-600">
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
              className="border-emerald-100 hover:bg-emerald-50 hover:border-emerald-200 text-emerald-800"
            >
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <article
          className="prose prose-emerald prose-lg max-w-3xl mx-auto prose-p:text-slate-700 prose-p:leading-[1.8] prose-p:text-lg sm:prose-p:text-xl prose-headings:text-slate-900 prose-headings:font-black prose-strong:text-emerald-900"
          dangerouslySetInnerHTML={{ __html: data.content_html }}
        />
      </div>

      <footer className="px-8 sm:px-16 py-10 bg-emerald-50/30 border-t border-emerald-50 text-center">
        <p className="text-xs font-black text-emerald-800/40 uppercase tracking-[0.3em]">
          Source: {data.source}
        </p>
      </footer>

      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] px-8 py-4 bg-emerald-600 text-white rounded-full font-black shadow-2xl shadow-emerald-900/20"
          >
            Purified text copied to clipboard
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
