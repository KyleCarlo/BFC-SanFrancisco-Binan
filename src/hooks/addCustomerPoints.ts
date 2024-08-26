import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

export default async function addCustomerPoints(
  beveragePrice: number,
  customerID: string,
  setOpen: Dispatch<SetStateAction<boolean>>,
  reloadAfter: Boolean = false
) {
  try {
    const response = await fetch(`/api/customer?accordingTo=beveragePrice`, {
      method: "PATCH",
      body: JSON.stringify({
        id: customerID,
        beveragePrice,
      }),
    });

    const { message } = await response.json();
    if (!response.ok) {
      if (reloadAfter)
        setTimeout(() => {
          location.reload();
        }, 1500);
      return toast.error(
        `${message}${reloadAfter ? " Page Reloading..." : ""}`
      );
    }

    toast.success(`${message}${reloadAfter ? " Page Reloading..." : ""}`);
    setOpen(false);
    if (reloadAfter)
      setTimeout(() => {
        location.reload();
      }, 1500);
  } catch {
    return toast.error("Unknown Error Occured.");
  }
}
