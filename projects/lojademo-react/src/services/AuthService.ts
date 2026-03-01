import { api } from './api';
import { LoginRequest, RegisterRequest, LoginResponse } from '../types';

/**
 * SERVIÇO DE AUTENTICAÇÃO (Integração Real com Laravel Sanctum)
 * 
 * Consome os endpoints:
 * - POST /api/login
 * - POST /api/register
 */
export const AuthService = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/login', credentials);
    return response.data;
  },
  
  register: async (userData: RegisterRequest): Promise<void> => {
    await api.post('/register', userData);
  },
};
