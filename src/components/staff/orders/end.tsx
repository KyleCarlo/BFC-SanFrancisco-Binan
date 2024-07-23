"use client";

import { useEffect, useState } from "react";
import DataTable from "@components/ui/data-table";
import endColumns from "./end_columns";
import getEndOrders from "@hooks/getEndOrders";
import socket from "@lib/socket";
import { useOrdersContext } from "@context/order";

export default function EndOrders() {
  const { orders, setOrders } = useOrdersContext();
  const [loading, setLoading] = useState(true);
  const [receivedIDs, setReceivedIDs] = useState<string[]>(
    orders.map((order) => order.id as string)
  );

  useEffect(() => {
    socket.on("rcv_end", (order) => {
      if (!receivedIDs.includes(order.id as string)) {
        setOrders([order, ...orders]);
        setReceivedIDs([...receivedIDs, order.id as string]);
      }
    });
  }, [orders, setOrders, receivedIDs]);

  useEffect(() => {
    getEndOrders(setOrders, setLoading);
  }, []);

  return (
    <div>
      {loading && <span>Loading...</span>}
      {!loading && <DataTable data={orders} columns={endColumns} />}
    </div>
  );
}
