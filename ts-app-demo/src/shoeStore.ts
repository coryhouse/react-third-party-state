import { CartItem, User } from "./types/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

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

export const useShoeStore = create<State & Action>()(
  persist<State & Action>(
    (set) => ({
      user: null,
      cart: [],

      logIn: (user) => set({ user }),

      logOut: () => set({ user: null }),

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
                  item.sku === sku
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
                )
              : [...cart, { id, sku, quantity: 1 }],
          };
        });
      },
    }),
    { name: "zustand-store" }
  )
);
