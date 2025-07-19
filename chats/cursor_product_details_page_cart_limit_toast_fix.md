# Product details page cart limit issue
_Exported on 7/19/2025 at 20:45:11 GMT+5:30 from Cursor (1.2.4)_

---

**User**

On product details page
Its not throwing error on adding item to cart if for single item it exceeds max item in cart



---

**Cursor**

The root cause of your issue is that the `addToCart` function in the product details page (`ProductDetails.tsx`) is not handling the case where adding the selected quantity would exceed the maximum allowed per item in the cart.

**Details:**
- The `addToCart` function in your Zustand store (`cartStore.ts`) does enforce the max item limit and provides an `onMaxQuantityError` callback for error handling.
- However, in `ProductDetails.tsx`, when calling `addToCart(product.id, quantity)`, you are not passing the `onMaxQuantityError` callback, nor are you checking the boolean return value to show an error if the limit is exceeded.
- As a result, if the user tries to add a quantity that exceeds the max, the store simply returns `false`, but the UI always shows a success toast.

**How to fix:**
- Pass an `onMaxQuantityError` callback to `addToCart` that shows an error toast.
- Only show the success toast if the addition was successful.

Would you like me to implement this fix for you?

---

**User**

use toast

---

**Cursor**

```typescriptreact
// ... existing code ...
  const handleAddToCart = () => {
    if (quantity >= 1 && product) {
      const success = addToCart(
        product.id,
        quantity,
        () => toast.error(`Cannot add more than the maximum allowed per item in cart.`)
      );
      if (success) {
        toast.success(`${quantity} item${quantity > 1 ? 's' : ''} added to cart!`);
        setQuantity(1);
      }
    }
  };
// ... existing code ...
```

The product details page now uses `toast` to show an error if adding the selected quantity would exceed the maximum allowed per item in the cart. It only shows the success toast if the addition was successful.

You can now test this: if a user tries to add more than the allowed quantity for a single item, they will see an error toast instead of a success message. Let me know if you need further adjustments!

---

**User**

mention number

---

**Cursor**

```typescriptreact
// ... existing code ...
import { MAX_CART_ITEMS } from '../lib/constants';
// ... existing code ...
  const handleAddToCart = () => {
    if (quantity >= 1 && product) {
      const success = addToCart(
        product.id,
        quantity,
        () => toast.error(`Cannot add more than ${MAX_CART_ITEMS} of this item to the cart.`)
      );
      if (success) {
        toast.success(`${quantity} item${quantity > 1 ? 's' : ''} added to cart!`);
        setQuantity(1);
      }
    }
  };
// ... existing code ...
```

The error toast now clearly mentions the maximum allowed number by using the value from `MAX_CART_ITEMS`. For example, it will say: "Cannot add more than 10 of this item to the cart." if the limit is 10.

This provides clear feedback to the user about the specific limit. Let me know if you need any more changes!

---

**User**

remove the callback and simply show toast based on the return boolean 

---

**Cursor**

```typescriptreact
// ... existing code ...
  const handleAddToCart = () => {
    if (quantity >= 1 && product) {
      const success = addToCart(product.id, quantity);
      if (success) {
        toast.success(`${quantity} item${quantity > 1 ? 's' : ''} added to cart!`);
        setQuantity(1);
      } else {
        toast.error(`Cannot add more than ${MAX_CART_ITEMS} of this item to the cart.`);
      }
    }
  };
// ... existing code ...
```

The code now removes the callback from `addToCart` and simply shows the appropriate toast based on the boolean return value:

- If `addToCart` returns `true`, a success toast is shown.
- If it returns `false`, an error toast is shown with the max item limit.

This makes the logic simpler and easier to follow. Let me know if you need any further changes!

---

**User**

remove callbacks from other files too as its not used

---

**Cursor**

```typescript
// ... existing code ...
interface CartState {
  items: CartItem[];
-  addToCart: (productId: number, quantity?: number, onMaxQuantityError?: () => void) => boolean;
+  addToCart: (productId: number, quantity?: number) => boolean;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}
// ... existing code ...
      /**
       * Add a product to the cart or update its quantity.
-       * Returns false if max quantity exceeded, true otherwise.
-       * @param productId - Product ID to add
-       * @param quantity - Quantity to add (default 1)
-       * @param onMaxQuantityError - Optional callback if max quantity is exceeded
+       * Returns false if max quantity exceeded, true otherwise.
+       * @param productId - Product ID to add
+       * @param quantity - Quantity to add (default 1)
       */
-      addToCart: (productId, quantity = 1, onMaxQuantityError) => {
+      addToCart: (productId, quantity = 1) => {
        const state = get();
        const existing = state.items.find((item) => item.productId === productId);
        if (existing) {
          const newQty = existing.quantity + quantity;
          if (newQty > MAX_CART_ITEMS) {
-            if (onMaxQuantityError) onMaxQuantityError();
            return false;
          }
          set({
            items: state.items.map((item) => (item.productId === productId ? { ...item, quantity: newQty } : item)),
          });
          return true;
        }
        if (quantity > MAX_CART_ITEMS) {
-          if (onMaxQuantityError) onMaxQuantityError();
          return false;
        }
        set({
          items: [...state.items, { productId, quantity }],
        });
        return true;
      },
// ... existing code ...
```

All references to the `onMaxQuantityError` callback have been removed from the cart store. The `addToCart` function now only takes `productId` and `quantity`, and simply returns a boolean to indicate success or failure.

No other files in your codebase used this callback, so this completes the cleanup. Let me know if you need anything else!

