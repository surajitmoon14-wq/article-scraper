import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingText?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({
  children,
  className,
  isLoading,
  loadingText,
  variant = 'primary',
  size = 'md',
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:ring-offset-2 focus:ring-offset-[#0f0f14] disabled:pointer-events-none disabled:opacity-50 transition-all duration-200';

  const variants = {
    primary:
      'bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white hover:from-[#5558e8] hover:to-[#7a4df0] shadow-lg shadow-[#6366f1]/25 hover:shadow-xl hover:shadow-[#6366f1]/35',
    secondary:
      'bg-[#1a1a24] text-white hover:bg-[#252532] border border-[#2a2a3a]',
    outline:
      'border border-[#2a2a3a] bg-transparent text-[#f5f5f7] hover:bg-[#252532] hover:border-[#6366f1]',
  };

  const sizes = {
    sm: 'h-9 px-4 text-xs',
    md: 'h-11 px-6 text-sm',
    lg: 'h-14 px-8 text-base',
  };

  return (
    <motion.div
      whileHover={{ scale: isLoading || disabled ? 1 : 1.02 }}
      whileTap={{ scale: isLoading || disabled ? 1 : 0.98 }}
      className="inline-block"
    >
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={isLoading || disabled}
        aria-busy={isLoading ? true : undefined}
        {...props}
      >
        {isLoading ? (loadingText ?? 'Loading…') : children}
      </button>
    </motion.div>
  );
}
