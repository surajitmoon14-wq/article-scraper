'use client';

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { ScraperForm } from './components/ScraperForm';
import { ResultsView } from './components/ResultsView';
import { AlertCircle, Info } from 'lucide-react';

interface ScrapeData {
  title: string;
  author: string | null;
  published_date: string | null;
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
        throw new Error(result.error || 'Failed to scrape the article');
      }

      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:py-12">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-3">
            Professional Article Scraper
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Extract clean, readable content from any news or blog article instantly.
            Perfect for researchers, developers, and content creators.
          </p>
        </div>

        <div className="space-y-8">
          <ScraperForm onScrape={handleScrape} isLoading={isLoading} />

          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-red-400 mr-3" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          )}

          {!isLoading && !data && !error && (
            <div className="bg-blue-50 border border-blue-100 p-6 rounded-lg flex gap-4">
              <div className="bg-blue-100 p-2 rounded-full h-fit">
                <Info className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-blue-900 font-semibold mb-1">Getting Started</h3>
                <p className="text-blue-800 text-sm leading-relaxed">
                  Paste an article URL above and click "Scrape". Our engine will analyze the page,
                  identify the main content, and remove all distracting elements like ads and popups.
                </p>
              </div>
            </div>
          )}

          {isLoading && (
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse" />
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse" />
              </div>
            </div>
          )}

          {data && <ResultsView data={data} />}
        </div>
      </main>

      <footer className="mt-auto py-8 border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} ArticleScraperPro. Built for professional content extraction.
        </div>
      </footer>
    </div>
  );
}
