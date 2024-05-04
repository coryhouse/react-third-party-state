import { create } from "zustand";
import { CartItem } from "./types/types";

type Store = {
  items: CartItem[];
  empty: () => void;
  updateQuantity: (sku: string, quantity: number) => void;
  add: (id: number, sku: string) => void;
};

export const useStore = create<Store>((set) => ({
  items: [],
  empty: () => set({ items: [] }),
  updateQuantity: (sku: string, quantity: number) => {
    set((state) => ({
      items: state.items.map((i) => (i.sku === sku ? { ...i, quantity } : i)),
    }));
  },
  add: (id: number, sku: string) => {
    set((state) => {
      const itemInCart = state.items.find((i) => i.sku === sku);
      if (itemInCart) {
        return {
          items: state.items.map((i) =>
            i.sku === sku ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      } else {
        return {
          items: [...state.items, { id, sku, quantity: 1 }],
        };
      }
    });
  },
}));
