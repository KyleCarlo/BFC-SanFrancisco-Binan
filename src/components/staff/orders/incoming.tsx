"use client";

import { useEffect, useState } from "react";
import { Order } from "@models/Order";
import { getOrderByStatus } from "@hooks/getOrder";
import socket from "@lib/socket";
import DataTable from "@components/ui/data-table";
import orderColumns from "./table_columns";

export default function IncomingOrders() {
  const [r_messages, setR_messages] = useState<Order[]>([]);
  const [incomingOrders, setIncomingOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    socket.connect();

    socket.on("rcv_order", (data: Order) => {
      setR_messages([...r_messages, data]);
    });

    return () => {
      socket.off("rcv_order");
      socket.disconnect();
    };
  });

  useEffect(() => {
    getOrderByStatus("Incoming", setIncomingOrders, setLoading);
  }, []);

  return (
    <div>
      {loading && <span>Loading...</span>}
      {!loading && <DataTable data={incomingOrders} columns={orderColumns} />}
    </div>
  );
}
