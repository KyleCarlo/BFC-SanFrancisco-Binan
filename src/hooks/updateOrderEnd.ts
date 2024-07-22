import { Order, OrderStatus } from "@models/Order";
import { toast } from "sonner";
import dayjs from "@lib/dayjs";
import socket from "@lib/socket";

export default async function updateOrderEnd(
  orderToUpdate: Order,
  new_status: OrderStatus
) {
  try {
    const { id } = orderToUpdate;
    const response_1 = await fetch(`/api/order?id=${id}`, {
      method: "DELETE",
    });

    const { message: message_1 } = await response_1.json();

    if (!response_1.ok) {
      return toast.error(message_1);
    }

    const response_2 = await fetch(`/api/order?done=true`, {
      method: "POST",
      body: JSON.stringify({
        ...orderToUpdate,
        status: new_status,
        received_at: dayjs().tz("Asia/Manila").toDate(),
      }),
    });

    const { message: message_2 } = await response_2.json();

    if (!response_2.ok) {
      return toast.error(message_2);
    }

    toast.success("Order Updated Successfully.");
    socket.emit("send_confirmation", { id, status: new_status });
    socket.emit("send_order", { order: orderToUpdate, method: "DELETE" });
    orderToUpdate.status = new_status;
    socket.emit("send_order", { order: orderToUpdate, method: "POST" });
  } catch {
    toast.error("Unknown error occurred.");
  }
}
