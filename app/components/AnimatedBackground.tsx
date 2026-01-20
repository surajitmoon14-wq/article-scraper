'use client';

import React from 'react';

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      <div className="absolute inset-0 bg-white" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(37,99,235,0.08),transparent_45%),radial-gradient(circle_at_80%_30%,rgba(29,78,216,0.06),transparent_40%),radial-gradient(circle_at_50%_90%,rgba(2,132,199,0.06),transparent_45%)]" />
    </div>
  );
}
