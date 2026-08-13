import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'lime' | 'red' | 'amber' | 'neutral' | 'shopee' | 'tiktok';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  className = '',
}) => {
  const styles = {
    lime: 'bg-lime-950/60 text-lime-400 border-lime-800/50',
    red: 'bg-red-950/60 text-red-400 border-red-800/50',
    amber: 'bg-amber-950/60 text-amber-400 border-amber-800/50',
    neutral: 'bg-neutral-800 text-neutral-300 border-neutral-700',
    shopee: 'bg-orange-950/80 text-orange-400 border-orange-800/60 font-semibold',
    tiktok: 'bg-cyan-950/80 text-cyan-400 border-cyan-800/60 font-semibold',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg border ${styles[variant]} ${className}`}>
      {children}
    </span>
  );
};
