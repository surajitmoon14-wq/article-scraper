'use client';

import React, { useState } from 'react';
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
    <div className="rounded-lg border border-gray-200 bg-white p-5 sm:p-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
        <div className="flex-1">
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
        </div>
        <Button type="submit" className="sm:w-32" disabled={disabled}>
          {isLoading ? 'Extracting…' : 'Extract'}
        </Button>
      </form>

      {externalError ? (
        <p className="mt-3 text-sm text-red-600">{externalError}</p>
      ) : null}
    </div>
  );
}
