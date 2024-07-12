"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import socket from "@lib/socket";

export default function StaffOrdersPage() {
  socket.on("orders", (data) => {
    console.log(data);
    alert(data);
  });
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
        <TabsContent value="incoming">incoming orders here</TabsContent>
        <TabsContent value="processing">processing orders here</TabsContent>
        <TabsContent value="completed">completed</TabsContent>
      </Tabs>
    </div>
  );
}
