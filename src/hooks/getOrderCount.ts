import { Dispatch, SetStateAction } from "react";
import { OrderStatus } from "@models/Order";
import { toast } from "sonner";

export default async function getOrderCount(
  setOrderCount: Dispatch<SetStateAction<{ [key in OrderStatus]: number }>>
) {
  const response = await fetch("/api/order/count", {
    method: "GET",
  });

  const { order_count, message } = await response.json();

  if (!response.ok) {
    toast.warning(message);
    return;
  }
  setOrderCount((prev) => {
    return { ...prev, ...order_count };
  });
}
