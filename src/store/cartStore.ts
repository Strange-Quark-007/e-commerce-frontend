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

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
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
      removeFromCart: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        })),
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items: state.items.map((item) => (item.productId === productId ? { ...item, quantity } : item)),
        })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'cart-storage',
      // storage: localStorage is default, so omit for type safety
    },
  ),
);
