import { OrderStatus } from "@models/Order";
import { toast } from "sonner";
import dayjs from "@lib/dayjs";
import socket from "@lib/socket";
import { Order } from "@models/Order";

export default async function updateOrderStatus(
  orderToUpdate: Order,
  new_status: OrderStatus
) {
  try {
    const { id } = orderToUpdate;
    const response = await fetch(`/api/order?id=${id}&status=${new_status}`, {
      method: "PATCH",
      body: JSON.stringify({ received_at: dayjs().tz("Asia/Manila").toDate() }),
    });

    const { message } = await response.json();

    if (!response.ok) {
      return toast.error(message);
    }

    toast.success(message);

    const event = {
      Incoming: "",
      Processing: "send_processing",
      Complete: "send_complete",
      Rejected: "",
      Received: "",
    };

    const new_order = { ...orderToUpdate, status: new_status };
    socket.emit("send_confirmation", { id, status: new_status });
    socket.emit(event[new_status], new_order);
  } catch {
    toast.error("Unknown error occurred.");
  }
}
