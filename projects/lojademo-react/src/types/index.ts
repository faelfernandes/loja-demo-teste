export interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: number;
  name: string;
  created_at?: string;
  updated_at?: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category_id: number;
  image_url: string;
  rating: number;
  reviews: number;
  created_at: string;
  updated_at: string;
  category?: Category;
}

export interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  last_page: number;
  total: number;
  per_page: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}
