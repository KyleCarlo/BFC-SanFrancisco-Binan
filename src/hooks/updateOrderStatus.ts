import { OrderStatus } from "@models/Order";
import { toast } from "sonner";
import dayjs from "@lib/dayjs";

export default async function updateOrderStatus(
  id: string,
  status: OrderStatus
) {
  try {
    const response = await fetch(`/api/order?id=${id}&status=${status}`, {
      method: "PATCH",
      body: JSON.stringify({ received_at: dayjs().tz("Asia/Manila").toDate() }),
    });

    const { message } = await response.json();

    if (!response.ok) {
      return toast.error(message);
    }

    toast.success(message);
  } catch {
    toast.error("Unknown error occurred.");
  }
}
