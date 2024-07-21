import { Dispatch, SetStateAction } from "react";
import { Order } from "@models/Order";
import { toast } from "sonner";

export default async function getEndOrders(
  setOrders: Dispatch<SetStateAction<Order[]>>,
  setLoading: Dispatch<SetStateAction<boolean>>
) {
  setLoading(true);
  try {
    const response_1 = await fetch(`/api/order/received`, {
      method: "GET",
      cache: "no-store",
    });

    const { orders: received, message: message_1 } = await response_1.json();

    if (!response_1.ok) {
      return toast.error(message_1);
    }

    const response_2 = await fetch(`/api/order/rejected`, {
      method: "GET",
      cache: "no-store",
    });

    const { orders: rejected, message: message_2 } = await response_2.json();

    if (!response_2.ok) {
      return toast.error(message_2);
    }

    const orders = [...received, ...rejected];
    orders.sort((a, b) => {
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    });

    setOrders(orders);
  } catch {
    setOrders([]);
    toast.error("Unknown error occurred.");
  }
  setLoading(false);
}
