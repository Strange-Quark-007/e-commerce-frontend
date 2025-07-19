import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem } from '../types';
import { MAX_CART_ITEMS } from '../lib/constants';

interface CartState {
  items: CartItem[];
  addToCart: (productId: number, quantity?: number, onMaxQuantityError?: () => void) => boolean;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

/**
 * Zustand store for managing shopping cart state.
 * - Persists cart items in localStorage.
 * - Provides actions to add, remove, update, and clear cart items.
 * - Enforces a maximum quantity per item.
 */
export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      /**
       * Add a product to the cart or update its quantity.
       * Returns false if max quantity exceeded, true otherwise.
       * @param productId - Product ID to add
       * @param quantity - Quantity to add (default 1)
       * @param onMaxQuantityError - Optional callback if max quantity is exceeded
       */
      addToCart: (productId, quantity = 1, onMaxQuantityError) => {
        const state = get();
        const existing = state.items.find((item) => item.productId === productId);
        if (existing) {
          const newQty = existing.quantity + quantity;
          if (newQty > MAX_CART_ITEMS) {
            if (onMaxQuantityError) onMaxQuantityError();
            return false;
          }
          set({
            items: state.items.map((item) => (item.productId === productId ? { ...item, quantity: newQty } : item)),
          });
          return true;
        }
        if (quantity > MAX_CART_ITEMS) {
          if (onMaxQuantityError) onMaxQuantityError();
          return false;
        }
        set({
          items: [...state.items, { productId, quantity }],
        });
        return true;
      },
      /**
       * Remove a product from the cart by its ID.
       * @param productId - Product ID to remove
       */
      removeFromCart: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        })),
      /**
       * Update the quantity of a product in the cart.
       * @param productId - Product ID to update
       * @param quantity - New quantity
       */
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items: state.items.map((item) => (item.productId === productId ? { ...item, quantity } : item)),
        })),
      /**
       * Clear all items from the cart.
       */
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'cart-storage',
      // storage: localStorage is default, so omit for type safety
    },
  ),
);
