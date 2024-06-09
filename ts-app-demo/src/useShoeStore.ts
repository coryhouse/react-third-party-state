import { CartItem, User } from "./types/types";
import { create } from "zustand";

type State = {
  user: User | null;
  cart: CartItem[];
};

type Action = {
  logOut: () => void;
  logIn: (user: User) => void;
  emptyCart: () => void;
  updateCartQuantity: (sku: string, quantity: number) => void;
  addToCart: (id: number, sku: string) => void;
};

export const useShoeStore = create<State & Action>((set) => ({
  user: null,
  cart: [],

  logOut: () => set({ user: null }),

  logIn: (user) => set({ user }),

  emptyCart: () => set({ cart: [] }),

  updateCartQuantity: (sku: string, quantity: number) => {
    set(({ cart }) => ({
      cart:
        quantity === 0
          ? cart.filter((i) => i.sku !== sku)
          : cart.map((i) => (i.sku === sku ? { ...i, quantity } : i)),
    }));
  },

  addToCart: (id: number, sku: string) => {
    set(({ cart }) => {
      const itemInCart = cart.find((i) => i.sku === sku);
      return {
        cart: itemInCart
          ? cart.map((item) =>
              item.sku === sku ? { ...item, quantity: item.quantity + 1 } : item
            )
          : [...cart, { id, sku, quantity: 1 }],
      };
    });
  },
}));
