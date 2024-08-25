"use client";

import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";
import { useState, useEffect } from "react";
import { OrderStatus } from "@models/Order";
import getOrderCount from "@hooks/getOrderCount";
import socket from "@lib/socket";

export const OrderCountContext = createContext<{
  orderCount: { [key in OrderStatus]: number };
  setOrderCount: Dispatch<SetStateAction<{ [key in OrderStatus]: number }>>;
} | null>(null);

export function useOrderCountContext() {
  const orderCount = useContext(OrderCountContext);

  if (!orderCount) {
    throw new Error("useOrderContext must be used within OrderProvider");
  }

  return orderCount;
}

export function OrderCountProvider({ children }: { children: ReactNode }) {
  const [orderCount, setOrderCount] = useState<{
    [key in OrderStatus]: number;
  }>({
    Incoming: 0,
    Processing: 0,
    Complete: 0,
    Rejected: 0,
    Received: 0,
  });
  const [orderIDs, setOrderIDs] = useState<{
    [key in OrderStatus]: string[];
  }>({
    Incoming: [],
    Processing: [],
    Complete: [],
    Rejected: [],
    Received: [],
  });
  const [deletedIDs, setDeletedIDs] = useState<{
    [key in OrderStatus]: string[];
  }>({
    Incoming: [],
    Processing: [],
    Complete: [],
    Rejected: [],
    Received: [],
  });
  useEffect(() => {
    socket.on(
      "notify_staff",
      ({ status, id }: { status: OrderStatus; id: string }) => {
        if (!orderIDs[status].includes(id as string)) {
          setOrderCount((prev) => {
            return { ...prev, [status]: prev[status] + 1 };
          });
          setOrderIDs((prev) => {
            return {
              ...prev,
              [status]: [...prev[status], id],
            };
          });
          if (status !== "Received") {
            const staff_flow_notif = new Audio(
              `/${status.toLowerCase()}-notif.mp3`
            );
            staff_flow_notif.play();
          }
        }
      }
    );

    socket.on(
      "decrement_queue",
      ({ status, id }: { status: OrderStatus; id: string }) => {
        if (!deletedIDs[status].includes(id as string)) {
          setOrderCount((prev) => {
            return { ...prev, [status]: prev[status] - 1 };
          });
          setDeletedIDs((prev) => {
            return {
              ...prev,
              [status]: [...prev[status], id],
            };
          });
        }
      }
    );

    return () => {
      socket.off("notify_staff");
      socket.off("decrement_queue");
    };
  }, [orderIDs, deletedIDs]);

  useEffect(() => {
    getOrderCount(setOrderCount);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (orderCount.Incoming > 0) {
      const incoming_notif = new Audio("/incoming-notif.mp3");
      interval = setInterval(() => {
        incoming_notif.play();
      }, 3000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [orderCount.Incoming]);

  return (
    <OrderCountContext.Provider value={{ orderCount, setOrderCount }}>
      {children}
    </OrderCountContext.Provider>
  );
}
