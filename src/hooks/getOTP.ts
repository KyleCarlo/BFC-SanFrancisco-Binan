import { toast } from "sonner";
import { Dispatch, SetStateAction } from "react";

export default async function getOTP(
  email: string,
  first_name: string,
  setShowConfirmation: Dispatch<SetStateAction<boolean>>
) {
  try {
    const response = await fetch("/api/customer/otp", {
      method: "POST",
      body: JSON.stringify({ email, first_name }),
    });

    const { message } = await response.json();

    if (!response.ok) {
      return toast.error(message);
    }

    setShowConfirmation(true);
  } catch {
    return toast.error("Unknown Error Occured.");
  }
}
