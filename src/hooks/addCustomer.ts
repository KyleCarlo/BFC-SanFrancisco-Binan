import { SignUp } from "@models/User";
import { toast } from "sonner";
import { Dispatch, SetStateAction } from "react";

export default async function addCustomer(
  customer: SignUp,
  otp: string,
  setRegistered: Dispatch<SetStateAction<boolean>>
) {
  try {
    const response = await fetch("/api/customer", {
      method: "POST",
      body: JSON.stringify({ customer, otp }),
    });
    const { message } = await response.json();
    if (!response.ok) {
      return toast.error(message);
    }

    setRegistered(true);
  } catch {
    return toast.error("Unknown Error Occured.");
  }
}
