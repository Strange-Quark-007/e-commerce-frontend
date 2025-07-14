# Technical Specification: E-Commerce Frontend

## Tech Stack

- **Framework:** React with Next.js (App Router)
- **Language:** TypeScript
- **UI Library:** [shadcn/ui](https://ui.shadcn.com/)
- **Styling:** TailwindCSS
- **State Management:** Zustand (single central store)
- **Data Fetching:** React Query

## Tooling

- **Linting:** ESLint (Next.js + TypeScript config)
- **Formatting:** Prettier

## Project Structure

Use Next.js standard layout with a `src/` directory. Recommended structure:

```
/src
  /app         # Next.js App Router pages and layouts
  /components  # Reusable UI components
  /lib         # API clients, helpers, and external integrations
  /store       # Zustand store(s) and related logic
  /types       # TypeScript type definitions
  /utils       # Utility functions
```

## State Management

- Use a single Zustand store to manage global state:
  - Cart state (items, quantities)
  - Optionally, UI state (e.g., loading, error flags)
- Store structure should be modular and scalable for future features.
- Cart operations (add, remove, update quantity) are handled via store actions.

## Data Fetching

- Use React Query for all API calls to FakeStoreAPI:
  - Product listing (`GET /products`)
  - Product details (`GET /products/{id}`)
- Leverage React Query's caching and revalidation for optimal UX.
- Cart state is managed locally (Zustand), but can be synced with FakeStoreAPI cart endpoints if needed.

## API Integration

- **Base URL:** [https://fakestoreapi.com](https://fakestoreapi.com)
- **Endpoints:**
  - `GET /products` — fetch all products
  - `GET /products/{id}` — fetch product details
  - Cart operations: use local state or FakeStoreAPI cart endpoints as appropriate
- API client logic should be placed in `src/lib/` for reusability.
- TypeScript types for API responses should be defined in `src/types/`.

---

**Developer Notes:**

- Follow best practices for modular, maintainable code.
- Use shadcn/ui and TailwindCSS for consistent, accessible UI.
- Ensure responsive design and smooth navigation between pages.
- Keep codebase clean with ESLint and Prettier.
- Document key components and store logic for team onboarding.
