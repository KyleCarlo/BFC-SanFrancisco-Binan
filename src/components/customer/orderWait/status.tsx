"use client";

import { type OrderStatus, OrderStatusModel, OrderType } from "@models/Order";
import { Progress } from "@components/ui/progress";
import socket from "@lib/socket";
import { useEffect, useState } from "react";

export default function OrderStatus({
  id,
  status,
  type,
}: {
  id: string;
  status: OrderStatus;
  type: OrderType;
}) {
  const [curr_status, setCurr_status] = useState<OrderStatus>(status);
  useEffect(() => {
    socket.connect();
    socket.emit("join_room", id);
    socket.on("rcv_confirmation", (status: OrderStatus) => {
      if (Object.keys(OrderStatusModel.Values).includes(status)) {
        setCurr_status(status);
      }
    });

    return () => {
      socket.off("rcv_confirmation");
      socket.disconnect();
    };
  }, [curr_status, id]);

  const progress = {
    Incoming: 33,
    Processing: 66,
    Complete: 100,
    Rejected: 100,
    Received: 100,
  };

  return (
    <div className="flex flex-col gap-2 items-center justify-center h-full text-center w-full">
      {curr_status === "Incoming" && <p>Waiting to be Accepted...</p>}
      {curr_status === "Processing" && <p>We are Processing your Order...</p>}
      {curr_status === "Complete" && (
        <p>
          Orders Complete!{" "}
          {type === "DineIn" && "Your order is on the counter."}
          {type === "ParkNGo" && "Please wait for your order to be delivered."}
          {type === "PickUpLater" ||
            (type === "PickUpNow" && "You can Pick Up your order now.")}
        </p>
      )}
      {curr_status === "Received" && <p>Thank you! Please Come Again.</p>}
      {curr_status === "Rejected" && (
        <p>Sorry, your order has been Rejected.</p>
      )}
      <Progress value={progress[curr_status]} className="max-w-[200px]" />
    </div>
  );
}
