import { useApiQuery } from './useApi';
import { API_ENDPOINTS } from '../lib/endpoints';
import type { Product } from '../types';

/**
 * React Query hook to fetch a product by ID using the useApiQuery abstraction and endpoint config.
 * @param productId - The ID of the product to fetch
 * Returns { data, error, isLoading, isError, refetch }
 */
export function useProductById(productId: number) {
  return useApiQuery<Product>(['product', productId], API_ENDPOINTS.productById(productId), { enabled: !!productId });
}
