import { create } from "zustand";
import { CartItem, User } from "./types/types";
import { persist } from "zustand/middleware";

type State = {
  user: User | null;
  cart: CartItem[];
};

// Show without persist first, then add persist and 2nd argument to store in localStorage.
// Need extra parens per https://docs.pmnd.rs/zustand/guides/typescript
// This is deliberately not exported so that the store can only be accessed through the custom hooks that optimize perf.
export const useShoeStore = create<State>()(
  persist<State>(
    () => ({
      user: null,
      cart: [],
    }),
    { name: "zustand-store" }
  )
);

// Separate actions - https://docs.pmnd.rs/zustand/guides/practice-with-no-store-actions
// 1. Doesn't require a hook to call the action
// 2. Can be bundle split
// 3. Can be tested separately
// 4. Don't need to declare the Store's Action type
// 5. Don't need to declare a selector to optimize renders
// 6. The store declaration is more concise and easy to scan since it's only state
// 7. Can be used outside React

// But:
// 1. More verbose
// 2. Less ergonomic
// 3. Have to import each separately
export const logIn = (user: User) => useShoeStore.setState(() => ({ user }));

export const logOut = () => useShoeStore.setState(() => ({ user: null }));

export const emptyCart = () => useShoeStore.setState(() => ({ cart: [] }));

export const updateCartQuantity = (sku: string, quantity: number) => {
  useShoeStore.setState(({ cart }) => ({
    cart:
      quantity === 0
        ? cart.filter((i) => i.sku !== sku)
        : cart.map((i) => (i.sku === sku ? { ...i, quantity } : i)),
  }));
};

export const addToCart = (id: number, sku: string) => {
  useShoeStore.setState(({ cart }) => {
    const itemInCart = cart.find((i) => i.sku === sku);
    return {
      cart: itemInCart
        ? cart.map((item) =>
            item.sku === sku ? { ...item, quantity: item.quantity + 1 } : item
          )
        : [...cart, { id, sku, quantity: 1 }],
    };
  });
};

// Export custom hooks to use the store. This assures everyone accesses it efficiently and avoids repeating selectors in components.
export const useCart = () => useShoeStore((state) => state.cart);
export const useUser = () => useShoeStore((state) => state.user);
export const useCartCount = () =>
  useShoeStore((state) =>
    state.cart.reduce((acc, item) => acc + item.quantity, 0)
  );
