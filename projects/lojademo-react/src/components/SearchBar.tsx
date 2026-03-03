import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const SearchBar: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('search') || '');

  useEffect(() => {
    setQuery(searchParams.get('search') || '');
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentCategory = searchParams.get('category');
    const params = new URLSearchParams();
    if (query.trim()) params.set('search', query.trim());
    if (currentCategory) params.set('category', currentCategory);
    navigate(`/?${params.toString()}`);
  };

  const handleClear = () => {
    setQuery('');
    const params = new URLSearchParams();
    const currentCategory = searchParams.get('category');
    if (currentCategory) params.set('category', currentCategory);
    navigate(params.toString() ? `/?${params.toString()}` : '/', { replace: true });
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-xl group">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-slate-400 group-focus-within:text-violet-600 transition-colors" />
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar produtos..."
        className="block w-full pl-11 pr-10 py-3 bg-slate-100 border-transparent rounded-full text-sm placeholder-slate-400 focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-500/10 transition-all duration-300 outline-none"
      />
      {query.length > 0 && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Limpar busca"
          className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-violet-600 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </form>
  );
};
