# TASKS.md

A comprehensive, implementation-ready checklist for the e-commerce frontend project. Tasks are grouped by logical sections and tagged for clarity.

---

## Project Setup & Tooling

- [x] Initialize Next.js project with TypeScript and `/src` directory structure [Setup]
- [x] Install and configure TailwindCSS [Setup]
- [x] Install and configure shadcn/ui [Setup]
- [x] Set up ESLint with Next.js + TypeScript config [Setup]
- [x] Set up Prettier for code formatting [Setup]
- [x] Install and configure Zustand for state management [Setup]
- [x] Install and configure React Query for data fetching [Setup]
- [x] Set up project README with setup instructions [Setup]

---

## State Management and Data Fetching Setup

- [x] Create Zustand store for cart state (items, quantities, actions) [State]
- [x] Define TypeScript types for Product and CartItem in `src/types/` [State]
- [x] Set up React Query provider in app root [API] [Setup]
- [x] Set up Zustand provider in app root [State] [Setup]
- [x] Implement API client in `src/lib/` for FakeStoreAPI endpoints [API]

---

## Reusable Hooks

- [x] Create hook for fetching all products with React Query [API] [Hook]
- [x] Create hook for fetching product details by ID [API] [Hook]
- [x] Create hook for cart state and actions (add, remove, update) [State] [Hook]

---

## Global Components

- [x] Implement responsive Navbar with navigation links and cart icon [UI]
- [x] Implement main Layout component with header/footer [UI]
- [x] Implement global loading and error UI components [UI]
- [x] Use sonner (shadcn/ui) for toast/snackbar notifications for cart actions and errors [UI]
- [x] For all empty states, show loading spinner while fetching and relevant message if no data [UI]

---

## Product Listing Page

- [x] Create Product Listing page route and layout [UI]
- [x] Implement product grid/list with product cards [UI]
- [ ] Add search bar to filter products by name/keyword [UI]
- [x] Add category filter controls [UI]
- [ ] Add pagination controls for product results [UI]
- [x] Integrate product data fetching with React Query [API]
- [ ] Connect search, filter, and pagination to product data [State] [UI]
- [x] Make product cards clickable to navigate to details page [UI]

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
