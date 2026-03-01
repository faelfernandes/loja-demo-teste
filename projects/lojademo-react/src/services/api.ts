import axios from 'axios';
import { useAuthStore } from '../store/authStore';

/**
 * CONFIGURAÇÃO DO AXIOS E INTERCEPTORS
 * 
 * Aqui centralizamos a configuração da API. 
 * Se no futuro o backend Laravel deixar de ser mockado e for para produção,
 * basta alterar a baseURL aqui e toda a aplicação continuará funcionando.
 */
export const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

/**
 * REQUEST INTERCEPTOR (Padrão de Projeto)
 * 
 * Cumpre o requisito: "enviar o token nas requisições subsequentes aos endpoints protegidos".
 * Antes de QUALQUER requisição sair do frontend, este interceptor "captura" a requisição,
 * busca o token JWT atualizado direto do Zustand (localStorage) e injeta no cabeçalho Authorization.
 * Isso evita repetição de código em cada chamada de API.
 */
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * RESPONSE INTERCEPTOR
 * 
 * Tratamento global de erros. Se a API do Laravel retornar um erro 401 (Não Autorizado)
 * indicando que o token JWT expirou ou é inválido, nós deslogamos o usuário automaticamente
 * limpando o Zustand e o localStorage.
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
      // Opcional: Redirecionar para o login usando window.location.href = '/login'
    }
    return Promise.reject(error);
  }
);
