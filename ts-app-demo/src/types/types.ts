export type Product = {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
  category: string;
  skus: Sku[];
};

type Sku = {
  sku: string;
  size: number;
};

export type ShippingAddress = {
  city: string;
  country: string;
};

export interface CartItem {
  id: number;
  quantity: number;
  sku: string;
}

export type CartAction =
  | { type: "add"; id: number; sku: string }
  | { type: "empty" }
  | { type: "updateQuantity"; sku: string; quantity: number };

export type User = {
  id: number;
  email: string;
};
