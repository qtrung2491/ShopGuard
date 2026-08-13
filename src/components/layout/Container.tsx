import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const Container: React.FC<ContainerProps> = ({ children, className = '' }) => {
  return (
    <main className={`max-w-6xl mx-auto px-4 py-6 md:py-8 ${className}`}>
      {children}
    </main>
  );
};
