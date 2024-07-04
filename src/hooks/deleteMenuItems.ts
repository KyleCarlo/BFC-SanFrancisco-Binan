import { ItemType } from "@models/Menu";
import { toast } from "sonner";

export default async function onDelete(
  ids: number[],
  variation_ids: number[],
  itemType: ItemType
) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/menu?itemType=${itemType}`,
      {
        method: "DELETE",
        body: JSON.stringify({ ids, variation_ids }),
      }
    );

    const { message } = await response.json();

    if (!response.ok) {
      return toast.error(message);
    }

    toast.success(message);
  } catch {
    toast.error("Unknown error occurred.");
  }
}
