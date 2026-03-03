import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product, Category } from '../types';
import { ProductCard } from '../components/ProductCard';
import { ProductService } from '../services/ProductService';
import { CategoryService } from '../services/CategoryService';
import { FiltersSidebar } from '../components/FiltersSidebar';
import { ProductGrid } from '../components/ProductGrid';
import { Pagination } from '../components/Pagination';
import { ProductCardSkeleton } from '../components/ui/Skeleton';
import { PackageX, RefreshCcw, SlidersHorizontal } from 'lucide-react';
export const Home: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get('page')) || 1);
  const [totalPages, setTotalPages] = useState(1);
  
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const categoryParam = searchParams.get('category');
  const searchParam = searchParams.get('search');

  useEffect(() => {
    const pageFromUrl = Number(searchParams.get('page')) || 1;
    setCurrentPage(pageFromUrl);
  }, [searchParams]);

  const fetchCategories = async () => {
    setLoadingCategories(true);
    setError(null);
    try {
      const data = await CategoryService.getAll();
      setCategories(data);
    } catch {
      setError('Não foi possível carregar as categorias. Verifique se o backend está em execução.');
    } finally {
      setLoadingCategories(false);
    }
  };

  const fetchProducts = async () => {
    setLoadingProducts(true);
    setError(null);
    try {
      const params = {
        page: currentPage,
        ...(categoryParam && { category: Number(categoryParam) }),
        ...(searchParam && { search: searchParam }),
      };

      const response = await ProductService.getAll(params);
      setProducts(Array.isArray(response.data) ? response.data : []);
      setTotalPages(response.last_page ?? 1);
    } catch {
      setError('Não foi possível carregar os produtos. Verifique se o backend está em execução.');
      setProducts([]);
      setTotalPages(1);
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [currentPage, categoryParam, searchParam]);

  const handlePageChange = (page: number) => {
    searchParams.set('page', page.toString());
    setSearchParams(searchParams);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearFilters = () => {
    searchParams.delete('search');
    searchParams.delete('category');
    setSearchParams(searchParams);
    setShowMobileFilters(false);
  };

  const renderProductArea = () => {
    if (error) {
      return (
        <div className="bg-white rounded-2xl md:rounded-3xl p-8 md:p-12 text-center border border-slate-100 shadow-sm flex flex-col items-center w-full">
          <div className="bg-red-50 p-4 rounded-full mb-4">
            <RefreshCcw className="h-8 w-8 text-red-500" />
          </div>
          <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-2">Oops! Algo deu errado.</h3>
          <p className="text-sm md:text-base text-slate-500 mb-6">{error}</p>
          <button
            onClick={fetchProducts}
            className="bg-violet-600 text-white px-6 py-3 rounded-full font-bold hover:bg-violet-700 transition-colors text-sm md:text-base"
          >
            Tentar Novamente
          </button>
        </div>
      );
    }
    if (loadingProducts) {
      return (
        <ProductGrid>
          {[...Array(8)].map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </ProductGrid>
      );
    }
    if (products.length === 0) {
      return (
        <div className="bg-white rounded-2xl md:rounded-3xl p-8 md:p-16 text-center border border-slate-100 shadow-sm flex flex-col items-center w-full">
          <div className="bg-slate-50 p-6 rounded-full mb-6">
            <PackageX className="h-10 w-10 md:h-12 md:w-12 text-slate-400" />
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-3">Nenhum produto encontrado</h3>
          <p className="text-sm md:text-base text-slate-500 max-w-md mx-auto mb-8">
            Não encontramos resultados para a sua busca ou filtro atual. Tente usar termos diferentes ou limpar os filtros.
          </p>
          <button
            onClick={handleClearFilters}
            className="bg-slate-100 text-slate-700 px-6 py-3 rounded-full font-bold hover:bg-slate-200 transition-colors text-sm md:text-base"
          >
            Limpar todos os filtros
          </button>
        </div>
      );
    }
    return (
      <>
        <ProductGrid>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductGrid>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </>
    );
  };

  return (
    <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      <div className="flex items-center justify-between mb-6 lg:hidden gap-4">
        <h2 className="text-lg font-bold text-slate-800 truncate">
          {searchParam ? `Resultados para "${searchParam}"` : 'Recomendados'}
        </h2>
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-colors shadow-sm border shrink-0 ${
            showMobileFilters
              ? 'bg-violet-600 text-white border-violet-600'
              : 'bg-white text-slate-700 border-slate-200'
          }`}
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filtros
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 md:gap-10 w-full">
        <div className={`lg:block ${showMobileFilters ? 'block' : 'hidden'} shrink-0`}>
          <FiltersSidebar categories={categories} loadingCategories={loadingCategories} />
        </div>

        <div className="flex-1 min-w-0 w-full">
          <div className="hidden lg:flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-800 truncate pr-4">
              {searchParam ? `Resultados para "${searchParam}"` : 'Recomendados para você'}
            </h2>
            {!loadingProducts && !error && (
              <span className="text-sm text-slate-500 font-medium shrink-0">
                Mostrando {products.length} produtos
              </span>
            )}
          </div>

          {renderProductArea()}
        </div>
      </div>
    </div>
  );
};
