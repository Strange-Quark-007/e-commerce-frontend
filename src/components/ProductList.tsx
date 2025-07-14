'use client';

import { useProducts, useProductCategories } from '../hooks/useProducts';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import Spinner from './Spinner';
import ErrorMessage from './ErrorMessage';
import EmptyState, { DefaultEmptyIcon } from './EmptyState';
import ProductCard from './ProductCard';
import { Skeleton } from './ui/skeleton';
import Container from './Container';

function toTitleCase(str: string) {
  return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase());
}

export default function ProductList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category') || '';
  const { data: products, isLoading, isError, error, refetch } = useProducts(categoryParam || undefined);
  const { data: categories, isLoading: isCategoriesLoading } = useProductCategories();

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

  if (isLoading) {
    return (
      <Container className="py-8">
        {/* Category filter dropdown always visible */}
        <div className="mb-6 flex items-center gap-4">
          <label htmlFor="category" className="text-sm font-medium text-gray-700">
            Category:
          </label>
          <select
            id="category"
            className="block w-48 px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            value={categoryParam}
            onChange={handleCategoryChange}
            disabled={isCategoriesLoading}
          >
            <option value="">All Categories</option>
            {isCategoriesLoading ? (
              <option disabled>Loading...</option>
            ) : (
              categories?.map((cat) => (
                <option key={cat} value={cat}>
                  {toTitleCase(cat)}
                </option>
              ))
            )}
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-xl shadow-sm">
              <Skeleton className="aspect-w-1 aspect-h-1 w-full h-48 rounded-t-xl bg-gray-100" />
              <div className="p-4 flex flex-col gap-1">
                <Skeleton className="h-5 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/3 mb-1" />
                <Skeleton className="h-6 w-1/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </Container>
    );
  }

  if (isError) {
    return <ErrorMessage message={error?.message || 'Failed to load products.'} onRetry={refetch} />;
  }

  if (!products || products.length === 0) {
    return <EmptyState icon={<DefaultEmptyIcon />} message="No products found." />;
  }

  return (
    <Container className="py-8">
      {/* Category filter dropdown */}
      <div className="mb-6 flex items-center gap-4">
        <label htmlFor="category" className="text-sm font-medium text-gray-700">
          Category:
        </label>
        <select
          id="category"
          className="block w-48 px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          value={categoryParam}
          onChange={handleCategoryChange}
          disabled={isCategoriesLoading}
        >
          <option value="">All Categories</option>
          {categories?.map((cat) => (
            <option key={cat} value={cat}>
              {toTitleCase(cat)}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </Container>
  );
}
