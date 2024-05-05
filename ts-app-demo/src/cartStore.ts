import { create } from "zustand";
import { CartItem } from "./types/types";

type Store = {
  cart: CartItem[];
  emptyCart: () => void;
  updateCartQuantity: (sku: string, quantity: number) => void;
  addToCart: (id: number, sku: string) => void;
};

export const useCartStore = create<Store>((set) => ({
  cart: [],
  emptyCart: () => set({ cart: [] }),
  updateCartQuantity: (sku: string, quantity: number) => {
    set((state) => ({
      cart: state.cart.map((i) => (i.sku === sku ? { ...i, quantity } : i)),
    }));
  },
  addToCart: (id: number, sku: string) => {
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
