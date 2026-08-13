import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'accent' | 'danger' | 'ghost';
  id?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'default',
  id,
}) => {
  const variantStyles = {
    default: 'bg-neutral-900/90 border-neutral-800/80 text-neutral-100',
    accent: 'bg-neutral-900/90 border-lime-500/30 text-neutral-100 shadow-lg shadow-lime-950/10',
    danger: 'bg-red-950/20 border-red-800/40 text-red-100',
    ghost: 'bg-neutral-900/40 border-neutral-800/40 text-neutral-300',
  };

  return (
    <div
      id={id}
      className={`rounded-2xl border p-5 backdrop-blur-sm transition-all duration-200 ${variantStyles[variant]} ${className}`}
    >
      {children}
    </div>
  );
};
