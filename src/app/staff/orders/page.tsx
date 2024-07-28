"use client";

import IncomingOrders from "@components/staff/orders/incoming";
import ProcessingOrders from "@components/staff/orders/processing";
import CompletedOrders from "@components/staff/orders/complete";
import EndOrders from "@components/staff/orders/end";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import { OrdersProvider } from "@context/order";
import { useOrderCountContext } from "@context/orderCount";
import NotifBadge from "@components/staff/notif-badge";

export default function StaffOrdersPage() {
  const { orderCount } = useOrderCountContext();

  return (
    <div className="p-4">
      <Tabs
        defaultValue="incoming"
        className="w-full flex flex-col items-center"
      >
        <div className="flex flex-wrap gap-y-2 justify-center">
          <TabsList className="min-[513px]:rounded-r-[0] min-[513px]:pr-[0]">
            <div className="relative">
              {orderCount.Incoming > 0 && (
                <span className="absolute top-[-10px] right-[-3px]">
                  <NotifBadge count={orderCount.Incoming} status="Incoming" />
                </span>
              )}
              <TabsTrigger value="incoming">Incoming</TabsTrigger>
            </div>
            <div className="relative">
              {orderCount.Processing > 0 && (
                <span className="absolute top-[-10px] right-[-3px]">
                  <NotifBadge
                    count={orderCount.Processing}
                    status="Processing"
                  />
                </span>
              )}
              <TabsTrigger value="processing">Processing</TabsTrigger>
            </div>
          </TabsList>
          <TabsList className="min-[513px]:rounded-l-[0] min-[513px]:pl-[0]">
            <div className="relative">
              {orderCount.Complete > 0 && (
                <span className="absolute top-[-10px] right-[-3px]">
                  <NotifBadge count={orderCount.Complete} status="Complete" />
                </span>
              )}
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </div>
            <TabsTrigger value="end">Received/Rejected</TabsTrigger>
          </TabsList>
        </div>
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
