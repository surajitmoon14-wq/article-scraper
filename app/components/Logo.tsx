import React from 'react';

export function Logo({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0"
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      {/* Abstract flowing shape */}
      <path
        d="M8 6C8 6 10 4 16 4C22 4 24 6 24 6V14C24 14 22 12 16 12C10 12 8 14 8 14V6Z"
        fill="url(#logoGradient)"
        opacity="0.9"
      />
      <path
        d="M8 14C8 14 10 16 16 16C22 16 24 14 24 14V22C24 22 22 20 16 20C10 20 8 22 8 22V14Z"
        fill="url(#logoGradient)"
        opacity="0.7"
      />
      <path
        d="M8 22C8 22 10 24 16 24C22 24 24 22 24 22V26C24 26 22 28 16 28C10 28 8 26 8 26V22Z"
        fill="url(#logoGradient)"
        opacity="0.5"
      />
    </svg>
  );
}
