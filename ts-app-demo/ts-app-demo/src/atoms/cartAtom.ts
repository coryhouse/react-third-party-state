import { atom } from "jotai";

export interface Item {
  id: number;
  quantity: number;
  sku: string;
}

let initialCart: Item[] = [];
try {
  const cart = localStorage.getItem("cart");
  const parsedCart: any[] = cart ? JSON.parse(cart) : [];
  initialCart = parsedCart.map((item) => ({ ...item, id: parseInt(item.id) }));
} catch {
  console.error("The cart could not be parsed into JSON.");
  initialCart = [];
}

export const cartAtom = atom(initialCart);
