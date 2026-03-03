import { api } from './api';
import { Category } from '../types';
import type { LaravelCollectionResponse } from '../types/api';

export const CategoryService = {
  getAll: async (): Promise<Category[]> => {
    const response = await api.get<LaravelCollectionResponse<Category>>('/categories');
    const list = response.data?.data;

    if (!Array.isArray(list)) {
      return [];
    }

    return list;
  },
};
