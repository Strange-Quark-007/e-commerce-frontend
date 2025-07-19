import { useCartStore } from '../store/cartStore';

/**
 * Custom hook to access cart state and actions from the Zustand store.
 * Returns items, addToCart, removeFromCart, updateQuantity, and clearCart.
 */
export function useCart() {
  const items = useCartStore((state) => state.items);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);

  return { items, addToCart, removeFromCart, updateQuantity, clearCart };
}
