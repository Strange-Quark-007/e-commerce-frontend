'use client';

import { useApiQuery } from './useApi';
import { API_ENDPOINTS } from '../lib/endpoints';
import { Product } from '@/types';

/**
 * React Query hook to fetch all products using the useApiQuery abstraction and endpoint config.
 * Accepts optional category. If provided, fetches products for that category.
 * Returns { data, error, isLoading, isError, refetch }
 */
export function useProducts(category?: string) {
  // Always call the hook at the top level
  return useApiQuery<Product[]>(
    category ? ['products', category] : ['products'],
    category ? API_ENDPOINTS.productsByCategory(category) : API_ENDPOINTS.products,
  );
}

/**
 * React Query hook to fetch all product categories from FakeStoreAPI.
 * Returns { data, error, isLoading, isError, refetch }
 */
export function useProductCategories() {
  return useApiQuery<string[]>(['categories'], API_ENDPOINTS.categories);
}
