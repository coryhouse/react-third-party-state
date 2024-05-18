import { atomWithStorage } from "jotai/utils";

export interface CartItem {
  id: number;
  quantity: number;
  sku: string;
}

let initialCart: CartItem[] = [];

// Can use this first, then show how to use atomWithStorage
// try {
//   const cart = localStorage.getItem("cart");
//   const parsedCart: any[] = cart ? JSON.parse(cart) : [];
//   initialCart = parsedCart.map((item) => ({ ...item, id: parseInt(item.id) }));
// } catch {
//   console.error("The cart could not be parsed into JSON.");
//   initialCart = [];
// }

// export const cartAtom = atom(initialCart);

export const cartAtom = atomWithStorage("cart", initialCart);