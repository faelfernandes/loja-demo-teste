import type { Category } from './category';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category_id: number;
  image_url: string;
  rating?: number;
  reviews?: number;
  created_at: string;
  updated_at: string;
  category?: Category;
}

export interface ProductListParams {
  page?: number;
  category?: number | null;
  search?: string;
  per_page?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  last_page: number;
  total: number;
  per_page: number;
}
