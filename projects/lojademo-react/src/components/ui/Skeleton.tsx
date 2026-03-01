import React from 'react';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '', ...props }) => {
  return (
    <div
      className={`animate-pulse bg-slate-200 rounded-2xl ${className}`}
      {...props}
    />
  );
};

export const ProductCardSkeleton = () => (
  <div className="bg-white rounded-[2rem] p-4 flex flex-col h-[340px] shadow-sm border border-slate-100">
    <div className="flex justify-end mb-2">
      <Skeleton className="h-8 w-8 rounded-full" />
    </div>
    <Skeleton className="h-40 w-full mb-4 rounded-2xl" />
    <Skeleton className="h-5 w-3/4 mb-2" />
    <Skeleton className="h-4 w-1/2 mb-auto" />
    <div className="mt-4 flex items-center">
      <Skeleton className="h-10 w-28 rounded-full" />
    </div>
  </div>
);
