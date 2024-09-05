import { EmailForm } from "@models/EmailForm";
import { toast } from "sonner";
import { Dispatch, SetStateAction } from "react";

export async function sendInquiry(
  values: EmailForm,
  setSuccessful: Dispatch<SetStateAction<boolean>>,
  setSending: Dispatch<SetStateAction<boolean>>
) {
  setSending(true);
  try {
    const response = await fetch("/api/customer/inquiry", {
      method: "POST",
      body: JSON.stringify(values),
    });

    const { message } = await response.json();

    if (!response.ok) {
      return toast.error(message);
    }

    setSuccessful(true);
  } catch {
    toast.error("Unknown Error Occurred.");
  }
  setSending(false);
}
