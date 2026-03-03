import { api } from './api';
import { LoginRequest, RegisterRequest, LoginResponse } from '../types';
import type { AuthApiResponse } from '../types/api';

export const AuthService = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post<AuthApiResponse>('/login', credentials);
    const body = response.data;

    if (!body?.token || !body?.user) {
      throw new Error('Resposta de login inválida');
    }

    return { token: body.token, user: body.user };
  },

  register: async (userData: RegisterRequest): Promise<LoginResponse> => {
    const response = await api.post<AuthApiResponse>('/register', userData);
    const body = response.data;

    if (!body?.token || !body?.user) {
      throw new Error('Resposta de registro inválida');
    }

    return { token: body.token, user: body.user };
  },

  updatePassword: async (payload: {
    current_password: string;
    password: string;
  }): Promise<void> => {
    await api.put('/user/password', payload);
  },
};
