"use client";

import { useEffect, useState } from "react";
import DataTable from "@components/ui/data-table";
import endColumns from "./end_columns";
import getEndOrders from "@hooks/getEndOrders";
import socketReceiver from "@lib/socketReceiver";
import { useOrdersContext } from "@context/order";

export default function EndOrders() {
  const { orders, setOrders } = useOrdersContext();
  const [loading, setLoading] = useState(true);
  const [receivedIDs, setReceivedIDs] = useState<string[]>(
    orders.map((order) => order.id as string)
  );

  useEffect(() => {
    const cleanUp1 = socketReceiver(
      receivedIDs,
      setReceivedIDs,
      orders,
      setOrders,
      "Received"
    );

    const cleanUp2 = socketReceiver(
      receivedIDs,
      setReceivedIDs,
      orders,
      setOrders,
      "Rejected"
    );

    return () => {
      cleanUp1();
      cleanUp2();
    };
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
