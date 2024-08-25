import { Order } from "@models/Order";
import { Uppy } from "@uppy/core";
import { nanoid } from "nanoid";
import { toast } from "sonner";
import socket from "@lib/socket";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import handleUppyUpload from "@lib/uppy-uploadHandler";
import { getSession } from "@lib/auth";
import { UserSession } from "@models/User";
import { Dispatch, SetStateAction } from "react";

export default async function addOrder(
  order: Order,
  uppy_receipt: Uppy<Record<string, unknown>, Record<string, unknown>>,
  uppy_discount: Uppy<Record<string, unknown>, Record<string, unknown>>,
  router: AppRouterInstance,
  isConnected: boolean,
  error: string | null,
  setDiscountUploaded: Dispatch<SetStateAction<boolean>>,
  setReceiptUploaded: Dispatch<SetStateAction<boolean>>,
  setPauseButton: Dispatch<SetStateAction<boolean>>
) {
  const order_id = nanoid();
  const uploadedReceipt = uppy_receipt.getFiles()[0];
  const uploadedDiscount = uppy_discount.getFiles()[0];

  if (!order.order_type) {
    return toast.error("Please Select Order Type.");
  }
  if (order.mop === "") {
    return toast.error("Please Select Mode of Payment.");
  }
  if (order.mop !== "Cash" && !uploadedReceipt) {
    return toast.error("Please Upload Proof of Payment.");
  }
  if (
    order.mop === "Cash" &&
    (order.payment_change === "" || order.payment_change === undefined)
  ) {
    return toast.error("Please Indicate the Payment Change.");
  }
  if (order.discount && !uploadedDiscount) {
    return toast.error(`Please Upload ${order.discount} ID.`);
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
  if (
    order.order_type === "ParkNGo" &&
    !order.receiver_details.parking_location
  ) {
    return toast.error("Please Indicate the Parking Location.");
  }
  if (!isConnected) {
    return toast.error(error);
  }

  if (order.order_type !== "ParkNGo") {
    delete order.receiver_details.vehicle_plate;
    delete order.receiver_details.vehicle_description;
    delete order.receiver_details.parking_location;
  }

  if (order.mop !== "Cash") {
    order.payment_change = undefined;
  }

  order.id = order_id;

  setPauseButton(true);
  setTimeout(() => {
    setPauseButton(false);
  }, 5000);

  try {
    const { session } = await getSession();
    if (session && (session.user as UserSession).role === "Customer")
      order.customer_id = (session.user as UserSession).id;

    if (order.mop !== "Cash") {
      uppy_receipt.setMeta({
        name: `${order_id}.${uploadedReceipt.extension}`,
        bucket: "payment",
      });
      const uppy_result = await uppy_receipt.upload();

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

    if (order.discount) {
      uppy_discount.setMeta({
        name: `${order_id}.${uploadedDiscount.extension}`,
        bucket: "discountid",
      });
      const uppy_result = await uppy_discount.upload();

      const {
        proceed,
        message: { content, type },
        imageURL,
      } = await handleUppyUpload(uppy_result, order_id, "discountid");

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

      order.discount_id = imageURL;
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
      if (uploadedReceipt)
        await fetch(
          `/api/image?bucket=payment&filename=${`${order_id}.${uploadedReceipt.extension}`}`,
          {
            method: "DELETE",
          }
        );
      if (uploadedDiscount) {
        await fetch(
          `/api/image?bucket=discountid&filename=${`${order_id}.${uploadedDiscount.extension}`}`,
          {
            method: "DELETE",
          }
        );
      }
      uppy_receipt.clearUploadedFiles();
      uppy_discount.clearUploadedFiles();
      setReceiptUploaded(false);
      setDiscountUploaded(false);
      return;
    }

    socket.emit("send_order", order);
    localStorage.removeItem("cart");
    router.push(`/order/${order_id}`);
  } catch {
    return toast.error("Unknown Error Occurred.");
  }
}
