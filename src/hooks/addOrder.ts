import { Order } from "@models/Order";
import { Uppy } from "@uppy/core";
import { nanoid } from "nanoid";
import { toast } from "sonner";

export default async function addOrder(
  order: Order,
  uppy: Uppy<Record<string, unknown>, Record<string, unknown>>
) {
  const order_id = nanoid();
  const uploadedFile = uppy.getFiles()[0];
  if (order.mop !== "Cash" && !uploadedFile) {
    return toast.error("Please Upload Proof of Payment.");
  }
  if (order.order_type === "PickUpLater" && !order.scheduled) {
    return toast.error("Please Indicate the Schedule Pickup.");
  }
  order.id = order_id;
  try {
    const response = await fetch("/api/order", {
      method: "POST",
      body: JSON.stringify(order),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { message } = await response.json();
    if (!response.ok) {
      return toast.error(message);
    }
  } catch {
    return toast.error("Unknown Error Occurred.");
  }
}
