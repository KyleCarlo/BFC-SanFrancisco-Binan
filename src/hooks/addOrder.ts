import { Order } from "@models/Order";
import { Uppy } from "@uppy/core";
import { generateOrderID } from "@lib/customer-utils";
import { toast } from "sonner";

export default async function addOrder(
  order: Order,
  uppy: Uppy<Record<string, unknown>, Record<string, unknown>>
) {
  const order_id = generateOrderID();
  const uploadedFile = uppy.getFiles()[0];

  if (order.mop !== "Cash" && !uploadedFile) {
    return toast.error("Please Upload Proof of Payment.");
  }

  if (order.order_type === "PickUpLater" && !order.scheduled) {
    return toast.error("Please Indicate the Schedule Pickup.");
  }

  order.id = order_id;
}
