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

export function CartProvider({
  children,
  beverage_ids,
  food_ids,
  unavailable_beverage,
  unavailable_food,
}: {
  children: React.ReactNode;
  beverage_ids: number[];
  food_ids: number[];
  unavailable_beverage: number[];
  unavailable_food: number[];
}) {
  const [cart, setCart] = useState<Cart>([]);

  useEffect(() => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      const parsedCart = JSON.parse(cart) as Cart;
      const filteredCart = parsedCart.filter((cartItem) => {
        if (
          cartItem.itemType === "food" &&
          food_ids.includes(cartItem.id) &&
          !unavailable_food.includes(cartItem.variation_id)
        )
          return cartItem;
        else if (
          cartItem.itemType === "beverage" &&
          beverage_ids.includes(cartItem.id) &&
          !unavailable_beverage.includes(cartItem.variation_id)
        )
          return cartItem;
      });
      setCart(filteredCart);
    }
  }, []);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
}
