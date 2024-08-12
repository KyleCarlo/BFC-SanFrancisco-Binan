import { toast } from "sonner";
import { Dispatch, SetStateAction } from "react";
import socket from "@lib/socket";
import { Voucher } from "@models/Voucher";

export default async function customerAvail(
  voucher_details: string,
  setOpen: Dispatch<SetStateAction<boolean>>,
  reloadAfter: Boolean = false
) {
  toast.warning("Please Wait...");
  try {
    const response = await fetch(`/api/customer/voucher`, {
      method: "DELETE",
      body: JSON.stringify({ voucher_details }),
    });

    const { message } = await response.json();
    const toast_message = reloadAfter
      ? `${message} Page Reloading...`
      : message;

    if (!response.ok) {
      toast.error(toast_message);
      if (reloadAfter)
        setTimeout(() => {
          location.reload();
        }, 1500);
      return;
    }

    toast.success(toast_message);
    setOpen(false);
    socket.emit("send_voucher_confirmation", {
      id: (JSON.parse(voucher_details) as Voucher).id,
      status: "success",
    });
    if (reloadAfter)
      setTimeout(() => {
        location.reload();
      }, 1500);
  } catch {
    toast.error("Unknown Error Occurred.");
  }
}
