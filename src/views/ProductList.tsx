'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMediaQuery } from 'react-responsive';
import { Search, Filter, X, ChevronDown } from 'lucide-react';

import { useProducts, useProductCategories } from '@/hooks/useProducts';
import type { Product } from '@/types';
import ErrorMessage from '@/components/ErrorMessage';
import EmptyState, { DefaultEmptyIcon } from '@/components/EmptyState';
import ProductCard from '@/components/ProductCard';
import { Skeleton } from '@/components/ui/skeleton';
import Container from '@/components/Container';
import { toTitleCase } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import {
  APP_NAME,
  DEFAULT_PAGE,
  PAGE_SIZE_DESKTOP,
  PAGE_SIZE_TABLET,
  PAGE_SIZE_LG_TABLET,
  PAGE_SIZE_MOBILE,
  SKELETON_CARD_COUNT,
  BREAKPOINT_XL,
  BREAKPOINT_LG,
  BREAKPOINT_MD,
} from '@/lib/constants';

export default function ProductListPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParam = searchParams?.get('category') || '';
  const { data: products, isLoading, isError, error, refetch } = useProducts(categoryParam || undefined);
  const { data: categories, isLoading: isCategoriesLoading } = useProductCategories();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(DEFAULT_PAGE);
  const isXL = useMediaQuery({ minWidth: BREAKPOINT_XL });
  const isLG = useMediaQuery({ minWidth: BREAKPOINT_LG, maxWidth: BREAKPOINT_XL - 1 });
  const isMD = useMediaQuery({ minWidth: BREAKPOINT_MD, maxWidth: BREAKPOINT_LG - 1 });
  let PAGE_SIZE = PAGE_SIZE_DESKTOP;
  if (isXL) PAGE_SIZE = PAGE_SIZE_DESKTOP;
  else if (isMD) PAGE_SIZE = PAGE_SIZE_TABLET;
  else if (isLG) PAGE_SIZE = PAGE_SIZE_LG_TABLET;
  else PAGE_SIZE = PAGE_SIZE_MOBILE;

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

  useEffect(() => {
    if (categories && categoryParam && !categories.includes(categoryParam)) {
      const params = new URLSearchParams(Array.from(searchParams?.entries() || []));
      params.delete('category');
      router.replace(`?${params.toString()}`, { scroll: false });
    }
  }, [categories, categoryParam, router, searchParams]);

  function handleCategoryChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    const params = new URLSearchParams(Array.from(searchParams?.entries() || []));
    if (value) {
      params.set('category', value);
    } else {
      params.delete('category');
    }
    router.push(`?${params.toString()}`, { scroll: false });
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
          <div className="relative w-48">
            <select
              id="category"
              className="block w-full px-3 py-2 border border-border rounded-md bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary appearance-none pr-10"
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
            <ChevronDown
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground"
              aria-hidden="true"
            />
          </div>
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
              {Array.from({ length: SKELETON_CARD_COUNT }).map((_, i) => (
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
