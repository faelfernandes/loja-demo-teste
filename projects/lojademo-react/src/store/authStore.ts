import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User } from '../types';

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  setAuth: (token: string, user: User) => void;
  logout: () => void;
}

/**
 * GERENCIAMENTO DE ESTADO COM ZUSTAND
 * 
 * Utilizamos o Zustand em conjunto com o middleware 'persist'.
 * Isso resolve perfeitamente o requisito de "Armazenar o token JWT no armazenamento local",
 * pois o Zustand sincroniza automaticamente este estado com o localStorage do navegador.
 * Se o usuário recarregar a página (F5), ele continuará logado.
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      
      // Ação disparada após o login bem-sucedido na API
      setAuth: (token, user) => set({ token, user, isAuthenticated: true }),
      
      // Ação para limpar o estado e remover o token do localStorage
      logout: () => set({ token: null, user: null, isAuthenticated: false }),
    }),
    {
      name: 'ecommerce-auth-storage', // Nome da chave que será salva no localStorage
      storage: createJSONStorage(() => localStorage), // Força explicitamente o uso do localStorage
    }
  )
);
