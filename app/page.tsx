'use client';

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { ScraperForm } from './components/ScraperForm';
import { ResultsView } from './components/ResultsView';

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
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />

      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-10 sm:px-6">
        <section className="text-center">
          <h1 className="text-3xl font-semibold text-gray-900 sm:text-4xl">
            Guardian Article Extractor
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-base text-gray-600 sm:text-lg">
            Extract clean, readable content from The Guardian articles instantly.
          </p>
        </section>

        <section className="mt-8 sm:mt-10">
          <ScraperForm onScrape={handleScrape} isLoading={isLoading} externalError={error} />
        </section>

        {data ? (
          <section className="mt-8 sm:mt-10">
            <ResultsView data={data} />
          </section>
        ) : null}
      </main>

      <footer className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-6 text-center sm:px-6">
          <p className="text-xs text-gray-500">Content provided via The Guardian Content API.</p>
        </div>
      </footer>
    </div>
  );
}
