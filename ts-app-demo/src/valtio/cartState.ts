import { proxy, subscribe } from "valtio";
import { CartItem } from "../types/types";

type CartState = {
  cart: CartItem[];
};

const localStorageKey = "valtio-cart";

const initialState: CartState = localStorage.getItem(localStorageKey)
  ? JSON.parse(localStorage.getItem(localStorageKey) ?? "")
  : { cart: [] };

export const cartState = proxy<CartState>(initialState);

// Save cart updates to localStorage
subscribe(cartState, () => {
  localStorage.setItem(localStorageKey, JSON.stringify(cartState));
});

function getItemIndexBySku(sku: string) {
  return cartState.cart.findIndex((i) => i.sku === sku);
}

// Utility functions below here. Note that all these calls are mutative which we can safely do because Valtio uses a proxy.
export function addToCart(id: number, sku: string) {
  const itemIndex = getItemIndexBySku(sku);
  if (itemIndex > -1) {
    cartState.cart[itemIndex]!.quantity += 1;
  } else {
    cartState.cart.push({ id, sku, quantity: 1 });
  }
}

export function updateQuantity(sku: string, quantity: number) {
  const itemIndex = getItemIndexBySku(sku);
  if (quantity === 0) {
    cartState.cart.splice(itemIndex, 1); // Remove item from cart by index
  } else {
    cartState.cart[itemIndex]!.quantity = quantity;
  }
}

export function emptyCart() {
  cartState.cart = [];
}
