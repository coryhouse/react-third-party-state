import React, { useEffect, useContext, useState } from "react";
import { CartItem } from "../types/types";

export const CartContext = React.createContext<CartContextType | null>(null);

type CartContextType = {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
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
  const [cart, setCart] = useState(initialCart);
  useEffect(() => localStorage.setItem("cart", JSON.stringify(cart)), [cart]);
  const contextValue = {
    cart,
    setCart,
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
