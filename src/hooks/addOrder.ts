import { Order } from "@models/Order";
import { Uppy } from "@uppy/core";
import { nanoid } from "nanoid";
import { toast } from "sonner";
import socket from "@lib/socket";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import handleUppyUpload from "@lib/uppy-uploadHandler";
import { getSession } from "@lib/auth";
import { UserSession } from "@models/User";

export default async function addOrder(
  order: Order,
  uppy: Uppy<Record<string, unknown>, Record<string, unknown>>,
  router: AppRouterInstance,
  isConnected: boolean,
  error: string | null
) {
  const order_id = nanoid();
  const uploadedFile = uppy.getFiles()[0];

  if (!order.order_type) {
    return toast.error("Please Select Order Type.");
  }
  if (order.mop === "") {
    return toast.error("Please Select Mode of Payment.");
  }
  if (order.mop !== "Cash" && !uploadedFile) {
    return toast.error("Please Upload Proof of Payment.");
  }
  if (order.order_type === "PickUpLater" && !order.scheduled) {
    return toast.error("Please Indicate the Schedule Pickup.");
  }
  if (order.order_type === "ParkNGo" && !order.receiver_details.vehicle_plate) {
    return toast.error("Please Indicate the Vehicle Plate.");
  }
  if (
    order.order_type === "ParkNGo" &&
    !order.receiver_details.vehicle_description
  ) {
    return toast.error("Please Indicate the Vehicle Description.");
  }
  if (!isConnected) {
    return toast.error(error);
  }

  order.id = order_id;

  try {
    const { session } = await getSession();
    if (session && (session.user as UserSession).role === "Customer")
      order.customer_id = (session.user as UserSession).id;

    if (order.mop !== "Cash") {
      uppy.setMeta({
        name: `${order_id}.${uploadedFile.extension}`,
        bucket: "payment",
      });
      const uppy_result = await uppy.upload();

      const {
        proceed,
        message: { content, type },
        imageURL,
      } = await handleUppyUpload(uppy_result, order_id, "payment");

      switch (type) {
        case "error":
          toast.error(content);
          break;
        case "warning":
          toast.warning(content);
          break;
        case "success":
          toast.success(content);
          break;
      }
      if (!proceed) {
        return;
      }

      order.payment_pic = imageURL;
    }

    const response = await fetch("/api/order?done=false", {
      method: "POST",
      body: JSON.stringify(order),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { message } = await response.json();
    if (!response.ok) {
      toast.error(message);
      if (uploadedFile)
        await fetch(
          `/api/image?bucket=payment&filename=${`${order_id}.${uploadedFile.extension}`}`,
          {
            method: "DELETE",
          }
        );
      return { proceed: false };
    }

    socket.emit("send_order", order);
    localStorage.removeItem("cart");
    router.push(`/order/${order_id}`);
  } catch {
    return toast.error("Unknown Error Occurred.");
  }
}
