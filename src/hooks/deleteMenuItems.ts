import { ItemType } from "@models/Menu";
import { toast } from "sonner";

export default async function onDelete(
  ids: number[],
  variation_ids: number[],
  itemType: ItemType
) {
  try {
    const res = await fetch(
      `http://localhost:3000/api/menu?itemType=${itemType}`,
      {
        method: "DELETE",
        body: JSON.stringify({ ids, variation_ids }),
      }
    );

    const res_message = (await res.json()).message;

    if (!res.ok) {
      toast.error(res_message);
    } else {
      toast.success(res_message);
    }
  } catch {
    toast.error("Unknown error occurred.");
  }
}
