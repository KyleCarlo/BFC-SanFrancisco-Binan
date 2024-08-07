import { ItemType } from "@models/Menu";
import { toast } from "sonner";
import { Dispatch, SetStateAction } from "react";
import { Food } from "@models/Menu/Food";
import { Beverage } from "@models/Menu/Beverage";

export default async function onDelete(
  ids: number[],
  variation_ids: number[],
  imageNames: string[],
  itemType: ItemType,
  setItemInventory: Dispatch<SetStateAction<Array<Food | Beverage>>>
) {
  try {
    const response = await fetch(`/api/menu?itemType=${itemType}`, {
      method: "DELETE",
      body: JSON.stringify({ ids, variation_ids }),
    });

    const { message } = await response.json();

    if (!response.ok) {
      return toast.error(message);
    }

    const delete_response = await fetch(
      `/api/image?multiple=true&bucket=${itemType}`,
      {
        method: "DELETE",
        body: JSON.stringify(imageNames),
      }
    );

    const { message: delete_message } = await delete_response.json();

    if (!delete_response.ok) {
      toast.error(delete_message);
    } else {
      toast.success(delete_message);
    }

    toast.success(message);
    setItemInventory((prev) => prev.filter((item) => !ids.includes(item.id)));
  } catch {
    toast.error("Unknown error occurred.");
  }
}
