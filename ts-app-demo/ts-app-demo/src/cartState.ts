import { proxy } from "valtio";
import { CartItem } from "./types/types";

type CartState = {
  items: CartItem[];
};

export const cartState = proxy<CartState>({
  items: [],
});

export const add = (id: number, sku: string) => {
  cartState.items.push({ id, sku, quantity: 1 });
};

export const updateQuantity = (sku: string, quantity: number) => {
  const item = cartState.items.find((i) => i.sku === sku);
  if (!item) throw new Error("Item not found in cart");
  item.quantity = quantity;
};

export const empty = () => {
  cartState.items = [];
};
