# Create UX guidelines document
_Exported on 7/14/2025 at 18:47:48 GMT+5:30 from Cursor (1.2.4)_

---

**User**

Act as a Senior UX Designer.

Using PRD.md, TECH-SPEC.md, and TASKS.md, create a new file called UX-GUIDELINES.md.

This document should define the expected user experience and interaction patterns across the application.

Include (but don’t limit to) the following sections:

Design Principles: Clarity, responsiveness, accessibility, consistency
Global Navigation: Navbar behavior, page transitions, persistent cart icon
Product Listing Page: Grid layout, filters, search, pagination, loading states
Product Details Page: Content layout, add-to-cart flow, loading behavior
Shopping Cart Page: Quantity controls, remove flow, empty cart handling
Empty States: For no products, no search results, or empty cart
Loading & Error Feedback: Spinners, skeletons, fallback UI, retry flows

Additional instructions:

Keep sections concise, focused, and implementation-friendly
Refer to relevant sections in TASKS.md
Add or suggest tasks in TASKS.md if any UX elements are missing

---

**Cursor**

```markdown
# UX-GUIDELINES.md

A reference for expected user experience and interaction patterns in the e-commerce frontend. Aligns with [PRD.md](./PRD.md), [TECH-SPEC.md](./TECH-SPEC.md), and [TASKS.md](./TASKS.md).

---

## 1. Design Principles

- **Clarity:** Prioritize clear information hierarchy, legible typography, and intuitive controls. Avoid clutter; every element must serve a purpose.
- **Responsiveness:** All pages and components must adapt smoothly to mobile, tablet, and desktop. Touch targets must be accessible on all devices.
- **Accessibility:** Use semantic HTML, ARIA attributes, and ensure keyboard navigation. Maintain sufficient color contrast and provide alt text for images.
- **Consistency:** UI components (buttons, cards, forms) must follow a unified style (shadcn/ui + TailwindCSS). Navigation, feedback, and actions should behave predictably across the app.

---

## 2. Global Navigation

- **Navbar:**
  - Fixed at the top, visible on all pages.
  - Includes links to Product Listing, Shopping Cart, and (optionally) brand/logo.
  - Cart icon displays current item count (updates in real time).
  - On mobile, use a hamburger menu or collapsible navigation.
- **Page Transitions:**
  - Use fast, non-blocking transitions. Show loading indicators for data fetches.
- **Persistent Cart Icon:**
  - Always accessible; clicking navigates to the Shopping Cart page.

**Related Tasks:**
- Implement responsive Navbar with navigation links and cart icon [TASKS.md]

---

## 3. Product Listing Page

- **Grid Layout:**
  - Use a responsive grid (2–4 columns depending on screen size).
  - Each product card shows image, name, price, and is clickable.
- **Filters & Search:**
  - Search bar at top; filters (e.g., category) are prominent and easy to reset.
  - Filter/search updates product list in real time (no full page reload).
- **Pagination:**
  - Controls at bottom or top-right; clearly indicate current page.
- **Loading States:**
  - Use skeleton loaders for product cards while fetching.
  - Show spinner for full-page loads.
- **Error States:**
  - Display a friendly error message with a retry button if products fail to load.

**Related Tasks:**
- Product grid/list, search bar, category filters, pagination, loading/error UI [TASKS.md]

---

## 4. Product Details Page

- **Content Layout:**
  - Large product image on left (desktop) or top (mobile).
  - Name, price, and description clearly visible.
  - Prominent "Add to Cart" button.
- **Add-to-Cart Flow:**
  - On click, provide immediate feedback (e.g., button animates, toast notification, or cart icon updates).
  - Prevent duplicate adds or allow quantity increment (per requirements).
- **Loading Behavior:**
  - Use skeletons for image and text while loading.
  - Show error fallback with retry if fetch fails.

**Related Tasks:**
- Product details layout, add-to-cart button, loading/error UI [TASKS.md]

---

## 5. Shopping Cart Page

- **Item List:**
  - Each item: thumbnail, name, price, remove button.
  - (Optional) Quantity controls for future extensibility.
- **Remove Flow:**
  - Remove button provides instant feedback (item disappears, total updates).
  - Confirm removal with undo option (toast/snackbar) for better UX.
- **Total Amount:**
  - Clearly display total at bottom or top of cart list.
- **Empty Cart Handling:**
  - Show a friendly empty state (icon, message, link to browse products).

**Related Tasks:**
- Cart item list, remove functionality, total display, empty cart state [TASKS.md]

---

## 6. Empty States

- **No Products:**
  - Show a message and illustration if no products are available.
- **No Search Results:**
  - Display a clear message (e.g., "No products found for your search.") and a reset search button.
- **Empty Cart:**
  - Friendly message, icon, and a call-to-action to return to product listing.

**Related Tasks:**
- Ensure empty states for product list, search, and cart [TASKS.md]
- *Suggest adding explicit tasks for empty state illustrations/messages if not present.*

---

## 7. Loading & Error Feedback

- **Spinners & Skeletons:**
  - Use skeleton loaders for content blocks (cards, details) and spinners for full-page or blocking actions.
- **Fallback UI:**
  - Show clear, actionable error messages ("Something went wrong. [Retry]").
- **Retry Flows:**
  - Always provide a retry button for failed fetches.
- **Global Feedback:**
  - Use toasts/snackbars for add-to-cart, remove-from-cart, and error notifications.

**Related Tasks:**
- Global loading and error UI components [TASKS.md]
- *Suggest adding tasks for toast/snackbar notifications if not present.*

---

## 8. Additional UX Recommendations

- **Focus Management:**
  - Move focus to main content on navigation for accessibility.
- **Touch Feedback:**
  - Buttons and interactive elements should have visible pressed/active states.
- **Visual Hierarchy:**
  - Use consistent spacing, font sizes, and color for clarity.

---

## 9. Suggested TASKS.md Additions

- [ ] Add explicit tasks for empty state illustrations/messages for product list, search, and cart [UI]
- [ ] Add tasks for toast/snackbar notifications for cart actions and errors [UI]
- [ ] Add task for focus management on navigation for accessibility [UI]

```

The file `UX-GUIDELINES.md` has been created, providing clear, actionable UX standards for your e-commerce frontend. It covers design principles, navigation, page-specific patterns, empty/loading/error states, and includes references to relevant tasks in `TASKS.md`. 

**Next steps:**
- Review the "Suggested TASKS.md Additions" section at the end of the new file. It highlights missing UX elements (like empty state illustrations, toast/snackbar notifications, and focus management) that should be added to `TASKS.md` for full UX coverage.

Let me know if you want to update `TASKS.md` with these new tasks or need further UX documentation!

---

**User**

For toast notifications (success, error, etc) use sonner library from shadCN
For empty states, if data is being fetched show loading spinner and if no data then show relevant message
Update relevant files with this info

---

**Cursor**

```markdown
// ... existing code ...
## 7. Loading & Error Feedback

- **Spinners & Skeletons:**
  - Use skeleton loaders for content blocks (cards, details) and spinners for full-page or blocking actions.
- **Fallback UI:**
  - Show clear, actionable error messages ("Something went wrong. [Retry]").
- **Retry Flows:**
  - Always provide a retry button for failed fetches.
- **Global Feedback:**
  - Use [sonner](https://ui.shadcn.com/docs/components/sonner) (from shadcn/ui) for toast/snackbar notifications (success, error, etc) for cart actions and errors.

**Related Tasks:**
- Global loading and error UI components [TASKS.md]
- *Suggest adding tasks for toast/snackbar notifications if not present.*

---

## 6. Empty States

- **No Products:**
  - If data is being fetched, show a loading spinner. If no products are available after fetch, show a message and illustration.
- **No Search Results:**
  - If searching, show spinner while fetching. If no results, display a clear message (e.g., "No products found for your search.") and a reset search button.
- **Empty Cart:**
  - If cart data is loading, show spinner. If empty, show friendly message, icon, and a call-to-action to return to product listing.
// ... existing code ...
```

```markdown
// ... existing code ...
- [ ] Use sonner (shadcn/ui) for toast/snackbar notifications for cart actions and errors [UI]
- [ ] For all empty states, show loading spinner while fetching and relevant message if no data [UI]
// ... existing code ...
```

The following updates have been made:

- **UX-GUIDELINES.md** now explicitly states to use the sonner library (from shadcn/ui) for all toast/snackbar notifications (success, error, etc.), and clarifies that for empty states, a loading spinner should be shown while data is being fetched, and a relevant message should be displayed if no data is found.
- **TASKS.md** now includes explicit tasks to use sonner for toast notifications and to ensure all empty states show a loading spinner while fetching and a relevant message if no data.

Your documentation and implementation checklist now fully reflect these UX requirements. Let me know if you want to update any code or need further guidance on integrating sonner or handling empty/loading states!

