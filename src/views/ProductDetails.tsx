'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';
import { Minus, Plus } from 'lucide-react';

import { useProductById } from '@/hooks/useProductById';
import { useCart } from '@/hooks/useCart';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import ErrorMessage from '@/components/ErrorMessage';
import CategoryBadge from '@/components/CategoryBadge';
import { Card } from '@/components/ui/card';
import { MAX_QUANTITY_PER_ITEM, MIN_QUANTITY_PER_ITEM } from '@/lib/constants';

function Counter({
  value,
  onDecrement,
  onIncrement,
  min = MIN_QUANTITY_PER_ITEM,
  max = MAX_QUANTITY_PER_ITEM,
  disabled,
}: {
  value: number;
  onDecrement: () => void;
  onIncrement: () => void;
  min?: number;
  max?: number;
  disabled?: boolean;
}) {
  return (
    <div className="flex items-center gap-2 mb-2">
      <Button
        size="icon"
        variant="ghost"
        onClick={onDecrement}
        aria-label="Decrease quantity"
        disabled={value === min || disabled}
      >
        <Minus className="w-4 h-4" />
      </Button>
      <span className="w-8 text-center select-none text-card-foreground">{value}</span>
      <Button
        size="icon"
        variant="ghost"
        onClick={onIncrement}
        aria-label="Increase quantity"
        disabled={value === max || disabled}
      >
        <Plus className="w-4 h-4" />
      </Button>
    </div>
  );
}

export default function ProductDetailsPage() {
  const params = useParams();
  const id = Number(params?.id);
  const { data: product, isLoading, isError, error, refetch } = useProductById(id);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState<number>(MIN_QUANTITY_PER_ITEM);

  const handleDecrement = () => setQuantity((q: number) => Math.max(MIN_QUANTITY_PER_ITEM, q - 1));
  const handleIncrement = () => {
    setQuantity((q: number) => {
      if (q >= MAX_QUANTITY_PER_ITEM - 1) {
        toast.warning(`Maximum quantity is ${MAX_QUANTITY_PER_ITEM}`);
        return MAX_QUANTITY_PER_ITEM;
      }
      return q + 1;
    });
  };
  const handleAddToCart = () => {
    if (quantity >= 1 && product) {
      const success = addToCart(product.id, quantity);
      if (success) {
        toast.success(`${quantity} item${quantity > 1 ? 's' : ''} added to cart!`);
        setQuantity(1);
      } else {
        toast.error(`Cannot add more than ${MAX_QUANTITY_PER_ITEM} of this item to the cart.`);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center bg-background">
        <Card className="max-w-4xl w-full py-10 px-4 flex flex-col md:flex-row gap-8">
          <div className="flex-shrink-0 w-full md:w-1/2 flex items-center justify-center">
            <Skeleton className="w-[320px] h-[360px] md:w-[400px] md:h-[440px] rounded-lg bg-muted" />
          </div>
          <div className="flex-1 flex flex-col gap-5">
            <Skeleton className="h-12 w-3/4 mb-2 bg-muted" />
            <Skeleton className="h-7 w-32 mb-2 bg-muted" />
            <Skeleton className="h-8 w-24 mb-2 bg-muted" />
            <Skeleton className="h-6 w-20 mb-2 bg-muted" />
            <Skeleton className="h-20 w-full mb-4 bg-muted" />
            <div className="flex items-center gap-2 mb-2">
              <Skeleton className="h-12 w-12 rounded-md bg-muted" />
              <Skeleton className="h-10 w-10 bg-muted" />
              <Skeleton className="h-12 w-12 rounded-md bg-muted" />
            </div>
            <Skeleton className="h-14 w-44 rounded-md bg-muted" />
          </div>
        </Card>
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
        <div className="flex-shrink-0 w-full md:w-1/2 flex items-center justify-center">
          <div className="transition-transform duration-200 ease-in-out rounded-lg hover:shadow-lg bg-muted dark:bg-zinc-800 hover:scale-105 dark:filter dark:invert">
            <Image
              src={product.image}
              alt={product.title}
              width={400}
              height={400}
              className="rounded-lg object-contain bg-transparent mix-blend-multiply dark:mix-blend-screen dark:filter dark:invert"
              priority
            />
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <div className="mb-2">
            <CategoryBadge category={product.category} className="mb-2" />
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
          <Counter value={quantity} onDecrement={handleDecrement} onIncrement={handleIncrement} min={1} max={10} />
          <Button
            size="lg"
            className="w-full md:w-fit"
            onClick={handleAddToCart}
            disabled={quantity < MIN_QUANTITY_PER_ITEM}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
