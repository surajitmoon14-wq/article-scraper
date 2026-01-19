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
          <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-3 ml-2">
            {label}
          </label>
        )}
        <div className="relative group">
          <motion.div
            initial={false}
            animate={{
              opacity: isFocused ? 1 : 0,
              scale: isFocused ? 1 : 0.98,
            }}
            transition={{ duration: 0.3 }}
            className="absolute -inset-[1px] bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#6366f1] rounded-[22px] blur-[2px] pointer-events-none"
          />
          <input
            className={cn(
              "relative w-full h-14 sm:h-16 rounded-[21px] bg-[#0a0a0f] border border-[#2a2a3a] px-6 text-base sm:text-lg placeholder:text-gray-600 focus:outline-none focus:border-transparent transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 text-white font-medium",
              error && "border-red-500/50",
              className
            )}
            ref={ref}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />
        </div>
        {error && (
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 ml-2 text-xs font-bold text-red-400 uppercase tracking-widest"
          >
            {error}
          </motion.p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
