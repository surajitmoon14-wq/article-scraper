'use client';

import React, { useState } from 'react';
import { 
  Calendar, 
  User, 
  Globe, 
  BarChart2, 
  Copy, 
  Check
} from 'lucide-react';
import { Button } from './ui/Button';

interface ResultsViewProps {
  data: {
    title: string;
    author: string | null;
    published_date: string | null;
    content_html: string;
    content_text: string;
    source: string;
    word_count: number;
  };
}

export function ResultsView({ data }: ResultsViewProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(data.content_text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        {/* Header Metadata */}
        <div className="border-b border-gray-100 bg-gray-50/50 p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4 leading-tight break-words">
            {data.title}
          </h1>
          
          <div className="flex flex-wrap gap-y-3 gap-x-6 text-sm text-gray-600">
            {data.author && (
              <div className="flex items-center gap-1.5">
                <User className="h-4 w-4 text-gray-400" />
                <span className="font-medium">{data.author}</span>
              </div>
            )}
            
            {data.published_date && (
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span>{data.published_date}</span>
              </div>
            )}
            
            <div className="flex items-center gap-1.5">
              <Globe className="h-4 w-4 text-gray-400" />
              <span>{data.source}</span>
            </div>
            
            <div className="flex items-center gap-1.5">
              <BarChart2 className="h-4 w-4 text-gray-400" />
              <span>{data.word_count} words</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center px-6 py-3 bg-white border-b border-gray-100">
          <div className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Article Content
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8 text-xs"
            onClick={copyToClipboard}
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 mr-1.5 text-green-600" />
            ) : (
              <Copy className="h-3.5 w-3.5 mr-1.5" />
            )}
            {copied ? 'Copied' : 'Copy Text'}
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-10">
          <article 
            className="prose prose-blue max-w-none 
              prose-headings:text-gray-900 prose-headings:font-bold
              prose-p:text-gray-700 prose-p:leading-relaxed
              prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
              prose-blockquote:border-l-4 prose-blockquote:border-blue-200 prose-blockquote:bg-blue-50/50 prose-blockquote:px-4 prose-blockquote:py-1 prose-blockquote:not-italic
              prose-img:rounded-lg"
            dangerouslySetInnerHTML={{ __html: data.content_html }}
          />
        </div>
      </div>
    </div>
  );
}
