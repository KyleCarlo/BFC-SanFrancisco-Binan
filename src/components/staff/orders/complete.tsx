"use client";

import { useEffect, useState } from "react";
import { Order } from "@models/Order";
import { getOrderByStatus } from "@hooks/getOrder";
import socket from "@lib/socket";
import DataTable from "@components/ui/data-table";
import orderColumns from "./table_columns";

export default function CompletedOrders() {
  const [r_messages, setR_messages] = useState<Order[]>([]);
  const [completedOrders, setCompletedOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  //   useEffect(() => {
  //     socket.connect();

  //     socket.on("rcv_order", (data: Order) => {
  //       setR_messages([...r_messages, data]);
  //     });

  //     return () => {
  //       socket.off("rcv_order");
  //       socket.disconnect();
  //     };
  //   });

  useEffect(() => {
    getOrderByStatus("Complete", setCompletedOrders, setLoading);
  }, []);

  return (
    <div>
      {loading && <span>Loading...</span>}
      {!loading && <DataTable data={completedOrders} columns={orderColumns} />}
    </div>
  );
}
