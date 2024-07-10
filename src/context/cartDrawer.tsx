"use client";

import {
  useState,
  useContext,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";

export const CartDrawerContext = createContext<{
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
} | null>(null);

export function useCartDrawerContext() {
  const cartDrawer = useContext(CartDrawerContext);

  if (!cartDrawer) {
    throw new Error(
      "useCartDrawerContext must be used within CartDrawerProvider"
    );
  }

  return cartDrawer;
}

export function CartDrawerProvider({
  children,
  defaultOpen,
}: {
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState<boolean>(defaultOpen ?? false);

  return (
    <CartDrawerContext.Provider value={{ open, setOpen }}>
      {children}
    </CartDrawerContext.Provider>
  );
}
