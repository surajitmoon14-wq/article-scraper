import React, { useState } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-[#f5f5f7] mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          <motion.div
            initial={false}
            animate={{
              boxShadow: isFocused
                ? '0 0 0 2px rgba(99, 102, 241, 0.5), 0 0 20px rgba(99, 102, 241, 0.3)'
                : 'none',
            }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 rounded-xl pointer-events-none"
          />
          <input
            className={cn(
              "relative w-full h-11 sm:h-12 rounded-xl bg-[#1a1a24] border border-[#2a2a3a] px-4 text-sm sm:text-base placeholder:text-gray-500 focus:outline-none focus:border-[#6366f1] transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 text-[#f5f5f7]",
              error && "border-red-500 focus:border-red-500",
              className
            )}
            ref={ref}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />
        </div>
        {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
