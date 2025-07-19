export interface Product {
  id: number;
  title: string; // FakeStoreAPI uses 'title' instead of 'name'
  price: number;
  description: string;
  image: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
}

// CartItem type for local cart state
export interface CartItem {
  productId: number;
  quantity: number;
}
