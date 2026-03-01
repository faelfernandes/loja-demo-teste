import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-12 flex items-center justify-center gap-3">
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="p-3 rounded-full bg-white border border-slate-200 text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 hover:text-violet-600 transition-colors shadow-sm"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      
      <div className="flex items-center gap-2">
        {[...Array(totalPages)].map((_, i) => {
          const page = i + 1;
          const isCurrent = page === currentPage;
          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-10 h-10 rounded-full text-sm font-bold transition-all ${
                isCurrent 
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-600/20' 
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-violet-600'
              }`}
            >
              {page}
            </button>
          );
        })}
      </div>

      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="p-3 rounded-full bg-white border border-slate-200 text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 hover:text-violet-600 transition-colors shadow-sm"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
};
