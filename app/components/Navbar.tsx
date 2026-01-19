import React from 'react';
import { Newspaper } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <Newspaper className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold text-gray-900 tracking-tight">
              ArticleScraper<span className="text-blue-600">Pro</span>
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-6">
            <a href="#" className="text-sm font-medium text-gray-500 hover:text-gray-900">Dashboard</a>
            <a href="#" className="text-sm font-medium text-gray-500 hover:text-gray-900">History</a>
            <a href="#" className="text-sm font-medium text-gray-500 hover:text-gray-900">Settings</a>
          </div>
        </div>
      </div>
    </nav>
  );
}
