export interface LaravelPaginatedMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number | null;
  to: number | null;
  path: string;
}

export interface LaravelPaginatedLinks {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

export interface LaravelPaginatedResponse<T> {
  data: T[];
  meta: LaravelPaginatedMeta;
  links: LaravelPaginatedLinks;
}

export interface LaravelResourceResponse<T> {
  data: T;
}

export interface LaravelCollectionResponse<T> {
  data: T[];
}

export interface AuthApiResponse {
  user: { id: number; name: string; email: string; email_verified_at: string | null; created_at: string; updated_at: string };
  token: string;
  token_type: string;
}
