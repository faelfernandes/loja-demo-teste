import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { Heart, ShoppingBasket, Check, Star } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useToastStore } from '../store/toastStore';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addItem = useCartStore(state => state.addItem);
  const addToast = useToastStore(state => state.addToast);
  
  const [isAdded, setIsAdded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(product.price);

  const imageUrl = product.image_url || `https://placehold.co/600x600/f8f9fa/a1a1aa?text=${encodeURIComponent(product.name)}`;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product, 1);
    setIsAdded(true);
    
    // Dispara o Toast Global
    addToast(`${product.name} adicionado ao carrinho!`);
    
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFavorite(!isFavorite);
  };

  return (
    <Link to={`/product/${product.id}`} className="group block h-full w-full">
      <div className="bg-white rounded-2xl md:rounded-[2rem] p-3 md:p-4 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 flex flex-col h-full relative w-full">
        
        <button 
          onClick={handleFavorite}
          className="absolute top-4 right-4 md:top-6 md:right-6 z-10 p-2 md:p-2.5 rounded-full bg-white/90 backdrop-blur-md shadow-sm hover:bg-violet-50 hover:text-violet-600 transition-colors"
        >
          <Heart className={`h-4 w-4 md:h-5 md:w-5 transition-colors ${isFavorite ? 'fill-violet-600 text-violet-600' : 'text-slate-400'}`} />
        </button>

        {/* Correção Definitiva: Adicionado -webkit-mask-image para forçar o recorte das bordas no Chrome/Safari */}
        <div className="relative aspect-square w-full mb-3 md:mb-5 rounded-xl md:rounded-3xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center group-hover:shadow-inner transition-all isolate transform-gpu [-webkit-mask-image:-webkit-radial-gradient(white,black)]">
          <img 
            src={imageUrl} 
            alt={product.name} 
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://placehold.co/600x600/f8f9fa/a1a1aa?text=Sem+Imagem';
            }}
          />
          {product.rating > 4.7 && (
            <div className="absolute bottom-2 left-2 md:bottom-4 md:left-4 bg-white/90 backdrop-blur-sm px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[10px] md:text-xs font-bold text-slate-800 shadow-sm">
              Mais Vendido
            </div>
          )}
        </div>
        
        <div className="flex flex-col flex-grow px-1 md:px-2 w-full">
          <div className="flex items-center justify-between mb-1.5 md:mb-2 gap-2">
            <span className="text-[10px] md:text-xs font-bold text-violet-600 uppercase tracking-wider truncate">
              {product.category?.name}
            </span>
            <div className="flex items-center gap-1 text-amber-400 shrink-0">
              <Star className="h-3 w-3 md:h-3.5 md:w-3.5 fill-current" />
              <span className="text-[10px] md:text-xs font-bold text-slate-700">{product.rating}</span>
            </div>
          </div>

          <h3 className="text-sm md:text-lg font-bold text-slate-900 line-clamp-2 mb-3 md:mb-4 group-hover:text-violet-600 transition-colors leading-tight break-words">
            {product.name}
          </h3>
          
          <div className="mt-auto flex items-center justify-between gap-2">
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] md:text-xs text-slate-400 line-through decoration-slate-300 truncate">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price * 1.2)}
              </span>
              <span className="font-black text-base md:text-xl text-slate-900 truncate">{formattedPrice}</span>
            </div>
            <button 
              onClick={handleAddToCart}
              disabled={isAdded}
              className={`flex items-center justify-center h-8 w-8 md:h-12 md:w-12 rounded-full transition-all shadow-sm shrink-0 ${
                isAdded 
                  ? 'bg-green-500 text-white shadow-green-500/30' 
                  : 'bg-slate-900 text-white hover:bg-violet-600 hover:shadow-violet-600/30 hover:scale-105'
              }`}
            >
              {isAdded ? <Check className="h-4 w-4 md:h-5 md:w-5" /> : <ShoppingBasket className="h-4 w-4 md:h-5 md:w-5" />}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};
