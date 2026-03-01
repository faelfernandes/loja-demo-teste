import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBasket, User, Settings, LogOut, ChevronDown } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useCartStore } from '../store/cartStore';
import { SearchBar } from './SearchBar';

export const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuthStore();
  const totalCartItems = useCartStore((state) => state.getTotalItems());
  const navigate = useNavigate();

  // Estados e Refs para o Dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Pega apenas o primeiro nome do usuário
  const firstName = user?.name ? user.name.split(' ')[0] : 'Usuário';

  // Fecha o dropdown ao clicar fora dele
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    navigate('/login');
  };

  return (
    <nav className="bg-white sticky top-0 z-50 border-b border-slate-100 shadow-sm">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20 gap-4 md:gap-8">
          
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-2">
            <span className="text-2xl md:text-3xl font-black tracking-tighter text-slate-900">LojaDemo</span>
          </Link>

          {/* Search Bar (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-2xl">
            <SearchBar />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 md:gap-6">
            <button onClick={() => navigate('/cart')} className="flex items-center gap-2 text-slate-600 hover:text-violet-600 transition-colors font-medium text-sm relative group">
              <div className="relative p-2 bg-slate-100 rounded-full group-hover:bg-violet-50 transition-colors">
                <ShoppingBasket className="h-5 w-5" />
                {totalCartItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-white">
                    {totalCartItems}
                  </span>
                )}
              </div>
              <span className="hidden sm:block">Carrinho</span>
            </button>

            <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>

            {isAuthenticated ? (
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 md:gap-3 p-1 pr-2 md:pr-4 rounded-full hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all"
                >
                  <div className="h-9 w-9 md:h-10 md:w-10 rounded-full bg-violet-100 border-2 border-white shadow-sm overflow-hidden flex items-center justify-center shrink-0">
                    <User className="h-4 w-4 md:h-5 md:w-5 text-violet-600" />
                  </div>
                  <div className="hidden sm:flex items-center gap-1.5">
                    <span className="text-sm font-bold text-slate-700 truncate max-w-[100px]">{firstName}</span>
                    <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </div>
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 animate-scale-up origin-top-right z-50">
                    <div className="px-4 py-3 border-b border-slate-100 sm:hidden">
                      <p className="text-sm font-bold text-slate-900 truncate">{user?.name}</p>
                      <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                    </div>
                    
                    <Link 
                      to="/profile" 
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-violet-600 transition-colors"
                    >
                      <Settings className="h-4 w-4" />
                      Configurações
                    </Link>
                    
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50 transition-colors text-left"
                    >
                      <LogOut className="h-4 w-4" />
                      Sair
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="text-sm font-bold text-slate-700 hover:text-violet-600 transition-colors px-2">
                Entrar
              </Link>
            )}
          </div>
        </div>

        {/* Search Bar (Mobile) */}
        <div className="md:hidden pb-4">
          <SearchBar />
        </div>
      </div>
    </nav>
  );
};
