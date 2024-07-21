import { Order, OrderStatus } from "@models/Order";
import { toast } from "sonner";
import dayjs from "@lib/dayjs";

export default async function updateOrderEnd(
  order: Order,
  status: OrderStatus
) {
  try {
    const response_1 = await fetch(`/api/order?id=${order.id}`, {
      method: "DELETE",
    });

    const { message: message_1 } = await response_1.json();

    if (!response_1.ok) {
      return toast.error(message_1);
    }

    const response_2 = await fetch(`/api/order?done=true`, {
      method: "POST",
      body: JSON.stringify({
        ...order,
        status,
        received_at: dayjs().tz("Asia/Manila").toDate(),
      }),
    });

    const { message: message_2 } = await response_2.json();

    if (!response_2.ok) {
      return toast.error(message_2);
    }

    toast.success("Order Updated Successfully.");
  } catch {
    toast.error("Unknown error occurred.");
  }
}
