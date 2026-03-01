import { api } from './api';
import { Category } from '../types';

/**
 * SERVIÇO DE CATEGORIAS (Integração Real com Laravel)
 * 
 * Consome o endpoint:
 * - GET /api/categories
 */
export const CategoryService = {
  getAll: async (): Promise<Category[]> => {
    const response = await api.get<Category[]>('/categories');
    return response.data;
  },
};
