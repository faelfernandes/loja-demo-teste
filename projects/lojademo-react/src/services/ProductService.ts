import { api } from './api';
import { Product, PaginatedResponse } from '../types';

interface FetchProductsParams {
  page?: number;
  category?: number | null;
  search?: string;
}

/**
 * SERVIÇO DE PRODUTOS (Integração Real com Laravel)
 * 
 * Consome os endpoints:
 * - GET /api/products (com paginação, search e category)
 * - GET /api/products/{id}
 */
export const ProductService = {
  getAll: async (params: FetchProductsParams): Promise<PaginatedResponse<Product>> => {
    // O Axios converte automaticamente o objeto 'params' em Query Strings na URL
    // Ex: /api/products?page=1&category=2&search=tenis
    const response = await api.get<PaginatedResponse<Product>>('/products', { params });
    return response.data;
  },
  
  getById: async (id: number): Promise<Product> => {
    const response = await api.get<Product>(`/products/${id}`);
    return response.data;
  },
};
