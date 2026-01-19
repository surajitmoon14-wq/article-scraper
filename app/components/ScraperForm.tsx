'use client';

import React, { useState } from 'react';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { Search } from 'lucide-react';

interface ScraperFormProps {
  onScrape: (url: string) => void;
  isLoading: boolean;
}

export function ScraperForm({ onScrape, isLoading }: ScraperFormProps) {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!url) {
      setError('Please enter a URL');
      return;
    }

    try {
      new URL(url);
    } catch {
      setError('Please enter a valid URL (including http/https)');
      return;
    }

    onScrape(url);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Scrape New Article</h2>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <div className="flex-grow">
          <Input
            placeholder="https://example.com/article-url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            error={error}
            disabled={isLoading}
          />
        </div>
        <Button 
          type="submit" 
          isLoading={isLoading} 
          className="sm:w-32"
        >
          {!isLoading && <Search className="h-4 w-4 mr-2" />}
          Scrape
        </Button>
      </form>
      <p className="mt-4 text-xs text-gray-500">
        Enter the full URL of the article you want to extract. Our system will remove ads, navigation, and other clutter.
      </p>
    </div>
  );
}
