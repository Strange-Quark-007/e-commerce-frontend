# Implement reusable hooks for React Query
_Exported on 7/14/2025 at 20:17:26 GMT+5:30 from Cursor (1.2.4)_

---

**User**

Start implementation for next section - Reusable Hooks
create reusable hook for eg like useQuery, useMutation for react query and use those in api instead of using fetch

---

**Cursor**

```typescript
// ... existing code ...
```

```typescript
/**
 * Fetch all products from FakeStoreAPI.
 * Used as a fetcher for React Query.
 */
// ... existing code ...
/**
 * Fetch a single product by ID from FakeStoreAPI.
 * Used as a fetcher for React Query.
 */
// ... existing code ...
```

```typescript
// ... existing code ...
```

```typescript
// ... existing code ...
```

```typescript
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../lib/api';
import type { Product } from '../types';

/**
 * React Query hook to fetch all products.
 * Returns { data, error, isLoading, isError, refetch }
 */
export function useProducts() {
  return useQuery<Product[], Error>({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });
}

```

```typescript
import { useQuery } from '@tanstack/react-query';
import { fetchProductById } from '../lib/api';
import type { Product } from '../types';

/**
 * React Query hook to fetch a product by ID.
 * @param productId - The ID of the product to fetch
 * Returns { data, error, isLoading, isError, refetch }
 */
export function useProductById(productId: number) {
  return useQuery<Product, Error>({
    queryKey: ['product', productId],
    queryFn: () => fetchProductById(productId),
    enabled: !!productId,
  });
}

```

```typescript
import { useCartStore } from '../store/cartStore';
import type { CartItem } from '../types';

/**
 * Hook to access cart state and actions from Zustand store.
 * Returns { items, addToCart, removeFromCart, updateQuantity, clearCart }
 */
export function useCart() {
  const items = useCartStore((state) => state.items);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);

  return { items, addToCart, removeFromCart, updateQuantity, clearCart };
}

```

The reusable hooks for the "Reusable Hooks" section are now implemented:

- `useProducts`: Fetches all products using React Query and the API client.
- `useProductById`: Fetches a single product by ID using React Query and the API client.
- `useCart`: Exposes cart state and actions from the Zustand store in a clean, reusable hook.

These hooks are placed in a new `src/hooks/` directory and are ready to be used in your components, abstracting away direct fetch and store logic.

If you want to see usage examples or need integration into specific pages/components, let me know!

---

**User**

not quite right...
create a hook useApi.ts containing two hooks, useQuery and useMutation that are wrapper/abstractions over react query's hooks

---

**Cursor**

```typescript
import { useQuery, useMutation, UseQueryOptions, UseMutationOptions, QueryKey } from '@tanstack/react-query';

/**
 * Wrapper for React Query's useQuery, allowing for custom config and future extensibility.
 * @param queryKey - Unique key for the query
 * @param queryFn - Fetcher function
 * @param options - Optional React Query options
 */
export function useApiQuery<TData, TError = Error, TQueryKey extends QueryKey = QueryKey>(
  queryKey: TQueryKey,
  queryFn: () => Promise<TData>,
  options?: Omit<UseQueryOptions<TData, TError, TData, TQueryKey>, 'queryKey' | 'queryFn'>
) {
  return useQuery<TData, TError, TData, TQueryKey>({
    queryKey,
    queryFn,
    ...options,
  });
}

/**
 * Wrapper for React Query's useMutation, allowing for custom config and future extensibility.
 * @param mutationFn - Mutation function
 * @param options - Optional React Query options
 */
export function useApiMutation<TData, TError = Error, TVariables = void, TContext = unknown>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: UseMutationOptions<TData, TError, TVariables, TContext>
) {
  return useMutation<TData, TError, TVariables, TContext>(mutationFn, options);
}

```

```typescript
import { useQuery, useMutation, UseQueryOptions, UseMutationOptions, QueryKey } from '@tanstack/react-query';

/**
 * Wrapper for React Query's useQuery, allowing for custom config and future extensibility.
 * @param queryKey - Unique key for the query
 * @param queryFn - Fetcher function
 * @param options - Optional React Query options
 */
export function useApiQuery<TData, TError = Error, TQueryKey extends QueryKey = QueryKey>(
  queryKey: TQueryKey,
  queryFn: () => Promise<TData>,
  options?: Omit<UseQueryOptions<TData, TError, TData, TQueryKey>, 'queryKey' | 'queryFn'>
) {
  return useQuery<TData, TError, TData, TQueryKey>({
    queryKey,
    queryFn,
    ...options,
  });
}

/**
 * Wrapper for React Query's useMutation, allowing for custom config and future extensibility.
 * @param mutationFn - Mutation function
 * @param options - Optional React Query options
 */
export function useApiMutation<TData, TError = Error, TVariables = void, TContext = unknown>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: UseMutationOptions<TData, TError, TVariables, TContext>
) {
  return useMutation<TData, TError, TVariables, TContext>(mutationFn, options);
}

```

```typescript
import { useQuery, useMutation, UseQueryOptions, UseMutationOptions, QueryKey } from '@tanstack/react-query';

/**
 * Wrapper for React Query's useQuery, allowing for custom config and future extensibility.
 * @param queryKey - Unique key for the query
 * @param queryFn - Fetcher function
 * @param options - Optional React Query options
 */
export function useApiQuery<TData, TError = Error, TQueryKey extends QueryKey = QueryKey>(
  queryKey: TQueryKey,
  queryFn: () => Promise<TData>,
  options?: Omit<UseQueryOptions<TData, TError, TData, TQueryKey>, 'queryKey' | 'queryFn'>
) {
  return useQuery<TData, TError, TData, TQueryKey>({
    queryKey,
    queryFn,
    ...options,
  });
}

/**
 * Wrapper for React Query's useMutation, allowing for custom config and future extensibility.
 * @param mutationFn - Mutation function
 * @param options - Optional React Query options
 */
export function useApiMutation<TData, TError = Error, TVariables = void, TContext = unknown>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: Omit<UseMutationOptions<TData, TError, TVariables, TContext>, 'mutationFn'>
) {
  return useMutation<TData, TError, TVariables, TContext>({
    mutationFn,
    ...options,
  });
}

```

The new `useApi.ts` hook file is now implemented in `src/hooks/` and contains:

- `useApiQuery`: A wrapper over React Query's `useQuery`, allowing for custom configuration, error handling, and future extensibility.
- `useApiMutation`: A wrapper over React Query's `useMutation`, also supporting custom config and extensibility.

Both hooks are fully type-safe, documented, and ready to be used as the new abstraction layer for all data fetching and mutation needs in your app.

You can now use these hooks in your components or in other custom hooks, instead of calling React Query's hooks directly. If you want usage examples or want to refactor existing hooks/components to use these, let me know!

---

**User**

now use these hook in other hooks

---

**Cursor**

```typescript
import { useApiQuery } from './useApi';
import { fetchProducts } from '../lib/api';
import type { Product } from '../types';

/**
 * React Query hook to fetch all products using the useApiQuery abstraction.
 * Returns { data, error, isLoading, isError, refetch }
 */
export function useProducts() {
  return useApiQuery<Product[]>(['products'], fetchProducts);
}

```

```typescript
import { useApiQuery } from './useApi';
import { fetchProductById } from '../lib/api';
import type { Product } from '../types';

/**
 * React Query hook to fetch a product by ID using the useApiQuery abstraction.
 * @param productId - The ID of the product to fetch
 * Returns { data, error, isLoading, isError, refetch }
 */
export function useProductById(productId: number) {
  return useApiQuery<Product>(['product', productId], () => fetchProductById(productId), { enabled: !!productId });
}

```

Both `useProducts` and `useProductById` hooks have been refactored to use the new `useApiQuery` abstraction from `useApi.ts`. This ensures all data fetching logic now goes through your custom wrapper, making it easier to manage global behaviors, error handling, and future enhancements.

- `useProducts` now calls `useApiQuery(['products'], fetchProducts)`
- `useProductById` now calls `useApiQuery(['product', productId], () => fetchProductById(productId), { enabled: !!productId })`

If you want to see how to use `useApiMutation` in a mutation hook, or want to refactor other hooks/components, let me know!

---

**User**

um.. integrate `await fetch` logic in main hook itself and pass endpoints to it
maintain a config of all endpoints in a ts file
and error handing too in the main hook file to reduce duplicate code




---

**Cursor**

```typescript
export const API_ENDPOINTS = {
  products: '/products',
  productById: (id: number) => `/products/${id}`,
};

export const BASE_URL = 'https://fakestoreapi.com';

```

```typescript
import { useQuery, useMutation, UseQueryOptions, UseMutationOptions, QueryKey } from '@tanstack/react-query';
import { BASE_URL } from '../lib/endpoints';

/**
 * Centralized fetch utility with error handling.
 */
async function fetcher<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, options);
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
 * @param fetchOptions - Optional fetch options
 */
export function useApiQuery<TData, TError = Error, TQueryKey extends QueryKey = QueryKey>(
  queryKey: TQueryKey,
  endpoint: string,
  options?: Omit<UseQueryOptions<TData, TError, TData, TQueryKey>, 'queryKey' | 'queryFn'>,
  fetchOptions?: RequestInit
) {
  return useQuery<TData, TError, TData, TQueryKey>({
    queryKey,
    queryFn: () => fetcher<TData>(endpoint, fetchOptions),
    ...options,
  });
}

/**
 * Wrapper for React Query's useMutation, handling fetch and errors internally.
 * @param endpoint - API endpoint string or function
 * @param options - Optional React Query options
 */
export function useApiMutation<TData, TError = Error, TVariables = void, TContext = unknown>(
  endpoint: string | ((variables: TVariables) => string),
  options?: Omit<UseMutationOptions<TData, TError, TVariables, TContext>, 'mutationFn'>,
  fetchOptions?: RequestInit
) {
  return useMutation<TData, TError, TVariables, TContext>({
    mutationFn: async (variables: TVariables) => {
      const url = typeof endpoint === 'function' ? endpoint(variables) : endpoint;
      return fetcher<TData>(url, { ...fetchOptions, body: variables ? JSON.stringify(variables) : undefined });
    },
    ...options,
  });
}

```

```typescript
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

```

```typescript
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

```

The hooks are now fully refactored to centralize fetch logic, endpoint management, and error handling:

- All API endpoints are defined in `src/lib/endpoints.ts` for maintainability.
- The main `useApiQuery` and `useApiMutation` hooks in `useApi.ts` now handle `await fetch` internally, including error handling and response parsing.
- `useProducts` and `useProductById` simply pass the endpoint from the config, reducing duplicate code and making the hooks much cleaner.

You can now add new API hooks by just passing the correct endpoint and query key—no need to write fetch logic or error handling again.

If you want to see how to use `useApiMutation` for POST/PUT/DELETE, or want to add more endpoints, let me know!

---

**User**

now use these in actual hooks and remove api.ts in lib folder


---

**Cursor**

```typescript
import { useCartStore } from '../store/cartStore';
import type { CartItem } from '../types';

/**
 * Hook to access cart state and actions from Zustand store.
 * Returns { items, addToCart, removeFromCart, updateQuantity, clearCart }
 */
export function useCart() {
  const items = useCartStore((state) => state.items);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);

  return { items, addToCart, removeFromCart, updateQuantity, clearCart };
}

```

- All actual hooks (`useProducts`, `useProductById`, and `useCart`) now use the new abstraction and endpoint config, with no dependency on the old `api.ts`.
- The legacy `src/lib/api.ts` file has been deleted, as all API logic is now handled through the new, unified hooks and endpoint config.

Your codebase is now fully migrated to the new, maintainable API abstraction. If you need to add more hooks, mutations, or want usage examples, just let me know!

---

**User**

seems like method types are missed in useApi.ts

---

**Cursor**

```typescript
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
  fetchOptions?: RequestInit & { method?: string }
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
  fetchOptions?: RequestInit & { method?: string }
) {
  return useMutation<TData, TError, TVariables, TContext>({
    mutationFn: async (variables: TVariables) => {
      const url = typeof endpoint === 'function' ? endpoint(variables) : endpoint;
      return fetcher<TData>(url, {
        method: fetchOptions?.method || 'POST',
        headers: { 'Content-Type': 'application/json', ...(fetchOptions?.headers || {}) },
        ...fetchOptions,
        body: variables ? JSON.stringify(variables) : undefined,
      });
    },
    ...options,
  });
}

```

Support for HTTP method types has now been added to `useApi.ts`:

- The `fetcher` utility and both hooks (`useApiQuery`, `useApiMutation`) now accept a `method` (GET, POST, PUT, DELETE, etc.) via `fetchOptions`.
- `useApiQuery` defaults to `GET`, and `useApiMutation` defaults to `POST` (but you can override).
- JSDoc comments have been updated to document this behavior.

You can now specify the HTTP method and any other fetch options directly when using these hooks, making them flexible for all API needs. If you want an example of using a different method (e.g., PUT or DELETE), just ask!

