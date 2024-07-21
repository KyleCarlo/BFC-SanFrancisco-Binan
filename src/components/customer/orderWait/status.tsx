"use client";

import { type OrderStatus } from "@models/Order";
import { Progress } from "@components/ui/progress";

export default function OrderStatus({ status }: { status: OrderStatus }) {
  if (status === "Incoming") {
    return (
      <div className="flex flex-col gap-2 items-center justify-center h-full text-center w-full">
        <p>Waiting to be Accepted...</p>
        <Progress value={33} className="max-w-[200px]" />
      </div>
    );
  }
}
