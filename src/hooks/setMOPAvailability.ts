import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

export default async function toggleAvailability(
  available: boolean,
  id: Number,
  setAvailable: Dispatch<SetStateAction<boolean>>
) {
  try {
    const response = await fetch(`/api/mop`, {
      method: "PATCH",
      body: JSON.stringify({
        available,
        id,
      }),
    });

    const { message } = await response.json();

    if (!response.ok) {
      return toast.error(message);
    }

    setAvailable(available);
    toast.success(message);
  } catch {
    toast.error("Unknown error occurred.");
  }
}
