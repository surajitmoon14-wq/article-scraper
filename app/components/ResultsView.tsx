'use client';

import React, { useEffect, useId, useState } from 'react';
import { Button } from './ui/Button';

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

  const metadata = [
    data.author ?? 'Unknown author',
    data.published_date,
    data.source,
    `${data.word_count.toLocaleString()} words`,
  ].filter(Boolean);

  return (
    <section aria-label="Result" className="rounded-lg border border-gray-200 bg-white">
      <header className="border-b border-gray-200 px-5 py-5 sm:px-6">
        <h2 className="text-lg font-semibold leading-snug text-gray-900 sm:text-xl">
          {data.title}
        </h2>
        <p className="mt-2 text-sm text-gray-600">{metadata.join(' • ')}</p>
      </header>

      <div className="relative px-5 py-5 sm:px-6 sm:py-6">
        <div className="flex justify-end">
          <Button type="button" variant="outline" size="sm" onClick={copyToClipboard}>
            Copy article text
          </Button>
        </div>

        <div className="sr-only" aria-live="polite" aria-atomic="true" id={toastId}>
          {showToast ? 'Copied to clipboard' : ''}
        </div>

        {showToast ? (
          <div className="pointer-events-none absolute right-5 top-14 rounded-md border border-gray-200 bg-white px-3 py-1 text-xs text-gray-700 sm:right-6">
            Copied to clipboard
          </div>
        ) : null}

        <div className="mt-5">
          <div className="mx-auto max-w-2xl">
            <article
              className="prose prose-gray max-w-none prose-headings:font-semibold prose-headings:text-gray-900 prose-p:text-gray-800 prose-p:leading-7"
              dangerouslySetInnerHTML={{ __html: data.content_html }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
