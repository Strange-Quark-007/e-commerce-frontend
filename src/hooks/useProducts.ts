'use client';

import { useApiQuery } from './useApi';
import { API_ENDPOINTS } from '../lib/endpoints';
import type { Product } from '../types';

/**
 * React Query hook to fetch all products using the useApiQuery abstraction and endpoint config.
 * Returns { data, error, isLoading, isError, refetch }
 */
export function useProducts() {
  return useApiQuery<Product[]>(['products'], API_ENDPOINTS.products);
}
