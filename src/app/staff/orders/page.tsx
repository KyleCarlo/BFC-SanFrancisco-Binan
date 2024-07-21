import IncomingOrders from "@components/staff/orders/incoming";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";

export default function StaffOrdersPage() {
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
        </TabsList>
        <TabsContent value="incoming">
          <IncomingOrders />
        </TabsContent>
        <TabsContent value="processing">processing orders here</TabsContent>
        <TabsContent value="completed">completed</TabsContent>
      </Tabs>
    </div>
  );
}
