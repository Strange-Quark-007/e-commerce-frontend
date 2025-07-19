# Project Structure

This document describes the organization of the E-Commerce Frontend project, starting from the root directory.

---

## Root Directory

- [problem-statement.md](problem-statement.md) — Project problem statement
- [PRD.md](PRD.md) — Product requirements document
- [TECH-SPEC.md](TECH-SPEC.md) — Technical specification
- [UX-GUIDELINES.md](UX-GUIDELINES.md) — UX and UI guidelines
- [TASKS.md](TASKS.md) — Implementation checklist and progress tracking
- [Project-structure.md](Project-structure.md) — Project structure
- [README.md](README.md) — Project overview and setup instructions

- **/src/** — Main source code
- **/public/** — Static assets (SVGs, images, etc.)
- **/chats/** — Cursor AI chat transcripts

---

## /src Directory Structure

- **/src** — Main source code directory
  - **/app/** — Next.js App Router entrypoints, layouts, and SSR wrappers
    - **layout.tsx** — Root layout for the app
    - **globals.css** — Global styles (TailwindCSS)
    - **Providers.tsx** — React Query provider setup
    - **/cart/** — Cart page route
      - `page.tsx` — Cart page (SSR wrapper)
    - **/products/** — Product-related routes
      - **/[id]/** — Dynamic product details route
        - `page.tsx` — Product details page (SSR wrapper)
    - `page.tsx` — Home page (SSR wrapper)
  - **/views/** — Main client pages (ProductList, ProductDetails, Cart)
    - `ProductList.tsx` — Product listing page (client logic/UI)
    - `ProductDetails.tsx` — Product details page (client logic/UI)
    - `Cart.tsx` — Shopping cart page (client logic/UI)
  - **/components/** — Reusable UI and layout components
    - `Navbar.tsx` — Top navigation bar
    - `Footer.tsx` — Footer component
    - `Layout.tsx` — Main layout wrapper
    - `Container.tsx` — Responsive container
    - `ProductCard.tsx` — Product card for listings
    - `EmptyState.tsx` — Empty state UI
    - `ErrorMessage.tsx` — Error display UI
    - `Spinner.tsx` — Loading spinner
    - **/ui/** — Shared UI primitives from ShadCN (button, card, dialog, badge, skeleton, navigation-menu, sonner)
  - **/hooks/** — Custom React hooks
    - `useApi.ts` — API data fetching (React Query abstraction)
    - `useProducts.ts` — Fetch all products/categories
    - `useProductById.ts` — Fetch product by ID
    - `useCart.ts` — Cart state and actions
  - **/lib/** — Utility functions and API endpoint configs
    - `constants.ts` — App-wide constants (e.g., max cart items)
    - `endpoints.ts` — API endpoint definitions
    - `utils.ts` — Utility helpers (e.g., formatting)
  - **/store/** — Zustand state management
    - `cartStore.ts` — Cart state and actions (Zustand store)
  - **/types/** — TypeScript type definitions
    - `index.ts` — Product and CartItem types

---

For more details on each file/component, see the code comments and documentation within the source files.
