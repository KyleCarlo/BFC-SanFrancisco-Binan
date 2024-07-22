"use client";

import { useEffect, useState } from "react";
import { getOrderByStatus } from "@hooks/getOrder";
import DataTable from "@components/ui/data-table";
import orderColumns from "./table_columns";
import { useOrdersContext } from "@context/order";
import socketReceiver from "@lib/socketReceiver";

export default function ProcessingOrders() {
  const { orders, setOrders } = useOrdersContext();
  const [receivedIDs, setReceivedIDs] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return socketReceiver(
      receivedIDs,
      setReceivedIDs,
      orders,
      setOrders,
      "Processing"
    );
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
