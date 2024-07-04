import { ItemType } from "@models/Menu";
import { FoodVariation } from "@models/Menu/Food";
import { BeverageVariation } from "@models/Menu/Beverage";
import { SetStateAction } from "react";
import { toast } from "sonner";

const toggleAvailability = async (
  available: boolean,
  id: Number,
  variation_id: Number,
  itemType: ItemType,
  svariations: FoodVariation | BeverageVariation,
  setSVariation: React.Dispatch<
    SetStateAction<FoodVariation | BeverageVariation>
  >
) => {
  try {
    const response = await fetch(`http://localhost:3000/api/menu`, {
      method: "PATCH",
      body: JSON.stringify({
        available,
        id,
        variation_id,
        itemType,
      }),
    });

    const { message } = await response.json();

    if (!response.ok) {
      return toast.error(message);
    }

    setSVariation({ ...svariations, available });
    toast.success(message);
  } catch {
    toast.error("Unknown error occurred.");
  }
};

export default toggleAvailability;
