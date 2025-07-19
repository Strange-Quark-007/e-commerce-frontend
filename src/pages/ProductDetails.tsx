'use client';

import { useProductById } from '../hooks/useProductById';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import Image from 'next/image';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';
import { useParams } from 'next/navigation';
import { useCart } from '../hooks/useCart';
import { useState } from 'react';
import { toast } from 'sonner';
import { Skeleton } from '../components/ui/skeleton';

export default function ProductDetailsPage() {
  const params = useParams();
  const id = Number(params?.id);
  const { data: product, isLoading, isError, error, refetch } = useProductById(id);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleDecrement = () => setQuantity((q) => Math.max(1, q - 1));
  const handleIncrement = () => {
    setQuantity((q) => {
      if (q >= 9) {
        toast.warning('Maximum quantity is 10');
        return 10;
      }
      return q + 1;
    });
  };
  const handleAddToCart = () => {
    if (quantity >= 1 && product) {
      addToCart(product.id, quantity);
      toast.success(`${quantity} item${quantity > 1 ? 's' : ''} added to cart!`);
      setQuantity(1);
    }
  };

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50">
        <div className="max-w-4xl w-full py-10 px-4 flex flex-col md:flex-row gap-8">
          {/* Left: Image Skeleton */}
          <div className="flex-shrink-0 w-full md:w-1/2 flex items-center justify-center">
            <Skeleton className="w-[320px] h-[320px] md:w-[400px] md:h-[400px] rounded-lg bg-gray-200" />
          </div>
          {/* Right: Details Skeleton */}
          <div className="flex-1 flex flex-col gap-4">
            <Skeleton className="h-10 w-3/4 mb-2" /> {/* Title */}
            <Skeleton className="h-6 w-32 mb-2" /> {/* Category badge */}
            <Skeleton className="h-7 w-24 mb-2" /> {/* Price */}
            <Skeleton className="h-5 w-20 mb-2" /> {/* Rating */}
            <Skeleton className="h-16 w-full mb-4" /> {/* Description */}
            <div className="flex items-center gap-2 mb-2">
              <Skeleton className="h-10 w-10 rounded-md" />
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-10 w-10 rounded-md" />
            </div>
            <Skeleton className="h-12 w-40 rounded-md" /> {/* Add to Cart button */}
          </div>
        </div>
      </div>
    );
  }

  const isProductInvalid = !product || !product.id || !product.title;
  if (isError) {
    return <ErrorMessage message={error?.message || 'Failed to load product.'} onRetry={refetch} />;
  }
  if (isProductInvalid) {
    return <ErrorMessage message={'Product Not Found.'} />;
  }

  return (
    <div className="h-full flex items-center justify-center">
      <div className="max-w-4xl w-full py-10 px-4 flex flex-col md:flex-row gap-8">
        {/* Left: Large Image */}
        <div className="flex-shrink-0 w-full md:w-1/2 flex items-center justify-center">
          <div className="transition-transform duration-200 ease-in-out rounded-lg hover:shadow-lg bg-white hover:scale-105">
            <Image
              src={product.image}
              alt={product.title}
              width={400}
              height={400}
              className="rounded-lg object-contain bg-white"
              priority
            />
          </div>
        </div>
        {/* Right: Details */}
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          {/* Category and Price (separate lines) */}
          <div className="mb-2">
            <Badge variant="secondary" className="capitalize mb-2 inline-block">
              {product.category}
            </Badge>
            <div className="text-xl font-semibold text-primary mt-1">${product.price}</div>
          </div>
          {product.rating && (
            <div className="flex items-center gap-1 text-sm text-yellow-600 mb-2">
              <span aria-label="Rating" title={`Rated ${product.rating.rate} out of 5`}>
                ★
              </span>
              <span>{product.rating.rate}</span>
              <span className="text-xs text-gray-400">({product.rating.count})</span>
            </div>
          )}
          <p className="text-muted-foreground mb-4">{product.description}</p>
          {/* Quantity selector */}
          <div className="flex items-center gap-2 mb-2">
            <Button
              size="icon"
              variant="outline"
              onClick={handleDecrement}
              aria-label="Decrease quantity"
              disabled={quantity === 1}
            >
              -
            </Button>
            <span className="w-8 text-center select-none">{quantity}</span>
            <Button
              size="icon"
              variant="outline"
              onClick={handleIncrement}
              aria-label="Increase quantity"
              disabled={quantity === 10}
            >
              +
            </Button>
          </div>
          <Button size="lg" className="w-full md:w-fit" onClick={handleAddToCart} disabled={quantity < 1}>
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
