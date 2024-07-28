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

    if (orderToUpdate.customer_id && new_status === "Received") {
      console.log(orderToUpdate.customer_id);
      const response = await fetch(`/api/customer`, {
        method: "PATCH",
        body: JSON.stringify({
          id: orderToUpdate.customer_id,
          total_price: orderToUpdate.total_price,
        }),
      });

      const { message } = await response.json();
      if (!response.ok) {
        toast.error(message);
      } else {
        toast.success(
          `Customer ID: ${orderToUpdate.customer_id} gained points.`
        );
      }
    }

    const event = {
      Incoming: "",
      Processing: "send_processing",
      Complete: "send_complete",
      Rejected: "end_order",
      Received: "end_order",
    };

    if (new_status === "Received") toast.success("Successfully Updated Order.");
    else if (new_status === "Rejected")
      toast.warning("Order has been rejected.");
    const new_order = { ...orderToUpdate, status: new_status };
    socket.emit("send_confirmation", { id, status: new_status });
    socket.emit(event[new_status], new_order, orderToUpdate.status);
  } catch {
    toast.error("Unknown error occurred.");
  }
}
