'use client';

import { useProducts } from '../hooks/useProducts';
import Spinner from './Spinner';
import ErrorMessage from './ErrorMessage';
import EmptyState, { DefaultEmptyIcon } from './EmptyState';

export default function ProductList() {
  const { data: products, isLoading, isError, error, refetch } = useProducts();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[40vh]">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return <ErrorMessage message={error?.message || 'Failed to load products.'} onRetry={refetch} />;
  }

  if (!products || products.length === 0) {
    return <EmptyState icon={<DefaultEmptyIcon />} message="No products found." />;
  }

  return (
    <div className="container mx-auto py-8">
      {/* TODO: Product grid/list goes here */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Map products to ProductCard here */}
      </div>
    </div>
  );
}
