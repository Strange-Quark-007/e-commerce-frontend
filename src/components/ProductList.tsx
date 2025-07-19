'use client';

import { useProducts, useProductCategories } from '../hooks/useProducts';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useMemo, useEffect } from 'react';
import ErrorMessage from './ErrorMessage';
import EmptyState, { DefaultEmptyIcon } from './EmptyState';
import ProductCard from './ProductCard';
import { Skeleton } from './ui/skeleton';
import Container from './Container';
import { Search, Filter, X } from 'lucide-react';
import { toTitleCase } from '../lib/utils';

export default function ProductList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category') || '';
  const { data: products, isLoading, isError, error, refetch } = useProducts(categoryParam || undefined);
  const { data: categories, isLoading: isCategoriesLoading } = useProductCategories();
  const [search, setSearch] = useState('');
  // Pagination state
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 8;

  // Filter products by search term (case-insensitive, in name/title)
  const filteredProducts = useMemo(() => {
    if (!products) return [];
    if (!search.trim()) return products;
    return products.filter((p) => p.title.toLowerCase().includes(search.trim().toLowerCase()));
  }, [products, search]);
  // Paginate filtered products
  const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredProducts.slice(start, start + PAGE_SIZE);
  }, [filteredProducts, page]);

  // Reset to page 1 when search or filter changes
  useEffect(() => {
    setPage(1);
  }, [search, categoryParam]);

  function handleCategoryChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    const params = new URLSearchParams(window.location.search);
    if (value) {
      params.set('category', value);
    } else {
      params.delete('category');
    }
    router.push(`${window.location.pathname}?${params.toString()}`, { scroll: false });
  }

  if (isError) {
    return <ErrorMessage message={error?.message || 'Failed to load products.'} onRetry={refetch} />;
  }

  // Always render the search bar and category filter
  return (
    <Container className="h-full flex flex-col py-4 px-2 sm:px-4 lg:px-6">
      {/* Search bar and category filter (always rendered, never duplicated) */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 gap-y-2 py-2">
        {/* Category filter left */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500" aria-hidden="true" />
          <label htmlFor="category" className="text-sm font-medium text-gray-700">
            Category:
          </label>
          <select
            id="category"
            className="block w-48 px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            value={categoryParam}
            onChange={handleCategoryChange}
            disabled={isCategoriesLoading || isLoading}
            aria-label="Filter by category"
          >
            <option value="">All Categories</option>
            {categories?.map((cat) => (
              <option key={cat} value={cat}>
                {toTitleCase(cat)}
              </option>
            ))}
          </select>
        </div>
        {/* Search bar right */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <div className="relative w-full sm:w-72">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-4 h-4 text-gray-400" aria-hidden="true" />
            </span>
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-8 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search products"
              disabled={isLoading}
            />
            {search.trim() && (
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 focus:outline-none"
                onClick={() => setSearch('')}
                aria-label="Clear search"
                tabIndex={0}
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
      {/* Main content: products or empty state */}
      <div className="flex-1 flex flex-col justify-between">
        <div className="flex-1">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-xl shadow-sm">
                  <Skeleton className="aspect-w-1 aspect-h-1 w-full h-36 rounded-t-xl bg-gray-100" />
                  <div className="p-3 flex flex-col gap-1">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/3" />
                    <Skeleton className="h-5 w-1/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : !products || filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[30vh] gap-1">
              <EmptyState
                icon={<DefaultEmptyIcon />}
                message={search.trim() ? 'No products found for your search.' : 'No products found.'}
              />
              {search.trim() && (
                <button
                  className="underline text-primary text-sm cursor-pointer disabled:cursor-not-allowed"
                  onClick={() => setSearch('')}
                  aria-label="Reset search"
                >
                  Reset search
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-4">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
        {/* Pagination controls always at bottom */}
        <div className="flex justify-center items-center gap-2 mt-4 min-h-[40px]">
          {totalPages > 1 && (
            <>
              <button
                className="px-2 py-1 rounded border text-sm disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                aria-label="Previous page"
              >
                Prev
              </button>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  className={`px-2 py-1 rounded border text-sm cursor-pointer disabled:cursor-not-allowed ${page === i + 1 ? 'bg-primary text-white' : ''}`}
                  onClick={() => setPage(i + 1)}
                  aria-current={page === i + 1 ? 'page' : undefined}
                  aria-label={`Go to page ${i + 1}`}
                  disabled={false}
                >
                  {i + 1}
                </button>
              ))}
              <button
                className="px-2 py-1 rounded border text-sm disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                aria-label="Next page"
              >
                Next
              </button>
            </>
          )}
        </div>
      </div>
    </Container>
  );
}
