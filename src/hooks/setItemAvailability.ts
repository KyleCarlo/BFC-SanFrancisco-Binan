import { ItemType } from "@models/Menu";
import { Food, FoodVariation } from "@models/Menu/Food";
import { Beverage, BeverageVariation } from "@models/Menu/Beverage";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

export async function toggleAvailability(
  available: boolean,
  id: Number,
  variation_id: Number,
  itemType: ItemType,
  svariations: FoodVariation | BeverageVariation,
  setSVariation: Dispatch<SetStateAction<FoodVariation | BeverageVariation>>,
  setItemInventory: Dispatch<SetStateAction<Array<Food | Beverage>>>
) {
  try {
    const response = await fetch(`/api/menu`, {
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
    setItemInventory(
      (prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                variations: item.variations.map((variation) =>
                  variation.id === variation_id
                    ? { ...variation, available: available }
                    : variation
                ),
              }
            : item
        ) as Array<Food | Beverage>
    );
    toast.success(message);
  } catch {
    toast.error("Unknown error occurred.");
  }
}
