import { create } from "zustand";
import { CartItem, User } from "./types/types";
import { persist } from "zustand/middleware";

type Store = {
  user: User | null;
  logIn: (user: User) => void;
  logOut: () => void;
  cart: CartItem[];
  emptyCart: () => void;
  updateCartQuantity: (sku: string, quantity: number) => void;
  addToCart: (id: number, sku: string) => void;
};

// Show without persist first, then add persist and 2nd argument to store in localStorage.
export const useStore = create(
  persist<Store>(
    (set) => ({
      user: null,
      logIn: (user) => set({ user }),
      logOut: () => set({ user: null }),
      cart: [],
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
        set((state) => {
          const itemInCart = state.cart.find((i) => i.sku === sku);
          return {
            cart: itemInCart
              ? state.cart.map((i) =>
                  i.sku === sku ? { ...i, quantity: i.quantity + 1 } : i
                )
              : [...state.cart, { id, sku, quantity: 1 }],
          };
        });
      },
    }),
    { name: "zustand-store" }
  )
);
