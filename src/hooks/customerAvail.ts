import { toast } from "sonner";
import { Dispatch, SetStateAction } from "react";

export default async function customerAvail(
  customerID: string,
  setOpen: Dispatch<SetStateAction<boolean>>,
  reloadAfter: Boolean = false
) {
  toast.warning("Please Wait...");
  try {
    const response = await fetch(`/api/customer/avail?id=${customerID}`, {
      method: "PATCH",
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
    if (reloadAfter)
      setTimeout(() => {
        location.reload();
      }, 1500);
  } catch {
    toast.error("Unknown Error Occurred.");
  }
}
