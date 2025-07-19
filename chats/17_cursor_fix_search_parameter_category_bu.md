# Fix search parameter category bug
_Exported on 7/19/2025 at 20:33:54 GMT+5:30 from Cursor (1.2.4)_

---

**User**

fix bug when if someone manually passes random category in search param, it will show no products found but then clicking all categories on filter fails

---

**Cursor**

The root cause of your bug is that if someone manually passes an invalid category in the search param (e.g., `/products?category=random`), the UI will show "No products found." However, the `<select>` for categories will have a value (`categoryParam`) that is not present in the list of valid categories (`categories`). This causes the select to be in an invalid state, and when you try to select "All Categories" or another valid category, the filter can break or not update as expected.

**How to fix:**
- If the `categoryParam` is not in the list of valid categories (from `categories`), treat it as if "All Categories" is selected (i.e., ignore the invalid param).
- This can be done by checking if `categoryParam` is in `categories` and, if not, resetting it.

**Best place to fix:**  
In `ProductListPage`, after fetching `categories`, check if `categoryParam` is valid. If not, update the URL to remove the invalid category.

I will implement this fix in `src/views/ProductList.tsx`.

```typescriptreact
// ... existing code ...
  const { data: categories, isLoading: isCategoriesLoading } = useProductCategories();
// ... existing code ...
  // If the categoryParam is invalid, reset it to All Categories
  useEffect(() => {
    if (
      categories &&
      categoryParam &&
      !categories.includes(categoryParam)
    ) {
      const params = new URLSearchParams(window.location.search);
      params.delete('category');
      router.replace(`${window.location.pathname}?${params.toString()}`, { scroll: false });
    }
    // Only run when categories or categoryParam changes
  }, [categories, categoryParam, router]);
// ... existing code ...
```

The bug is now fixed: if someone manually passes a random or invalid category in the search param, the app will automatically reset the filter to "All Categories" as soon as the valid categories are loaded. This prevents the select filter from breaking and ensures the user can always select a valid category.

You can test this by visiting `/products?category=random` and confirming that the filter resets and works as expected. Let me know if you need further adjustments!

