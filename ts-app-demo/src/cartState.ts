import { proxy } from "valtio";
import { CartItem } from "./types/types";

type CartState = {
  cart: CartItem[];
};

export const cartState = proxy<CartState>({
  cart: [],
});

export const addToCart = (id: number, sku: string) => {
  cartState.cart.push({ id, sku, quantity: 1 });
};

export const updateQuantity = (sku: string, quantity: number) => {
  const item = cartState.cart.find((i) => i.sku === sku);
  if (!item) throw new Error("Sku not found in cart");
  item.quantity = quantity; // Can simply mutate. The proxy will detect the change and trigger a render.
};

export const emptyCart = () => {
  cartState.cart = [];
};
