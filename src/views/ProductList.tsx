'use client';

import { useProducts, useProductCategories } from '../hooks/useProducts';
import type { Product } from '../types';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useMemo, useEffect } from 'react';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState, { DefaultEmptyIcon } from '../components/EmptyState';
import ProductCard from '../components/ProductCard';
import { Skeleton } from '../components/ui/skeleton';
import Container from '../components/Container';
import { Search, Filter, X } from 'lucide-react';
import { toTitleCase } from '../lib/utils';
import { useMediaQuery } from 'react-responsive';
import { Card } from '../components/ui/card';

export default function ProductListPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParam = searchParams?.get('category') || '';
  const { data: products, isLoading, isError, error, refetch } = useProducts(categoryParam || undefined);
  const { data: categories, isLoading: isCategoriesLoading } = useProductCategories();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const isXL = useMediaQuery({ minWidth: 1280 }); // desktop
  const isLG = useMediaQuery({ minWidth: 1024, maxWidth: 1279 }); // large tablet
  const isMD = useMediaQuery({ minWidth: 768, maxWidth: 1023 }); // tablet
  let PAGE_SIZE = 8;
  if (isXL)
    PAGE_SIZE = 8; // 2x4
  else if (isMD)
    PAGE_SIZE = 9; // 3x3
  else if (isLG)
    PAGE_SIZE = 8; // 4x2
  else PAGE_SIZE = 4; // mobile fallback

  const filteredProducts = useMemo<Product[]>(() => {
    if (!products) return [] as Product[];
    if (!search.trim()) return products as Product[];
    return (products as Product[]).filter((p: Product) => p.title.toLowerCase().includes(search.trim().toLowerCase()));
  }, [products, search]);
  const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredProducts.slice(start, start + PAGE_SIZE);
  }, [filteredProducts, page, PAGE_SIZE]);

  useEffect(() => {
    setPage(1);
  }, [search, categoryParam]);

  // If the categoryParam is invalid, reset it to All Categories
  useEffect(() => {
    if (categories && categoryParam && !categories.includes(categoryParam)) {
      const params = new URLSearchParams(window.location.search);
      params.delete('category');
      router.replace(`${window.location.pathname}?${params.toString()}`, { scroll: false });
    }
    // Only run when categories or categoryParam changes
  }, [categories, categoryParam, router]);

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

  return (
    <Container className="h-full flex flex-col py-4 px-2 sm:px-4 lg:px-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 gap-y-3 py-2 pb-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500" aria-hidden="true" />
          <label htmlFor="category" className="text-sm font-medium text-foreground">
            Category:
          </label>
          <select
            id="category"
            className="block w-48 px-3 py-2 border border-border rounded-md bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
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
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <div className="relative w-full sm:w-72">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-4 h-4 text-gray-400" aria-hidden="true" />
            </span>
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-8 py-2 border border-border rounded-md text-sm text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search products"
              disabled={isLoading}
            />
            {search.trim() && (
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground focus:outline-none"
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
      <div className="flex-1 flex flex-col justify-between">
        <div className="flex-1">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {Array.from({ length: 8 }).map((_, i) => (
                <Card key={i} className="p-0 gap-0">
                  <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-t-xl bg-muted flex items-center justify-center">
                    <Skeleton className="w-full h-48 bg-muted" />
                  </div>
                  <div className="border-b border-border" />
                  <div className="p-3 flex flex-col gap-2">
                    <Skeleton className="h-5 w-3/4 bg-muted" />
                    <Skeleton className="h-5 w-1/4 bg-muted" />
                    <Skeleton className="h-3 w-1/3 bg-muted" />
                    <Skeleton className="h-3 w-1/2 bg-muted" />
                  </div>
                </Card>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
              {paginatedProducts.map((product: Product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
        <div className="flex justify-center items-center gap-2 mt-4 min-h-[40px]">
          {totalPages > 1 && (
            <>
              <button
                className="px-2 py-1 rounded border border-border bg-background text-foreground text-sm disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                aria-label="Previous page"
              >
                Prev
              </button>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  className={`px-2 py-1 rounded border border-border text-sm cursor-pointer disabled:cursor-not-allowed bg-background text-foreground hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-primary ${page === i + 1 ? 'bg-primary text-primary-foreground' : ''}`}
                  onClick={() => setPage(i + 1)}
                  aria-current={page === i + 1 ? 'page' : undefined}
                  aria-label={`Go to page ${i + 1}`}
                  disabled={false}
                >
                  {i + 1}
                </button>
              ))}
              <button
                className="px-2 py-1 rounded border border-border bg-background text-foreground text-sm disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-primary"
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
