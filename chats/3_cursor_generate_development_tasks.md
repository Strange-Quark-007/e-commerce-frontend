# Generate development tasks for project roadmap
_Exported on 7/14/2025 at 18:11:32 GMT+5:30 from Cursor (1.2.4)_

---

**User**

Act as a senior frontend tech lead.

Using the existing `PRD.md` and `TECH-SPEC.md`, generate a new file named `TASKS.md`.

Break down the application into development tasks, grouped by sections:
below are few example sections
- Project Setup & Tooling
- State Management and Data Fetching Setup
- Reusable Hooks
- Global Components (e.g., Navbar, Layout)
- Product Listing Page
- Product Details Page
- Shopping Cart Page

Feel free to add additional sections as needed

For each task:
- Write it as a single, clear, descriptive checklist item (do not split into title + description)
- Use markdown checkboxes (`- [ ]`)
- Add relevant tags such as `[UI]`, `[API]`, `[State]`, `[Setup]`, `[Hook]`
- Keep each task atomic, implementation-ready, and developer-friendly

The output should be clean and usable directly as a project roadmap


---

**Cursor**

```markdown
# TASKS.md

A comprehensive, implementation-ready checklist for the e-commerce frontend project. Tasks are grouped by logical sections and tagged for clarity.

---

## Project Setup & Tooling

- [ ] Initialize Next.js project with TypeScript and `/src` directory structure [Setup]
- [ ] Install and configure TailwindCSS [Setup]
- [ ] Install and configure shadcn/ui [Setup]
- [ ] Set up ESLint with Next.js + TypeScript config [Setup]
- [ ] Set up Prettier for code formatting [Setup]
- [ ] Install and configure Zustand for state management [Setup]
- [ ] Install and configure React Query for data fetching [Setup]
- [ ] Set up project README with setup instructions [Setup]

---

## State Management and Data Fetching Setup

- [ ] Create Zustand store for cart state (items, quantities, actions) [State]
- [ ] Define TypeScript types for Product and CartItem in `src/types/` [State]
- [ ] Set up React Query provider in app root [API] [Setup]
- [ ] Set up Zustand provider in app root [State] [Setup]
- [ ] Implement API client in `src/lib/` for FakeStoreAPI endpoints [API]

---

## Reusable Hooks

- [ ] Create hook for fetching all products with React Query [API] [Hook]
- [ ] Create hook for fetching product details by ID [API] [Hook]
- [ ] Create hook for cart state and actions (add, remove, update) [State] [Hook]

---

## Global Components

- [ ] Implement responsive Navbar with navigation links and cart icon [UI]
- [ ] Implement main Layout component with header/footer [UI]
- [ ] Implement global loading and error UI components [UI]

---

## Product Listing Page

- [ ] Create Product Listing page route and layout [UI]
- [ ] Implement product grid/list with product cards [UI]
- [ ] Add search bar to filter products by name/keyword [UI]
- [ ] Add category filter controls [UI]
- [ ] Add pagination controls for product results [UI]
- [ ] Integrate product data fetching with React Query [API]
- [ ] Connect search, filter, and pagination to product data [State] [UI]
- [ ] Make product cards clickable to navigate to details page [UI]

---

## Product Details Page

- [ ] Create Product Details page route and layout [UI]
- [ ] Display large product image, name, price, and description [UI]
- [ ] Integrate product details data fetching by ID [API]
- [ ] Implement "Add to Cart" button with cart state integration [UI] [State]

---

## Shopping Cart Page

- [ ] Create Shopping Cart page route and layout [UI]
- [ ] List all items in the cart with thumbnail, name, price, and remove button [UI] [State]
- [ ] Display total amount for all items in the cart [UI] [State]
- [ ] Implement remove-from-cart functionality [UI] [State]
- [ ] Update total as items are added or removed [State]

---

## Responsive Design & Accessibility

- [ ] Ensure all pages and components are responsive for mobile and desktop [UI]
- [ ] Use accessible UI components and proper ARIA attributes [UI]

---

## Documentation & Code Quality

- [ ] Document key components, hooks, and store logic [Setup]
- [ ] Add code comments for complex logic [Setup]
- [ ] Ensure codebase passes ESLint and Prettier checks [Setup]

---

## (Optional) API Cart Sync

- [ ] Implement syncing local cart state with FakeStoreAPI cart endpoints [API] [State]

```

The `TASKS.md` file has been created, providing a clear, sectioned, and implementation-ready checklist for your e-commerce frontend project. Each task is atomic, tagged, and grouped by logical development areas, making it easy for your team to use as a project roadmap.

If you need further breakdowns, dependencies, or want to add more advanced/optional features, let me know!

