import { create } from "zustand";
import { CartItem } from "./types/types";

type Store = {
  cart: CartItem[];
  empty: () => void;
  updateQuantity: (sku: string, quantity: number) => void;
  add: (id: number, sku: string) => void;
};

export const useCartStore = create<Store>((set) => ({
  cart: [],
  empty: () => set({ cart: [] }),
  updateQuantity: (sku: string, quantity: number) => {
    set((state) => ({
      cart: state.cart.map((i) => (i.sku === sku ? { ...i, quantity } : i)),
    }));
  },
  add: (id: number, sku: string) => {
    set((state) => {
      const itemInCart = state.cart.find((i) => i.sku === sku);
      if (itemInCart) {
        return {
          cart: state.cart.map((i) =>
            i.sku === sku ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      } else {
        return {
          cart: [...state.cart, { id, sku, quantity: 1 }],
        };
      }
    });
  },
}));
