"use client";

import { Cart } from "@models/Cart";
import { createContext, useContext, Dispatch, SetStateAction } from "react";
import { useState, useEffect } from "react";

export const CartContext = createContext<{
  cart: Cart;
  setCart: Dispatch<SetStateAction<Cart>>;
} | null>(null);

export function useCartContext() {
  const cart = useContext(CartContext);

  if (!cart) {
    throw new Error("useItemTypeContext must be used within ItemTypeProvider");
  }

  return cart;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart>([]);

  useEffect(() => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      setCart(JSON.parse(cart));
    }
  }, []);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
}
