import { Dispatch, SetStateAction } from "react";
import { MOP } from "@models/MOP";
import { toast } from "sonner";

export default async function getMOPs(
  setMops: Dispatch<SetStateAction<MOP[]>>,
  setLoading: Dispatch<SetStateAction<boolean>>
) {
  setLoading(true);
  try {
    const response = await fetch(`/api/mop`, {
      method: "GET",
      cache: "no-store",
    });

    const { MOP } = await response.json();
    setMops(MOP);
  } catch {
    toast.error("Error Fetching Mode of Payments.");
  }
  setLoading(false);
}
