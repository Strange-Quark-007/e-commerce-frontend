# Create category badge component
_Exported on 7/19/2025 at 20:55:13 GMT+5:30 from Cursor (1.2.4)_

---

**User**

Create a small component for category badge
with samle styling as used on list and details page
use the same on cart page

additionally handle onClick that takes users to list page with that category selected

---

**Cursor**

```typescriptreact
import { useRouter } from 'next/navigation';
import { Badge } from './ui/badge';
import { toTitleCase } from '../lib/utils';
import React from 'react';

interface CategoryBadgeProps {
  category: string;
  className?: string;
}

export default function CategoryBadge({ category, className }: CategoryBadgeProps) {
  const router = useRouter();
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(`/products?category=${encodeURIComponent(category)}`);
  };
  return (
    <Badge
      variant="secondary"
      className={`capitalize mb-2 inline-block cursor-pointer hover:opacity-80 transition ${className || ''}`}
      tabIndex={0}
      role="button"
      aria-label={`View products in ${toTitleCase(category)}`}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') handleClick(e as any);
      }}
    >
      {toTitleCase(category)}
    </Badge>
  );
}

```

```typescriptreact
// ... existing code ...
import { toTitleCase } from '../lib/utils';
import Container from '../components/Container';
import { MAX_CART_ITEMS } from '../lib/constants';
import CategoryBadge from '../components/CategoryBadge';
// ... existing code ...
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
          <CategoryBadge category={product.category} className="mb-2" />
        </div>
// ... existing code ...
```

- I created a new `CategoryBadge` component in `src/components/CategoryBadge.tsx` that uses the same styling as the badge on the product list and details pages, and added an onClick handler to navigate to the list page with the category selected.
- I updated the cart page (`src/views/Cart.tsx`) to use this new `CategoryBadge` in place of the plain category text, so the badge is now clickable and styled consistently.

You can now use the `CategoryBadge` component anywhere you want a clickable, styled category badge that navigates to the filtered product list. Let me know if you want it used elsewhere or need further tweaks!

---

**User**

should redirect to homepage that's the list page
http://localhost:3000/?category=electronics

---

**Cursor**

```typescriptreact
// ... existing code ...
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(`/?category=${encodeURIComponent(category)}`);
  };
// ... existing code ...
```

The `CategoryBadge` component has been updated so that clicking the badge now redirects to the homepage (`/`) with the selected category as a query parameter (e.g., `/?category=electronics`), matching your requirement.

Let me know if you need any further adjustments!

---

**User**

use the same badge on product details page

---

**Cursor**

```typescriptreact
// ... existing code ...
import { Badge } from '../components/ui/badge';
// ... existing code ...
import CategoryBadge from '../components/CategoryBadge';
// ... existing code ...
          <div className="mb-2">
-            <Badge variant="secondary" className="capitalize mb-2 inline-block">
-              {product.category}
-            </Badge>
+            <CategoryBadge category={product.category} className="mb-2" />
            <div className="text-xl font-semibold text-primary mt-1">${product.price}</div>
          </div>
// ... existing code ...
```

The product details page now uses the new `CategoryBadge` component for the category display, ensuring consistent styling and navigation across the cart, list, and details pages.

If you need this badge used anywhere else or want further adjustments, just let me know!

