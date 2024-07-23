"use client";

import { useEffect, useState } from "react";
import { getOrderByStatus } from "@hooks/getOrder";
import DataTable from "@components/ui/data-table";
import orderColumns from "./table_columns";
import { useOrdersContext } from "@context/order";
import socket from "@lib/socket";
import { Order } from "@models/Order";

export default function ProcessingOrders() {
  const { orders, setOrders } = useOrdersContext();
  const [receivedIDs, setReceivedIDs] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    socket.on("rcv_processing", (order: Order) => {
      if (!receivedIDs.includes(order.id as string)) {
        setOrders([...orders, order]);
        setReceivedIDs([...receivedIDs, order.id as string]);
      }
    });

    socket.on("delete_processing", (order_id: string) => {
      setOrders(orders.filter((o) => o.id !== order_id));
    });

    return () => {
      socket.off("rcv_processing");
      socket.off("delete_processing");
    };
  }, [orders, setOrders, receivedIDs]);

  useEffect(() => {
    getOrderByStatus("Processing", setOrders, setLoading);
  }, []);

  return (
    <div>
      {loading && <span>Loading...</span>}
      {!loading && <DataTable data={orders} columns={orderColumns} />}
    </div>
  );
}
