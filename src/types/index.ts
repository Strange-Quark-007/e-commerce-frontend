// Product type for FakeStoreAPI
export interface Product {
  id: number;
  title: string; // FakeStoreAPI uses 'title' instead of 'name'
  price: number;
  description: string;
  image: string;
  category: string;
}

// CartItem type for local cart state
export interface CartItem {
  productId: number;
  quantity: number;
}
