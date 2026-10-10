import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium tracking-wide transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed select-none rounded-none uppercase text-xs tracking-widest';

  const variants = {
    primary: 'bg-[#121212] text-white hover:bg-neutral-800 active:bg-black focus:ring-neutral-900 shadow-md',
    secondary: 'bg-neutral-100 text-[#121212] hover:bg-neutral-200 border border-neutral-300 focus:ring-neutral-400',
    outline: 'border border-[#121212] text-[#121212] hover:bg-[#121212] hover:text-white focus:ring-neutral-900',
    ghost: 'text-[#121212] hover:bg-neutral-100 focus:ring-neutral-300',
    danger: 'bg-rose-600 text-white hover:bg-rose-700 focus:ring-rose-500',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-[11px]',
    md: 'px-5 py-2.5 text-xs',
    lg: 'px-8 py-3.5 text-sm',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="w-3.5 h-3.5 animate-spin mr-2 shrink-0" />}
      {children}
    </button>
  );
};
