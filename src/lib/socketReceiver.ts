import socket from "@lib/socket";
import { Order, OrderStatus } from "@models/Order";
import { Dispatch, SetStateAction } from "react";

export default function socketReceiver(
  receivedIDs: string[],
  setReceivedIDs: Dispatch<SetStateAction<string[]>>,
  orders: Order[],
  setOrders: Dispatch<SetStateAction<Order[]>>,
  statusToListen: OrderStatus
) {
  socket.connect();

  socket.on(
    "rcv_order",
    ({ order, method }: { order: Order; method: "POST" | "DELETE" }) => {
      console.log("rcv_order", order, method);
      if (
        !receivedIDs.includes(order.id as string) &&
        order.status === statusToListen &&
        method === "POST"
      ) {
        setOrders([...orders, order]);
        setReceivedIDs([...receivedIDs, order.id as string]);
      }

      if (
        receivedIDs.includes(order.id as string) &&
        order.status === statusToListen &&
        method === "DELETE"
      ) {
        setOrders(orders.filter((o) => o.id !== order.id));
      }
    }
  );

  return () => {
    socket.off("rcv_order");
    socket.disconnect();
  };
}
