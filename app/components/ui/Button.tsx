import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion, type HTMLMotionProps } from 'framer-motion';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends HTMLMotionProps<'button'> {
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
    'relative inline-flex items-center justify-center rounded-full font-bold tracking-tight overflow-hidden transition-all duration-500 disabled:pointer-events-none disabled:opacity-50 active:scale-95';

  const variants = {
    primary:
      'bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white shadow-[0_10px_30px_rgba(99,102,241,0.3)] hover:shadow-[0_15px_40px_rgba(99,102,241,0.5)]',
    secondary:
      'bg-[#1a1a24] text-white hover:bg-[#252532] border border-[#2a2a3a]',
    outline:
      'border border-[#2a2a3a] bg-transparent text-[#f5f5f7] hover:bg-[#1a1a24] hover:border-[#6366f1]',
  };

  const sizes = {
    sm: 'h-10 px-6 text-xs uppercase tracking-widest',
    md: 'h-12 px-8 text-sm uppercase tracking-widest',
    lg: 'h-16 px-12 text-base uppercase tracking-widest',
  };

  return (
    <motion.button
      whileHover={{ scale: isLoading || disabled ? 1 : 1.02 }}
      whileTap={{ scale: isLoading || disabled ? 1 : 0.98 }}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={isLoading || disabled}
      aria-busy={isLoading ? true : undefined}
      {...props}
    >
      <div className="relative z-10 flex items-center gap-2">
        {isLoading ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
            />
            {loadingText ?? 'Loading…'}
          </>
        ) : children}
      </div>
      
      {/* Gloss Effect on Hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
    </motion.button>
  );
}
