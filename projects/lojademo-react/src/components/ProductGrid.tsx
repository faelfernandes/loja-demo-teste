import React from 'react';

interface ProductGridProps {
  children: React.ReactNode;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ children }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6 w-full">
      {children}
    </div>
  );
};
