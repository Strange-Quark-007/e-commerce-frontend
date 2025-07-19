import { useQuery, useMutation, UseQueryOptions, UseMutationOptions, QueryKey } from '@tanstack/react-query';
import { BASE_URL } from '../lib/endpoints';

async function fetcher<T>(endpoint: string, options?: RequestInit & { method?: string }): Promise<T | null> {
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
  const text = await res.text();
  try {
    return text ? JSON.parse(text) : null;
  } catch {
    return null;
  }
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
  options?: Omit<UseQueryOptions<TData | null, TError, TData | null, TQueryKey>, 'queryKey' | 'queryFn'>,
  fetchOptions?: RequestInit & { method?: string },
) {
  return useQuery<TData | null, TError, TData | null, TQueryKey>({
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
  options?: Omit<UseMutationOptions<TData | null, TError, TVariables, TContext>, 'mutationFn'>,
  fetchOptions?: RequestInit & { method?: string },
) {
  return useMutation<TData | null, TError, TVariables, TContext>({
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
