import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProductService } from '../services/ProductService';
import { Product } from '../types';
import { ShoppingBasket, ArrowLeft, Loader2, ShieldCheck, Truck, Minus, Plus, Check, Heart, Star, ShoppingBag, X } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { mockProducts } from '../mocks/data';

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const addItem = useCartStore(state => state.addItem);
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>('M');
  
  // Estado para controlar o Modal de Sucesso
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      setLoading(true);
      
      try {
        const data = await ProductService.getById(Number(id));
        setProduct(data);
      } catch (err) {
        console.warn("API offline. Exibindo dados de demonstração (mock).");
        
        // Tenta encontrar o produto clicado nos mocks
        const mockProduct = mockProducts.find(p => p.id === Number(id));
        
        if (mockProduct) {
          setProduct(mockProduct);
        } else {
          // Fallback genérico se o ID não existir nos mocks
          setProduct({
            id: Number(id),
            name: 'Produto de Demonstração',
            price: 199.90,
            description: 'Este é um produto de demonstração carregado porque o backend está offline. Ele possui todas as características visuais para você testar a interface.',
            image_url: `https://placehold.co/800x800/f8f9fa/a1a1aa?text=Produto+${id}`,
            category: { id: 1, name: 'Demonstração' },
            rating: 4.8,
            reviews: 124
          } as unknown as Product);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity);
      setShowModal(true); // Abre o modal ao invés de apenas mudar o botão
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-10 w-10 text-violet-600 animate-spin mb-4" />
      </div>
    );
  }

  if (!product) return null;

  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(product.price);

  const imageUrl = product.image_url || `https://placehold.co/800x800/f8f9fa/a1a1aa?text=${encodeURIComponent(product.name)}`;
  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

  return (
    <>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 w-full">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 mb-6 transition-colors font-bold w-fit bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm text-sm"
        >
          <ArrowLeft className="h-4 w-4" /> Voltar
        </button>

        <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden p-5 md:p-8 lg:p-10">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            
            {/* Image Section */}
            {/* Correção Definitiva: Adicionado -webkit-mask-image */}
            <div className="w-full lg:w-1/2 bg-slate-50 rounded-[1.5rem] overflow-hidden relative group flex items-center justify-center aspect-square max-h-[500px] isolate transform-gpu [-webkit-mask-image:-webkit-radial-gradient(white,black)]">
              <button className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 backdrop-blur-md shadow-sm hover:scale-110 hover:text-violet-600 transition-all z-10">
                <Heart className="h-5 w-5" />
              </button>
              <img 
                src={imageUrl} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Details Section */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center">
              
              <div className="flex items-center justify-between mb-3">
                <div className="inline-block bg-slate-900 text-white px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">
                  {product.category?.name || 'Categoria'}
                </div>
                
                <div className="flex items-center gap-1.5 text-sm">
                  <div className="flex text-amber-400">
                    <Star className="h-4 w-4 fill-current" />
                  </div>
                  <span className="font-bold text-slate-900">{product.rating}</span>
                  <span className="text-slate-400 underline decoration-slate-300 cursor-pointer hover:text-slate-600 text-xs">
                    ({product.reviews} avaliações)
                  </span>
                </div>
              </div>
              
              <h1 className="text-2xl lg:text-3xl font-black text-slate-900 mb-3 leading-tight">
                {product.name}
              </h1>
              
              <div className="mb-5 flex items-end gap-3">
                <div className="text-3xl lg:text-4xl font-black text-violet-600">
                  {formattedPrice}
                </div>
                <div className="text-base text-slate-400 line-through mb-1 font-medium">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price * 1.2)}
                </div>
              </div>

              <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Size Selector */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-slate-900 text-sm">Selecione o Tamanho</h3>
                  <button className="text-xs text-violet-600 font-bold hover:underline">Guia de Medidas</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`h-10 w-12 rounded-xl font-bold text-sm transition-all border-2 ${
                        selectedSize === size 
                          ? 'border-slate-900 bg-slate-900 text-white' 
                          : 'border-slate-200 text-slate-600 hover:border-slate-900'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                <div className="bg-slate-50 p-3 rounded-xl flex items-center gap-3 border border-slate-100">
                  <div className="bg-white p-2 rounded-lg shadow-sm"><Truck className="h-4 w-4 text-slate-900" /></div>
                  <div>
                    <p className="font-bold text-slate-900 text-xs">Frete Grátis</p>
                    <p className="text-[10px] text-slate-500">2-3 dias úteis</p>
                  </div>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl flex items-center gap-3 border border-slate-100">
                  <div className="bg-white p-2 rounded-lg shadow-sm"><ShieldCheck className="h-4 w-4 text-slate-900" /></div>
                  <div>
                    <p className="font-bold text-slate-900 text-xs">Devolução</p>
                    <p className="text-[10px] text-slate-500">Até 30 dias</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                <div className="flex items-center justify-between border-2 border-slate-200 rounded-full px-4 py-2.5 sm:w-32 bg-white">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-slate-400 hover:text-slate-900 transition-colors p-1">
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="font-black text-slate-900 text-base">{quantity}</span>
                  <button onClick={() => setQuantity(Math.min(10, quantity + 1))} className="text-slate-400 hover:text-slate-900 transition-colors p-1">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                <button 
                  onClick={handleAddToCart}
                  className="flex-1 py-3 px-6 rounded-full font-black text-sm md:text-base flex items-center justify-center gap-2 transition-all shadow-lg w-full bg-violet-600 text-white hover:bg-violet-700 shadow-violet-600/30 hover:-translate-y-0.5"
                >
                  <ShoppingBasket className="h-5 w-5" /> Adicionar ao Carrinho
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Sucesso (Adicionado ao Carrinho) */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-[2rem] p-6 md:p-8 max-w-md w-full shadow-2xl animate-scale-up relative">
            
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex flex-col items-center text-center mt-2">
              <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-5 shadow-inner">
                <Check className="w-8 h-8" />
              </div>
              
              <h3 className="text-2xl font-black text-slate-900 mb-2">Adicionado com sucesso!</h3>
              
              <div className="bg-slate-50 rounded-2xl p-4 flex items-center gap-4 w-full mb-6 border border-slate-100 text-left">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-white shrink-0">
                  <img src={imageUrl} alt={product.name} className="w-full h-full object-cover mix-blend-multiply" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-900 truncate">{product.name}</p>
                  <p className="text-xs text-slate-500 mt-1">Qtd: {quantity} • Tam: {selectedSize}</p>
                  <p className="text-sm font-black text-violet-600 mt-1">{formattedPrice}</p>
                </div>
              </div>

              <div className="flex flex-col gap-3 w-full">
                <button 
                  onClick={() => navigate('/cart')} 
                  className="w-full py-3.5 px-4 rounded-full font-black text-white bg-violet-600 hover:bg-violet-700 transition-colors shadow-lg shadow-violet-600/30 flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="h-5 w-5" /> Finalizar Compra
                </button>
                <button 
                  onClick={() => setShowModal(false)} 
                  className="w-full py-3.5 px-4 rounded-full font-bold text-slate-700 bg-white border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors"
                >
                  Continuar Comprando
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
