'use client';

import React from 'react';
import { useCart } from '../../hooks/useCart';
import { useProducts } from '../../hooks/useProducts';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import Spinner from '../../components/Spinner';
import EmptyState from '../../components/EmptyState';
import { toTitleCase } from '../../lib/utils';
import Container from '../../components/Container';
import { MAX_CART_ITEMS } from '../../lib/constants';

function CartItemRow({
  product,
  quantity,
  onRemove,
  onUpdateQuantity,
}: {
  product: any;
  quantity: number;
  onRemove: () => void;
  onUpdateQuantity: (newQty: number) => void;
}) {
  return (
    <Card className="flex flex-row items-center gap-4 p-4">
      <img
        src={product.image}
        alt={product.title}
        className="w-20 h-20 object-contain rounded bg-gray-50 border"
        loading="lazy"
      />
      <div className="flex flex-1 min-w-0 items-center gap-4">
        <div className="flex-1 min-w-0">
          <span className="font-medium truncate block" title={product.title}>
            {product.title}
          </span>
          <span className="text-xs text-gray-500 block">{toTitleCase(product.category)}</span>
        </div>
        <div className="flex flex-col items-center relative">
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              aria-label="Decrease quantity"
              onClick={() => onUpdateQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
            >
              -
            </Button>
            <span className="w-6 text-center select-none">{quantity}</span>
            <Button
              size="sm"
              variant="outline"
              aria-label="Increase quantity"
              onClick={() => onUpdateQuantity(Math.min(MAX_CART_ITEMS, quantity + 1))}
              disabled={quantity >= MAX_CART_ITEMS}
            >
              +
            </Button>
          </div>
          <span className=" absolute top-5 block text-xs text-red-400 min-h-[1em] mt-0.5" style={{ height: '1em' }}>
            {quantity >= MAX_CART_ITEMS ? '(max)' : '\u00A0'}
          </span>
        </div>
        <div className="font-semibold w-16 text-right">${product.price.toFixed(2)}</div>
        <Button size="icon" variant="ghost" aria-label="Remove from cart" onClick={onRemove}>
          <span aria-hidden>×</span>
        </Button>
      </div>
    </Card>
  );
}

function OrderSummaryRow({ product, quantity }: { product: NonNullable<any>; quantity: number }) {
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

  // For each cart item, get its product from products array
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
      <div className="flex flex-col md:flex-row gap-8 py-4 md:py-8 min-h-[60vh]">
        {/* Left: Cart Items List */}
        <div className="flex-1">
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
          <div className="w-full md:w-96">
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
