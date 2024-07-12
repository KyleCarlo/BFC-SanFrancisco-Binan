import { ItemType } from "@models/Menu";
import { toast } from "sonner";

export default async function verifyItemAvailability(
  id: number,
  variation_id: number,
  itemType: ItemType,
  name: string
) {
  try {
    const response = await fetch(
      `/api/menu/check/availability?id=${id}&variation_id=${variation_id}&itemType=${itemType}`
    );

    const { found, available } = await response.json();

    if (!response.ok) {
      toast.error(`${name} Not Found.`);
      return { found: false, available: false };
    }

    return { found, available };
  } catch {
    toast.error("Unknown error occurred.");
  }
}
