import React from 'react';
import { Category } from '../types';
import { useSearchParams } from 'react-router-dom';
import { Check } from 'lucide-react';
import { Skeleton } from './ui/Skeleton';

interface FiltersSidebarProps {
  categories: Category[];
  loadingCategories?: boolean;
}

export const FiltersSidebar: React.FC<FiltersSidebarProps> = ({ categories, loadingCategories = false }) => {
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

  return (
    <aside className="w-full lg:w-64 flex-shrink-0 space-y-8">
      <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
        <h3 className="text-lg font-black text-slate-900 mb-4">Categorias</h3>
        {loadingCategories ? (
          <ul className="space-y-1">
            <li><Skeleton className="h-10 w-full rounded-xl" /></li>
            {['cat-1', 'cat-2', 'cat-3', 'cat-4'].map((id) => (
              <li key={id}><Skeleton className="h-10 w-full rounded-xl" /></li>
            ))}
          </ul>
        ) : (
          <ul className="space-y-1">
            <li>
              <button
                onClick={() => handleCategoryClick(null)}
                className={`w-full text-left px-4 py-2.5 rounded-xl transition-all text-sm font-bold ${
                  !currentCategory ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                Todos os Produtos
              </button>
            </li>
            {categories.map((category) => (
              <li key={category.id}>
                <button
                  onClick={() => handleCategoryClick(category.id)}
                  className={`w-full text-left px-4 py-2.5 rounded-xl transition-all text-sm font-bold ${
                    currentCategory === category.id.toString() ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  {category.name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm opacity-70 relative group">
        <div className="absolute inset-0 z-10 cursor-not-allowed" title="Fora do escopo do teste"></div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-black text-slate-900">Faixa de Preço</h3>
          <span className="text-[9px] uppercase font-bold tracking-wider text-violet-600 bg-violet-50 px-2 py-1 rounded-md text-center leading-tight">Fora do escopo</span>
        </div>

        <div className="h-12 w-full flex items-end gap-1 mb-2">
           {[20, 40, 80, 100, 60, 40, 30, 20, 10].map((h, i) => (
             <div key={i} className="flex-1 bg-slate-200 rounded-t-sm" style={{ height: `${h}%` }}></div>
           ))}
        </div>
        <div className="h-1.5 bg-slate-100 rounded-full w-full relative mb-6 mt-2">
          <div className="absolute left-1/4 right-1/4 h-full bg-slate-900 rounded-full"></div>
          <div className="absolute left-1/4 top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 bg-white border-4 border-slate-900 rounded-full shadow-sm"></div>
          <div className="absolute right-1/4 top-1/2 -translate-y-1/2 translate-x-1/2 w-5 h-5 bg-white border-4 border-slate-900 rounded-full shadow-sm"></div>
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="bg-slate-50 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-700 w-full text-center border border-slate-100">R$ 50</div>
          <div className="bg-slate-50 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-700 w-full text-center border border-slate-100">R$ 800</div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm opacity-70 relative">
        <div className="absolute inset-0 z-10 cursor-not-allowed" title="Fora do escopo do teste"></div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-black text-slate-900">Marcas</h3>
          <span className="text-[9px] uppercase font-bold tracking-wider text-violet-600 bg-violet-50 px-2 py-1 rounded-md text-center leading-tight">Fora do escopo</span>
        </div>
        <ul className="space-y-3">
          {['Nike', 'Adidas', 'Puma', 'Under Armour', 'New Balance'].map((brand, idx) => (
            <li key={brand} className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${idx === 0 ? 'bg-violet-600' : 'border-2 border-slate-300'}`}>
                {idx === 0 && <Check className="h-3 w-3 text-white" />}
              </div>
              <span className={`text-sm font-medium ${idx === 0 ? 'text-slate-900 font-bold' : 'text-slate-600'}`}>{brand}</span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};
