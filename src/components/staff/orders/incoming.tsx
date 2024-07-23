"use client";

import { useEffect, useState } from "react";
import { getOrderByStatus } from "@hooks/getOrder";
import DataTable from "@components/ui/data-table";
import orderColumns from "./table_columns";
import { useOrdersContext } from "@context/order";
import socket from "@lib/socket";
import { Order } from "@models/Order";

export default function IncomingOrders() {
  const { orders, setOrders } = useOrdersContext();
  const [receivedIDs, setReceivedIDs] = useState<string[]>(
    orders.map((order) => order.id as string)
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    socket.on("rcv_order", (order: Order) => {
      if (!receivedIDs.includes(order.id as string)) {
        setOrders([...orders, order]);
        setReceivedIDs([...receivedIDs, order.id as string]);
      }
    });

    socket.on("delete_order", (order_id: string) => {
      setOrders(orders.filter((o) => o.id !== order_id));
    });

    return () => {
      socket.off("rcv_order");
      socket.off("delete_order");
    };
  }, [orders, setOrders, receivedIDs]);

  useEffect(() => {
    getOrderByStatus("Incoming", setOrders, setLoading);
  }, []);

  return (
    <div>
      {loading && <span>Loading...</span>}
      {!loading && <DataTable data={orders} columns={orderColumns} />}
    </div>
  );
}
