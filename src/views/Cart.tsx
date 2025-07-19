'use client';

import React from 'react';
import Image from 'next/image';
import { useCart } from '../hooks/useCart';
import { useProducts } from '../hooks/useProducts';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import Spinner from '../components/Spinner';
import EmptyState from '../components/EmptyState';
import { toTitleCase } from '../lib/utils';
import Container from '../components/Container';
import { MAX_CART_ITEMS } from '../lib/constants';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from '../components/ui/dialog';
import { Minus, Plus } from 'lucide-react';
import type { Product } from '../types';
interface CartItemRowProps {
  product: Product;
  quantity: number;
  onRemove: () => void;
  onUpdateQuantity: (newQty: number) => void;
}
function CartItemRow({ product, quantity, onRemove, onUpdateQuantity }: CartItemRowProps) {
  const [open, setOpen] = React.useState(false);
  return (
    <Card className="flex flex-col md:flex-row items-stretch md:items-center gap-4 p-4 relative">
      <Image
        src={product.image}
        alt={product.title}
        width={80}
        height={80}
        className="w-20 h-20 object-contain rounded bg-gray-50 border mx-auto md:mx-0"
        loading="lazy"
      />
      <div className="flex flex-col md:flex-row flex-1 min-w-0 gap-3 md:gap-4">
        {/* Left: image, name, category */}
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <span className="font-semibold text-base text-gray-900 truncate block mb-1" title={product.title}>
            {product.title}
          </span>
          <span className="text-xs text-gray-600 block mb-2">{toTitleCase(product.category)}</span>
        </div>
        {/* Right: counter and price */}
        <div className="flex flex-row items-center justify-between gap-2 w-full md:w-auto md:justify-end md:gap-4 md:text-right">
          <div className="flex items-center gap-2 justify-end relative">
            <Button
              size="icon"
              variant="ghost"
              aria-label="Decrease quantity"
              onClick={() => onUpdateQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="cursor-pointer disabled:cursor-not-allowed h-8 w-8"
            >
              <Minus className="w-4 h-4" />
            </Button>
            <span className="w-6 text-center select-none text-base font-medium relative">
              {quantity}
              {/* (max) message below quantity, absolute for all screens */}
              <span
                className="absolute left-1/2 -translate-x-1/2 top-full mt-0.5 block text-xs text-red-400 min-h-[1em]"
                style={{ height: '1em' }}
              >
                {quantity >= MAX_CART_ITEMS ? '(max)' : '\u00A0'}
              </span>
            </span>
            <Button
              size="icon"
              variant="ghost"
              aria-label="Increase quantity"
              onClick={() => onUpdateQuantity(Math.min(MAX_CART_ITEMS, quantity + 1))}
              disabled={quantity >= MAX_CART_ITEMS}
              className="cursor-pointer disabled:cursor-not-allowed h-8 w-8"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="font-semibold min-w-[60px] text-right">${product.price.toFixed(2)}</div>
        </div>
      </div>
      {/* Remove (cross) button: absolute top right on mobile, inline for md+ */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            aria-label="Remove from cart"
            className="cursor-pointer disabled:cursor-not-allowed absolute top-2 right-2 md:static md:ml-2"
            onClick={() => setOpen(true)}
          >
            <span aria-hidden>×</span>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove item?</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove <b>{product.title}</b> from your cart?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="destructive"
              onClick={() => {
                setOpen(false);
                onRemove();
              }}
            >
              Remove
            </Button>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}

function OrderSummaryRow({ product, quantity }: { product: Product; quantity: number }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="flex-1 min-w-0 flex items-center">
        <span className="truncate block max-w-[140px]" title={product.title}>
          {product.title}
        </span>
        <span className="font-bold ml-1 whitespace-nowrap">x{quantity}</span>
      </span>
      <span>{`$${(product.price * quantity).toFixed(2)}`}</span>
    </div>
  );
}

export default function CartPage() {
  const { items, removeFromCart, updateQuantity } = useCart();
  const hasItems = items.length > 0;
  const { data: products, isLoading, isError } = useProducts();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[40vh]">
        <Spinner />
      </div>
    );
  }
  if (isError || !products) {
    return <EmptyState message="Failed to load products." />;
  }

  const cartItemsWithProduct = items
    .map((item) => ({
      ...item,
      product: products.find((p) => p.id === item.productId),
    }))
    .filter((item) => !!item.product)
    .map((item) => ({ ...item, product: item.product as NonNullable<typeof item.product> }));

  const total = cartItemsWithProduct.reduce((sum, { product, quantity }) => sum + product.price * quantity, 0);

  return (
    <Container>
      <div className="flex flex-col lg:flex-row gap-4 py-4 min-h-[60vh]">
        {/* Left: Cart Items List */}
        <div className={hasItems ? 'lg:w-2/3 w-full' : 'w-full'}>
          <h2 className="text-xl font-semibold mb-4">Shopping Cart</h2>
          {!hasItems ? (
            <EmptyState
              message="Your cart is empty."
              actionLabel="Browse Products"
              onAction={() => (window.location.href = '/')}
            />
          ) : (
            <div className="space-y-4 overflow-y-auto" style={{ maxHeight: '520px' }}>
              {cartItemsWithProduct.map((item) => (
                <CartItemRow
                  key={item.productId}
                  product={item.product}
                  quantity={item.quantity}
                  onRemove={() => removeFromCart(item.productId)}
                  onUpdateQuantity={(qty) => updateQuantity(item.productId, qty)}
                />
              ))}
            </div>
          )}
        </div>
        {/* Right: Order Summary */}
        {hasItems && (
          <div className="lg:w-1/3 w-full">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <Card className="p-4 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                {cartItemsWithProduct.map(({ product, quantity, productId }) => (
                  <OrderSummaryRow key={productId} product={product} quantity={quantity} />
                ))}
              </div>
              <div className="border-t my-2" />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <Button className="w-full mt-2" disabled>
                Checkout (Coming Soon)
              </Button>
            </Card>
          </div>
        )}
      </div>
    </Container>
  );
}
