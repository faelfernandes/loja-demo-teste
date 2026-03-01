import React from 'react';
import { Category } from '../types';
import { useSearchParams } from 'react-router-dom';

interface CategoryChipsProps {
  categories: Category[];
  isLoading?: boolean;
}

export const CategoryChips: React.FC<CategoryChipsProps> = ({ categories, isLoading }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get('category');

  const handleCategoryClick = (categoryId: number | null) => {
    if (categoryId) {
      searchParams.set('category', categoryId.toString());
    } else {
      searchParams.delete('category');
    }
    searchParams.delete('page');
    setSearchParams(searchParams);
  };

  if (isLoading) {
    return (
      <div className="flex gap-3 overflow-x-auto scrollbar-hide py-4 w-full">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-10 w-32 bg-slate-200 animate-pulse rounded-full shrink-0" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-3 overflow-x-auto scrollbar-hide py-4 pb-6 w-full">
      <button
        onClick={() => handleCategoryClick(null)}
        className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 shrink-0 ${
          !currentCategory
            ? 'bg-violet-600 text-white shadow-md shadow-violet-600/20'
            : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
        }`}
      >
        Todas as Categorias
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => handleCategoryClick(category.id)}
          className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 shrink-0 ${
            currentCategory === category.id.toString()
              ? 'bg-violet-600 text-white shadow-md shadow-violet-600/20'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};
