import { SetStateAction } from "react";
import { ItemType } from "@models/Menu";
import { Food } from "@models/Menu/Food";
import { Beverage } from "@models/Menu/Beverage";
import { toast } from "sonner";

const getMenuItems = async (
  itemType: ItemType,
  setLoading: React.Dispatch<SetStateAction<boolean>>,
  setItems: React.Dispatch<SetStateAction<[] | Food[] | Beverage[]>>
) => {
  setLoading(true);
  try {
    const res = await fetch(
      `http://localhost:3000/api/menu?itemType=${itemType}`,
      {
        method: "GET",
      }
    );

    const { items, message } = await res.json();

    if (!res.ok) {
      toast.error(message);
      setItems([]);
      setLoading(false);
    } else {
      setItems(items);
      setLoading(false);
    }
  } catch {
    setItems([]);
    setLoading(false);
    toast.error("Unknown error occurred.");
  }
};

export default getMenuItems;
