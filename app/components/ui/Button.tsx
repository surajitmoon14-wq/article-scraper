import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion, type HTMLMotionProps } from 'framer-motion';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children?: React.ReactNode;
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
    'relative inline-flex items-center justify-center rounded-full font-bold tracking-tight overflow-hidden transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 active:scale-95';

  const variants = {
    primary:
      'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl shadow-emerald-200/50',
    secondary:
      'bg-white/50 backdrop-blur-md text-emerald-900 border border-emerald-100 hover:bg-white/80',
    outline:
      'border-2 border-emerald-100 bg-transparent text-emerald-800 hover:bg-emerald-50 hover:border-emerald-200',
  };

  const sizes = {
    sm: 'h-10 px-6 text-xs uppercase tracking-widest',
    md: 'h-12 px-8 text-sm uppercase tracking-widest',
    lg: 'h-16 px-12 text-base uppercase tracking-widest',
  };

  const rippleEffect = {
    initial: { scale: 0, opacity: 0.5 },
    animate: { scale: 4, opacity: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
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
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
            />
            {loadingText ?? 'Loading…'}
          </>
        ) : children}
      </div>

      {/* Ripple Animation on Click */}
      <motion.div
        className="absolute inset-0 bg-white/20 rounded-full"
        variants={rippleEffect}
        initial="initial"
        whileTap="animate"
      />
    </motion.button>
  );
}
