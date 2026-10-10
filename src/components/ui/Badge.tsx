import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'black' | 'sale' | 'new' | 'stock' | 'outline';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'black', className = '' }) => {
  const styles = {
    black: 'bg-[#121212] text-white',
    sale: 'bg-rose-600 text-white font-semibold',
    new: 'bg-emerald-700 text-white font-semibold',
    stock: 'bg-amber-100 text-amber-900 border border-amber-300 font-medium',
    outline: 'border border-neutral-300 text-neutral-700 bg-white',
  };

  return (
    <span className={`inline-block px-2.5 py-0.5 text-[10px] uppercase tracking-widest ${styles[variant]} ${className}`}>
      {children}
    </span>
  );
};
