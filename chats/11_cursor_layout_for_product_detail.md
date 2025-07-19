# Design layout for product details page
_Exported on 7/14/2025 at 23:42:17 GMT+5:30 from Cursor (1.2.4)_

---

**User**

Start with Product Details Page Tasks

Further instructions:
on left it should show a larger image with product name on right
below that category and price as shown on card like badge
add to cart button


---

**Cursor**

```typescriptreact
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import Image from 'next/image';

// TODO: Replace with real data fetching
const product = {
  id: 1,
  name: 'Sample Product',
  image: 'https://via.placeholder.com/400',
  category: 'electronics',
  price: 99.99,
  description: 'This is a sample product description.',
};

export default function ProductDetailsPage() {
  return (
    <div className="max-w-4xl mx-auto py-10 px-4 flex flex-col md:flex-row gap-8">
      {/* Left: Large Image */}
      <div className="flex-shrink-0 w-full md:w-1/2 flex items-center justify-center">
        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={400}
          className="rounded-lg object-contain bg-white"
          priority
        />
      </div>
      {/* Right: Details */}
      <div className="flex-1 flex flex-col gap-4">
        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="secondary" className="capitalize">{product.category}</Badge>
          <span className="text-xl font-semibold text-primary">${product.price}</span>
        </div>
        <p className="text-muted-foreground mb-4">{product.description}</p>
        <Button size="lg" className="w-full md:w-fit">Add to Cart</Button>
      </div>
    </div>
  );
}

```

```typescriptreact
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
// ... existing code ...
```

The Product Details page route and layout have been created at `src/app/products/[id]/page.tsx` with the following features:

- **Left:** Large product image
- **Right:** Product name
- **Below name:** Category (as a badge) and price
- **Below that:** Product description and a prominent "Add to Cart" button

Currently, placeholder data is used. The next step will be to integrate real product data fetching by ID.

Would you like to preview this layout or proceed with implementing data fetching for the product details?

---

**User**

go with data fetching

---

**Cursor**

```typescriptreact
'use client';

import { useProductById } from '../../../hooks/useProductById';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import Image from 'next/image';
import Spinner from '../../../components/Spinner';
import ErrorMessage from '../../../components/ErrorMessage';
import { useParams } from 'next/navigation';

export default function ProductDetailsPage() {
  const params = useParams();
  const id = Number(params?.id);
  const { data: product, isLoading, isError, error, refetch } = useProductById(id);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[40vh]">
        <Spinner />
      </div>
    );
  }

  if (isError || !product) {
    return <ErrorMessage message={error?.message || 'Failed to load product.'} onRetry={refetch} />;
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 flex flex-col md:flex-row gap-8">
      {/* Left: Large Image */}
      <div className="flex-shrink-0 w-full md:w-1/2 flex items-center justify-center">
        <Image
          src={product.image}
          alt={product.title}
          width={400}
          height={400}
          className="rounded-lg object-contain bg-white"
          priority
        />
      </div>
      {/* Right: Details */}
      <div className="flex-1 flex flex-col gap-4">
        <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="secondary" className="capitalize">{product.category}</Badge>
          <span className="text-xl font-semibold text-primary">${product.price}</span>
        </div>
        <p className="text-muted-foreground mb-4">{product.description}</p>
        <Button size="lg" className="w-full md:w-fit">Add to Cart</Button>
      </div>
    </div>
  );
}

```

Product details data fetching by ID is now implemented on the Product Details page:

- The page uses the `useProductById` hook to fetch product data based on the dynamic route param (`id`).
- Loading and error states are handled with the existing `Spinner` and `ErrorMessage` components.
- The layout and UI remain as specified, but now display real product data from the API.

You can now navigate to `/products/[id]` (e.g., `/products/1`) to see the live product details.

Would you like to proceed with implementing the "Add to Cart" button functionality next?

---

**User**

Error: Invalid src prop (https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg) on `next/image`, hostname "fakestoreapi.com" is not configured under images in your `next.config.js`

configure this and also use Image from next on product card

---

**Cursor**

```typescript
// ... existing code ...
const nextConfig = {
  images: {
    domains: ['fakestoreapi.com'],
  },
};

export default nextConfig;
// ... existing code ...
```

```typescriptreact
import Link from 'next/link';
import type { Product } from '../types';
import Image from 'next/image';

function toTitleCase(str: string) {
  return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase());
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="block bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-primary group"
      aria-label={`View details for ${product.title}`}
    >
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-t-xl bg-gray-50 flex items-center justify-center">
        <Image
          src={product.image}
          alt={product.title}
          width={200}
          height={200}
          className="object-contain w-full h-44 group-hover:scale-105 transition-transform duration-200"
          loading="lazy"
        />
      </div>
      {/* Divider below image */}
      <div className="border-b border-gray-100" />
      <div className="p-3 flex flex-col gap-1">
        <h2 className="text-base font-semibold text-gray-900 truncate" title={product.title}>
          {product.title}
        </h2>
        <div>
          <span
            className="inline-block px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600"
            title={toTitleCase(product.category)}
          >
            {toTitleCase(product.category)}
          </span>
        </div>
        <div className="text-lg font-bold text-primary">${product.price.toFixed(2)}</div>
        {product.rating && (
          <div className="flex items-center gap-1 text-sm text-yellow-600">
            <span aria-label="Rating" title={`Rated ${product.rating.rate} out of 5`}>
              ★
            </span>
            <span>{product.rating.rate}</span>
            <span className="text-xs text-gray-400">({product.rating.count})</span>
          </div>
        )}
      </div>
    </Link>
  );
}

```

The following updates are complete:

1. **Image domain configuration:**  
   - The `next.config.ts` file now allows images from `fakestoreapi.com`, resolving the Next.js image domain error.

2. **ProductCard image update:**  
   - The product image in `ProductCard` now uses Next.js's `<Image />` component for optimized loading and layout.

You can now use product images from the API in both the product card and product details page without errors.

Would you like to proceed with the "Add to Cart" button functionality on the Product Details page?

---

**User**

also show ratings on description page like on card

---

**Cursor**

```typescriptreact
// ... existing code ...
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="secondary" className="capitalize">
            {product.category}
          </Badge>
          <span className="text-xl font-semibold text-primary">${product.price}</span>
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
// ... existing code ...
```

The Product Details page now displays the product's rating (star, value, and count) below the price and category, matching the style used on the product card.

Would you like to proceed with the "Add to Cart" button functionality or any further UI adjustments?

---

**User**

add - count + & add to cart button
to allow for more items to be added
disable add cta on 0
do not allow -ve count


---

**Cursor**

```typescriptreact
// ... existing code ...
import { useCart } from '../../../hooks/useCart';
import { useState } from 'react';
// ... existing code ...
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleDecrement = () => setQuantity((q) => Math.max(0, q - 1));
  const handleIncrement = () => setQuantity((q) => q + 1);
  const handleAddToCart = () => {
    if (quantity > 0) addToCart(product.id, quantity);
  };
// ... existing code ...
        {/* Quantity selector */}
        <div className="flex items-center gap-2 mb-2">
          <Button size="icon" variant="outline" onClick={handleDecrement} aria-label="Decrease quantity" disabled={quantity === 0}>-</Button>
          <span className="w-8 text-center select-none">{quantity}</span>
          <Button size="icon" variant="outline" onClick={handleIncrement} aria-label="Increase quantity">+</Button>
        </div>
        <Button size="lg" className="w-full md:w-fit" onClick={handleAddToCart} disabled={quantity === 0}>
          Add to Cart
        </Button>
// ... existing code ...
```

```typescriptreact
// ... existing code ...
  const handleAddToCart = () => {
    if (quantity > 0 && product) addToCart(product.id, quantity);
  };
// ... existing code ...
```

You now have a quantity selector (`-`, count, `+`) and an "Add to Cart" button on the Product Details page:

- The count cannot go below 0 (no negative values).
- The "Add to Cart" button is disabled when the count is 0.
- Clicking "+" increases the count, "-" decreases it (but not below 0).
- Clicking "Add to Cart" adds the selected quantity to the cart.

This matches your requirements for quantity control and cart integration.

Would you like to add a toast/snackbar for cart actions, or proceed to the next task?

---

**User**

disable -ve if count is 1 and cannot go below 1
if item added to cart reset count to 1
limit max to 10


---

**Cursor**

```typescriptreact
// ... existing code ...
  const [quantity, setQuantity] = useState(1);

  const handleDecrement = () => setQuantity((q) => Math.max(1, q - 1));
  const handleIncrement = () => setQuantity((q) => Math.min(10, q + 1));
  const handleAddToCart = () => {
    if (quantity >= 1 && product) {
      addToCart(product.id, quantity);
      setQuantity(1);
    }
  };
// ... existing code ...
        <div className="flex items-center gap-2 mb-2">
          <Button size="icon" variant="outline" onClick={handleDecrement} aria-label="Decrease quantity" disabled={quantity === 1}>-</Button>
          <span className="w-8 text-center select-none">{quantity}</span>
          <Button size="icon" variant="outline" onClick={handleIncrement} aria-label="Increase quantity" disabled={quantity === 10}>+</Button>
        </div>
        <Button size="lg" className="w-full md:w-fit" onClick={handleAddToCart} disabled={quantity < 1}>
          Add to Cart
        </Button>
// ... existing code ...
```

The quantity selector now enforces:

- Minimum quantity is 1 (cannot go below 1; "-" is disabled at 1).
- Maximum quantity is 10 (cannot go above 10; "+" is disabled at 10).
- After adding to cart, the quantity resets to 1.

The "Add to Cart" button is always enabled when quantity is 1 or more (never less than 1).

Would you like to add a toast/snackbar for cart actions, or proceed to the next feature?

---

**User**

yes now add toast when max reached, when items added to cart


---

**Cursor**

```typescriptreact
// ... existing code ...
import { toast } from 'sonner';
// ... existing code ...
  const handleIncrement = () => {
    setQuantity((q) => {
      if (q >= 10) {
        toast('Maximum quantity is 10');
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
// ... existing code ...
```

Toasts are now shown for both:

- **When max quantity is reached:**  
  A toast appears saying "Maximum quantity is 10" if the user tries to increment past 10.

- **When items are added to cart:**  
  A success toast appears, e.g., "3 items added to cart!" or "1 item added to cart!" after clicking "Add to Cart".

This provides clear feedback for both actions. Let me know if you want to further customize the messages or proceed to the next task!

---

**User**

center the product page vertically

---

**Cursor**

```typescriptreact
// ... existing code ...
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-4xl w-full py-10 px-4 flex flex-col md:flex-row gap-8">
        {/* Left: Large Image */}
        <div className="flex-shrink-0 w-full md:w-1/2 flex items-center justify-center">
          <Image
            src={product.image}
            alt={product.title}
            width={400}
            height={400}
            className="rounded-lg object-contain bg-white"
            priority
          />
        </div>
        {/* Right: Details */}
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary" className="capitalize">
              {product.category}
            </Badge>
            <span className="text-xl font-semibold text-primary">${product.price}</span>
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
            <Button size="icon" variant="outline" onClick={handleDecrement} aria-label="Decrease quantity" disabled={quantity === 1}>-</Button>
            <span className="w-8 text-center select-none">{quantity}</span>
            <Button size="icon" variant="outline" onClick={handleIncrement} aria-label="Increase quantity" disabled={quantity === 10}>+</Button>
          </div>
          <Button size="lg" className="w-full md:w-fit" onClick={handleAddToCart} disabled={quantity < 1}>
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
// ... existing code ...
```

The Product Details page is now vertically centered in the viewport on all screen sizes, providing a more balanced and visually appealing layout.

If you need further layout tweaks or want to move to the next feature, let me know!

---

**User**

style image with border, horver etc

---

**Cursor**

```typescriptreact
// ... existing code ...
        <div className="flex-shrink-0 w-full md:w-1/2 flex items-center justify-center">
          <div className="transition-transform duration-200 ease-in-out border border-gray-200 rounded-lg shadow-sm bg-white hover:scale-105 hover:ring-2 hover:ring-primary/40">
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
// ... existing code ...
```

The product image on the details page is now styled with:

- A border and subtle shadow
- Rounded corners
- A hover effect: the image container slightly scales up and shows a primary-colored ring

This provides a more interactive and visually appealing presentation for the product image. Let me know if you want further style adjustments or to proceed with the next feature!

---

**User**

made some style changes... now the page is totally in white bg
try to add some bg for variation

---

**Cursor**

```typescriptreact
// ... existing code ...
  return (
    <div className="h-full flex items-center justify-center bg-gray-50">
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
// ... existing code ...
```

The product details page now features a subtle light gray background (`bg-gray-50`) behind the main content, while the card and image areas remain white for contrast. This adds visual variation and helps the product card stand out.

Let me know if you want to further tweak the background or move on to the next feature!

---

**User**

use the same on list page

---

**Cursor**

```typescriptreact
// ... existing code ...
  return (
    <Container className="h-full flex flex-col py-4 px-2 sm:px-4 lg:px-6 bg-gray-50">
// ... existing code ...
```

The product listing page now uses the same subtle light gray background (`bg-gray-50`) as the product details page, providing a consistent and visually appealing look across both views.

Let me know if you want any further style adjustments or to proceed with the next feature!

---

**User**

on complete main not just container

---

**Cursor**

```typescriptreact
// ... existing code ...
            <main className="flex-1 pt-16 bg-gray-50">{children}</main>
// ... existing code ...
```

The light gray background (`bg-gray-50`) is now applied to the entire `<main>` area, ensuring the background covers the full main content region on all pages, not just inside the container.

This will provide a consistent and visually pleasing background for both the product list and product details pages.

Let me know if you need further adjustments or want to proceed to the next task!

---

**User**

make it slightly darker

---

**Cursor**

```typescriptreact
// ... existing code ...
            <main className="flex-1 pt-16 bg-gray-100">{children}</main>
// ... existing code ...
```

The main background is now slightly darker (`bg-gray-100`), providing more contrast and visual depth across your pages.

Let me know if you want to adjust the shade further or need any other design tweaks!

---

**User**

let's decide on color later
category and price should not be on same line

---

**Cursor**

```typescriptreact
// ... existing code ...
        {/* Category and Price (separate lines) */}
        <div className="mb-2">
          <Badge variant="secondary" className="capitalize mb-2 inline-block">
            {product.category}
          </Badge>
          <div className="text-xl font-semibold text-primary mt-1">${product.price}</div>
        </div>
// ... existing code ...
```

Category and price are now displayed on separate lines on the product details page, improving visual hierarchy and clarity:

- The category badge appears above the price, each with appropriate spacing.

Let me know if you want further layout tweaks or to proceed with the next task!

---

**User**

add skeleton loader for details page

---

**Cursor**

```typescriptreact
// ... existing code ...
import { Skeleton } from '../../../components/ui/skeleton';
// ... existing code ...
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
// ... existing code ...
```

A skeleton loader is now shown on the product details page while data is loading. It closely matches the final layout, including placeholders for the image, title, category, price, rating, description, quantity selector, and the Add to Cart button.

Let me know if you want to adjust the skeleton layout or proceed to the next feature!

