import { proxy, subscribe } from "valtio";
import { CartItem } from "./types/types";

type CartState = {
  cart: CartItem[];
};

const initialState: CartState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart") ?? "")
  : { cart: [] };

export const cartState = proxy<CartState>(initialState);

// Save cart updates to localStorage
subscribe(cartState, () => {
  localStorage.setItem("cart", JSON.stringify(cartState));
});

// Utility functions below here. Note that all these calls are mutative which we can safely do because Valtio uses a proxy.
export function addToCart(id: number, sku: string) {
  cartState.cart.push({ id, sku, quantity: 1 });
}

export function updateQuantity(sku: string, quantity: number) {
  const itemIndex = cartState.cart.findIndex((i) => i.sku === sku);
  const item = cartState.cart[itemIndex];
  if (!item) throw new Error("Sku not found in cart");
  if (quantity === 0) {
    cartState.cart.splice(itemIndex, 1); // Remove item from cart by index
  } else {
    item.quantity = quantity;
  }
}

export function emptyCart() {
  cartState.cart = [];
}
