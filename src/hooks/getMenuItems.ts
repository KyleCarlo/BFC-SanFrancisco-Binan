import { SetStateAction } from "react";
import { ItemType } from "@models/Menu";
import { Food } from "@models/Menu/Food";
import { Beverage } from "@models/Menu/Beverage";
import { toast } from "sonner";

export async function getMenuItems(
  itemType: ItemType,
  setLoading: React.Dispatch<SetStateAction<boolean>>,
  setItems: React.Dispatch<SetStateAction<[] | Food[] | Beverage[]>>
) {
  setLoading(true);
  try {
    const response = await fetch(`/api/menu?itemType=${itemType}`, {
      method: "GET",
    });

    const { items, message } = await response.json();

    if (!response.ok) {
      setItems([]);
      setLoading(false);
      return toast.error(message);
    }

    setItems(items);
    setLoading(false);
  } catch {
    setItems([]);
    setLoading(false);
    toast.error("Unknown error occurred.");
  }
}
