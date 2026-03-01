import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { useToastStore } from '../store/toastStore';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag, ShieldCheck, Check } from 'lucide-react';

export const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { items, removeItem, updateQuantity, addItem, clearCart } = useCartStore();
  const addToast = useToastStore(state => state.addToast);
  
  // Estado para controlar o modal de checkout
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 0 : 0; // Frete grátis simulado
  const total = subtotal + shipping;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
  };

  // Função que lida com a remoção e dispara o Toast de Desfazer
  const handleRemoveItem = (id: number) => {
    const itemToRemove = items.find(item => item.id === id);
    
    if (itemToRemove) {
      removeItem(id);
      
      // Mensagem genérica sem o nome do item, conforme solicitado
      addToast('Item removido do carrinho', {
        type: 'info',
        action: {
          label: 'Desfazer',
          onClick: () => addItem(itemToRemove, itemToRemove.quantity)
        }
      });
    }
  };

  const handleFinishCheckout = () => {
    setShowCheckoutModal(false);
    clearCart();
    navigate('/');
    window.scrollTo(0, 0);
  };

  if (items.length === 0) {
    return (
      <div className="max-w-[1200px] w-full mx-auto px-4 py-12 md:py-16 flex flex-col items-center justify-center min-h-[50vh]">
        <div className="bg-slate-100 p-6 md:p-8 rounded-full mb-6 text-slate-400">
          <ShoppingBag className="h-12 w-12 md:h-16 md:w-16" />
        </div>
        <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-3 text-center">Seu carrinho está vazio</h2>
        <p className="text-sm md:text-base text-slate-500 mb-8 text-center max-w-md">
          Parece que você ainda não adicionou nenhum produto ao seu carrinho. Que tal explorar nossas ofertas?
        </p>
        <Link 
          to="/" 
          className="bg-violet-600 text-white px-6 py-3 md:px-8 md:py-4 rounded-full font-bold text-sm md:text-base hover:bg-violet-700 transition-all shadow-lg shadow-violet-600/30 hover:-translate-y-0.5"
        >
          Continuar Comprando
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-[1200px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        <div className="flex items-center gap-3 mb-6 md:mb-8">
          <Link to="/" className="p-2 rounded-full hover:bg-slate-200 transition-colors text-slate-500">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-xl md:text-2xl font-black text-slate-900">Seu Carrinho</h1>
          <span className="bg-slate-200 text-slate-700 px-2.5 py-0.5 rounded-full text-xs font-bold ml-2">
            {items.length} {items.length === 1 ? 'item' : 'itens'}
          </span>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Lista de Produtos */}
          <div className="flex-1 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-[1.5rem] border border-slate-100 shadow-sm flex flex-col sm:flex-row items-center gap-4 md:gap-5 relative group">
                
                <button 
                  onClick={() => handleRemoveItem(item.id)}
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                  title="Remover item"
                >
                  <Trash2 className="h-4 w-4 md:h-5 md:w-5" />
                </button>

                <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 shrink-0 bg-slate-50 rounded-xl overflow-hidden flex items-center justify-center">
                  {item.image_url ? (
                    <img 
                      src={item.image_url} 
                      alt={item.name} 
                      className="w-full h-full object-cover mix-blend-multiply"
                    />
                  ) : (
                    <ShoppingBag className="h-8 w-8 text-slate-300" />
                  )}
                </div>

                <div className="flex-1 flex flex-col w-full py-1">
                  <span className="text-[10px] md:text-xs font-bold text-violet-600 uppercase tracking-wider mb-1">
                    {item.category?.name || 'Produto'}
                  </span>
                  <Link to={`/product/${item.id}`} className="text-base md:text-lg font-bold text-slate-900 hover:text-violet-600 transition-colors line-clamp-2 mb-1.5 pr-6">
                    {item.name}
                  </Link>
                  <div className="text-lg md:text-xl font-black text-slate-900 mb-3 md:mb-auto">
                    {formatPrice(item.price)}
                  </div>

                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center border-2 border-slate-100 rounded-full px-1.5 py-1 bg-slate-50">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 text-slate-500 hover:text-slate-900 transition-colors"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-8 text-center text-sm font-bold text-slate-900">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 text-slate-500 hover:text-slate-900 transition-colors"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    
                    <div className="text-right hidden sm:block">
                      <p className="text-[10px] md:text-xs text-slate-500 font-medium">Subtotal</p>
                      <p className="text-sm md:text-base font-bold text-slate-900">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Resumo do Pedido */}
          <div className="w-full lg:w-[340px] shrink-0">
            <div className="bg-white p-5 md:p-6 rounded-[1.5rem] border border-slate-100 shadow-lg shadow-slate-200/40 sticky top-24">
              <h3 className="text-lg font-black text-slate-900 mb-5">Resumo do Pedido</h3>
              
              <div className="space-y-3 mb-5 text-sm md:text-base">
                <div className="flex items-center justify-between text-slate-600 font-medium">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600 font-medium">
                  <span>Frete</span>
                  <span className="text-green-500 font-bold">Grátis</span>
                </div>
                <div className="border-t border-slate-100 pt-3 mt-3 flex items-center justify-between">
                  <span className="text-base font-bold text-slate-900">Total</span>
                  <span className="text-2xl font-black text-violet-600">{formatPrice(total)}</span>
                </div>
              </div>

              <button 
                onClick={() => setShowCheckoutModal(true)}
                className="w-full py-3.5 rounded-full bg-slate-900 text-white font-black text-sm md:text-base hover:bg-violet-600 transition-colors shadow-md shadow-slate-900/10 mb-4"
              >
                Finalizar Compra
              </button>

              <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 font-medium">
                <ShieldCheck className="h-3.5 w-3.5 text-green-500" />
                Compra segura e criptografada
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Checkout Simulado */}
      {showCheckoutModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-[2rem] p-6 md:p-8 max-w-md w-full shadow-2xl animate-scale-up relative text-center">
            
            <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <Check className="w-10 h-10" />
            </div>
            
            <h3 className="text-2xl font-black text-slate-900 mb-3">Pedido Confirmado!</h3>
            
            <p className="text-slate-500 text-sm md:text-base mb-8 leading-relaxed">
              Pedido simulado com sucesso. Integração de pagamento fora do escopo do teste.
            </p>

            <button 
              onClick={handleFinishCheckout}
              className="w-full py-3.5 px-4 rounded-full font-black text-white bg-violet-600 hover:bg-violet-700 transition-colors shadow-lg shadow-violet-600/30"
            >
              Voltar ao Início
            </button>
          </div>
        </div>
      )}
    </>
  );
};
