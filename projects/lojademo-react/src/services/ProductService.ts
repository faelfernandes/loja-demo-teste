import { api } from './api';
import { Product, PaginatedResponse, ProductListParams } from '../types';
import type { LaravelPaginatedResponse, LaravelResourceResponse } from '../types/api';

const EMPTY_PAGE: PaginatedResponse<Product> = {
  data: [],
  current_page: 1,
  last_page: 1,
  total: 0,
  per_page: 16,
};

export const ProductService = {
  getAll: async (params: ProductListParams): Promise<PaginatedResponse<Product>> => {
    const response = await api.get<LaravelPaginatedResponse<Product>>('/products', {
      params: {
        page: params.page,
        per_page: params.per_page,
        category: params.category,
        search: params.search,
      },
    });
    const body = response.data;

    if (!body?.data || !Array.isArray(body.data) || !body.meta) {
      return EMPTY_PAGE;
    }

    return {
      data: body.data,
      current_page: body.meta.current_page,
      last_page: body.meta.last_page,
      total: body.meta.total,
      per_page: body.meta.per_page,
    };
  },

  getById: async (id: number): Promise<Product> => {
    const response = await api.get<LaravelResourceResponse<Product>>(`/products/${id}`);
    const product = response.data?.data;

    if (!product || typeof product.id !== 'number') {
      throw new Error('Produto não encontrado');
    }

    return product;
  },
};
