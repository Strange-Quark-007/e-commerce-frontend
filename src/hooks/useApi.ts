import { useQuery, useMutation, UseQueryOptions, UseMutationOptions, QueryKey } from '@tanstack/react-query';
import { BASE_URL } from '../lib/endpoints';

/**
 * Centralized fetch utility with error handling and method support.
 */
async function fetcher<T>(endpoint: string, options?: RequestInit & { method?: string }): Promise<T> {
  const { method = 'GET', ...rest } = options || {};
  const res = await fetch(`${BASE_URL}${endpoint}`, { method, ...rest });
  if (!res.ok) {
    let errorMsg = 'An error occurred';
    try {
      const errorData = await res.json();
      errorMsg = errorData.message || errorMsg;
    } catch {}
    throw new Error(errorMsg);
  }
  return res.json();
}

/**
 * Wrapper for React Query's useQuery, handling fetch and errors internally.
 * @param endpoint - API endpoint string
 * @param options - Optional React Query options
 * @param fetchOptions - Optional fetch options (method defaults to GET)
 */
export function useApiQuery<TData, TError = Error, TQueryKey extends QueryKey = QueryKey>(
  queryKey: TQueryKey,
  endpoint: string,
  options?: Omit<UseQueryOptions<TData, TError, TData, TQueryKey>, 'queryKey' | 'queryFn'>,
  fetchOptions?: RequestInit & { method?: string },
) {
  return useQuery<TData, TError, TData, TQueryKey>({
    queryKey,
    queryFn: () => fetcher<TData>(endpoint, { method: 'GET', ...fetchOptions }),
    ...options,
  });
}

/**
 * Wrapper for React Query's useMutation, handling fetch and errors internally.
 * @param endpoint - API endpoint string or function
 * @param options - Optional React Query options
 * @param fetchOptions - Optional fetch options (method defaults to POST)
 */
export function useApiMutation<TData, TError = Error, TVariables = void, TContext = unknown>(
  endpoint: string | ((variables: TVariables) => string),
  options?: Omit<UseMutationOptions<TData, TError, TVariables, TContext>, 'mutationFn'>,
  fetchOptions?: RequestInit & { method?: string },
) {
  return useMutation<TData, TError, TVariables, TContext>({
    mutationFn: async (variables: TVariables) => {
      const url = typeof endpoint === 'function' ? endpoint(variables) : endpoint;
      return fetcher<TData>(url, {
        ...fetchOptions,
        method: fetchOptions?.method || 'POST',
        headers: { 'Content-Type': 'application/json', ...(fetchOptions?.headers || {}) },
        body: variables ? JSON.stringify(variables) : undefined,
      });
    },
    ...options,
  });
}
