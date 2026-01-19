import React from 'react';

export function Navbar() {
  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="flex h-12 items-center">
          <div className="text-base font-semibold tracking-tight text-gray-900">
            GuardianExtractor
          </div>
        </div>
      </div>
    </nav>
  );
}
