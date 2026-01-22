'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/Button';
import { Check, Calendar, User, Hash, Copy, Share2, BookOpen } from 'lucide-react';
import Image from 'next/image';

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
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white/90 border border-emerald-100 rounded-[3rem] overflow-hidden shadow-[0_40px_100px_rgba(16,185,129,0.1)] backdrop-blur-xl relative"
    >
      {/* Decorative accent */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-400" />

      <header className="px-8 sm:px-20 pt-20 pb-16 text-center border-b border-emerald-50 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-black uppercase tracking-[0.2em] mb-12 shadow-sm"
        >
          <BookOpen className="w-4 h-4" />
          Purification Complete
        </motion.div>

        {data.thumbnail && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mb-16 relative aspect-[21/9] w-full max-w-4xl mx-auto overflow-hidden rounded-[2.5rem] shadow-2xl group"
          >
            <Image 
              src={data.thumbnail} 
              alt={data.title}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>
        )}

        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 mb-10 tracking-tighter leading-[1.1] max-w-5xl mx-auto"
        >
          {data.title}
        </motion.h2>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-10 text-sm font-black text-slate-500/60 uppercase tracking-widest"
        >
          {data.author && (
            <div className="flex items-center gap-3 group">
              <div className="p-2 rounded-full bg-emerald-50 group-hover:bg-emerald-100 transition-colors">
                <User className="w-4 h-4 text-emerald-600" />
              </div>
              <span className="text-slate-700">{data.author}</span>
            </div>
          )}
          <div className="flex items-center gap-3 group">
            <div className="p-2 rounded-full bg-emerald-50 group-hover:bg-emerald-100 transition-colors">
              <Calendar className="w-4 h-4 text-emerald-600" />
            </div>
            <span className="text-slate-700">{formatDate(data.published_date)}</span>
          </div>
          <div className="flex items-center gap-3 group">
            <div className="p-2 rounded-full bg-emerald-50 group-hover:bg-emerald-100 transition-colors">
              <Hash className="w-4 h-4 text-emerald-600" />
            </div>
            <span className="text-slate-700">{data.word_count.toLocaleString()} Words</span>
          </div>
        </motion.div>
      </header>

      <div className="px-8 sm:px-20 py-20 relative z-10 bg-white/30 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-20 max-w-4xl mx-auto">
          <div className="h-px bg-emerald-100 flex-1" />
          <h3 className="px-8 text-xs font-black text-emerald-800/30 uppercase tracking-[0.4em] whitespace-nowrap">Content</h3>
          <div className="h-px bg-emerald-100 flex-1" />
        </div>

        <article
          className="prose prose-emerald prose-xl max-w-4xl mx-auto prose-p:text-slate-700 prose-p:leading-[2] prose-p:text-lg sm:prose-p:text-2xl prose-headings:text-slate-900 prose-headings:font-black prose-strong:text-emerald-900 prose-img:rounded-3xl"
          dangerouslySetInnerHTML={{ __html: data.content_html }}
        />

        <div className="mt-24 flex justify-center gap-6">
          <Button
            type="button"
            size="lg"
            variant="primary"
            onClick={copyToClipboard}
            className="rounded-2xl px-12"
          >
            {showToast ? (
              <span className="flex items-center gap-3">
                <Check className="w-6 h-6" />
                Copied
              </span>
            ) : (
              <span className="flex items-center gap-3">
                <Copy className="w-6 h-6" />
                Copy Purified Text
              </span>
            )}
          </Button>
          <Button
            type="button"
            size="lg"
            variant="secondary"
            className="rounded-2xl w-16 px-0"
          >
            <Share2 className="w-6 h-6" />
          </Button>
        </div>
      </div>

      <footer className="px-8 sm:px-20 py-12 bg-emerald-50/40 border-t border-emerald-100 text-center relative z-10">
        <p className="text-xs font-black text-emerald-800/30 uppercase tracking-[0.5em]">
          Origin: {data.source}
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
