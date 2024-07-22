"use client";

import { Order } from "@models/Order";
import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";
import { useState } from "react";

export const OrdersContext = createContext<{
  orders: Order[];
  setOrders: Dispatch<SetStateAction<Order[]>>;
} | null>(null);

export function useOrdersContext() {
  const orders = useContext(OrdersContext);

  if (!orders) {
    throw new Error("useOrderContext must be used within OrderProvider");
  }

  return orders;
}

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);

  return (
    <OrdersContext.Provider value={{ orders, setOrders }}>
      {children}
    </OrdersContext.Provider>
  );
}
