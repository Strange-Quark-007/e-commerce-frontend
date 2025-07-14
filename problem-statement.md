# 🛒 E-Commerce Frontend Application

## 1. Purpose

This PRD defines the requirements for a simple e-commerce frontend app.

The app must allow users to:

- Browse products
- View product details
- Manage a shopping cart (add/update/delete items)

> 🔒 **Note:** Authentication and authorization are **out of scope**. The app should work in an anonymous user flow.

---

## 2. Scope

The initial release includes the following core modules:

- **Product Listing Page**
- **Product Details Page**
- **Shopping Cart Page**

---

## 3. Functional Requirements

### 3.1 Product Listing Page

**Description:**  
Displays a list of all available products.

**Features:**

- Search bar to filter products
- Filter options (by category)
- Product cards displaying:
  - Product image
  - Product name
  - Product price
- Pagination

### 3.2 Product Details Page

**Description:**  
Provides detailed information for a single product.

**Features:**

- Product image
- Product name and price
- Product description
- "Add to Cart" button

---

### 3.3 Shopping Cart Page

**Description:**  
Lists all products the user intends to purchase.

**Features:**

- List of items in the cart, each showing:
  - Thumbnail image
  - Product name
  - Product price
  - Remove button
- Total amount calculation

---

## 4. Wireframes

- Refer to the provided wireframes for layout guidance.
- Feel free to deviate creatively — these are just for reference.

---

## 5. References

- [FakeStoreAPI Documentation](https://fakestoreapi.com/) — Use this API for:
  - Product listing
  - Product details
  - Cart management
