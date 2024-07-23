"use client";

import IncomingOrders from "@components/staff/orders/incoming";
import ProcessingOrders from "@components/staff/orders/processing";
import CompletedOrders from "@components/staff/orders/complete";
import EndOrders from "@components/staff/orders/end";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import { OrdersProvider } from "@context/order";
import { useEffect } from "react";
import socket from "@lib/socket";

export default function StaffOrdersPage() {
  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="p-4">
      <Tabs
        defaultValue="incoming"
        className="w-full flex flex-col items-center"
      >
        <TabsList>
          <TabsTrigger value="incoming">Incoming</TabsTrigger>
          <TabsTrigger value="processing">Processing</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="end">Received/Rejected</TabsTrigger>
        </TabsList>
        <TabsContent value="incoming" className="w-full">
          <div className="w-full">
            <OrdersProvider>
              <IncomingOrders />
            </OrdersProvider>
          </div>
        </TabsContent>
        <TabsContent value="processing" className="w-full">
          <div className="w-full">
            <OrdersProvider>
              <ProcessingOrders />
            </OrdersProvider>
          </div>
        </TabsContent>
        <TabsContent value="completed" className="w-full">
          <div className="w-full">
            <OrdersProvider>
              <CompletedOrders />
            </OrdersProvider>
          </div>
        </TabsContent>
        <TabsContent value="end" className="w-full">
          <div className="w-full">
            <OrdersProvider>
              <EndOrders />
            </OrdersProvider>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
