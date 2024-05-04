import React, { useReducer, useEffect, useContext } from "react";
import cartReducer from "./cartReducer";
import { CartAction, CartItem } from "./types/types";

export const CartContext = React.createContext<CartContextType | null>(null);

type CartContextType = {
  items: CartItem[];
  dispatch: React.Dispatch<CartAction>;
};

let initialCart: CartItem[] = [];
try {
  const cart = localStorage.getItem("cart");
  const parsedCart: any[] = cart ? JSON.parse(cart) : [];
  initialCart = parsedCart.map((item) => ({ ...item, id: parseInt(item.id) }));
} catch {
  console.error("The cart could not be parsed into JSON.");
  initialCart = [];
}

type CartProviderProps = {
  children: React.ReactNode;
};

export function CartProvider(props: CartProviderProps) {
  const [cart, dispatch] = useReducer(cartReducer, initialCart);
  useEffect(() => localStorage.setItem("cart", JSON.stringify(cart)), [cart]);
  const contextValue = {
    items: cart,
    dispatch,
  };
  return (
    <CartContext.Provider value={contextValue}>
      {props.children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error(
      "useCart must be used within a CartProvider. Wrap a parent component in <CartProvider> to fix this error."
    );
  }
  return context;
}
