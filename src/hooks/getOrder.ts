import { Order, OrderStatus } from "@models/Order";
import { toast } from "sonner";
import { Dispatch, SetStateAction } from "react";

export async function getOrderByStatus(
  status: OrderStatus,
  setOrders: Dispatch<SetStateAction<Order[]>>,
  setLoading: Dispatch<SetStateAction<boolean>>
) {
  setLoading(true);
  try {
    const response = await fetch(`/api/order/${status}`, {
      method: "GET",
      cache: "no-store",
    });

    const { orders, message } = await response.json();

    if (!response.ok) {
      return toast.error(message);
    }

    setOrders(orders);
  } catch {
    setOrders([]);
    toast.error("Unknown error occurred.");
  }
  setLoading(false);
}

export async function serverGetOrder(
  order_id: string
): Promise<{ order?: Order; message?: string }> {
  try {
    const response = await fetch(
      `http://localhost:3000/api/order?id=${order_id}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    const { order, message } = await response.json();

    if (!response.ok) {
      return { message };
    }

    return { order: order[0] };
  } catch {
    return { message: "Unknown error occurred." };
  }
}
