import { ItemDetails, ItemDetailsList } from "@models/Cart";
import { toast } from "sonner";
import { getIDofVariations } from "@lib/customer-utils";
import { Dispatch, SetStateAction } from "react";

export default async function verifyItemAvailability(
  itemDetailsList: ItemDetailsList,
  validated_quantity: number,
  validated_total_cost: number,
  setValidatedQuantity: Dispatch<SetStateAction<number>>,
  setValidatedTotalCost: Dispatch<SetStateAction<number>>,
  setAvailableOrders: Dispatch<SetStateAction<boolean[]>>,
  setDiscountAmount: Dispatch<SetStateAction<number>>,
  setLoading: Dispatch<SetStateAction<boolean>>
) {
  setLoading(true);
  try {
    const { food, beverage } = getIDofVariations(itemDetailsList);

    const response = await fetch(`/api/menu/check/availability`, {
      method: "POST",
      body: JSON.stringify({ food, beverage }),
    });
    const { available_beverage, available_food } = await response.json();

    const available: boolean[] = [];
    itemDetailsList.map((itemDetails) => {
      const { variation_id, itemType } = itemDetails;
      if (itemType === "beverage") {
        const item = available_beverage.find(
          (item: { id: number; available: number }) => item.id === variation_id
        );
        available.push(item ? Boolean(item.available) : false);
      } else {
        const item = available_food.find(
          (item: { id: number; available: number }) => item.id === variation_id
        );
        available.push(item ? Boolean(item.available) : false);
      }
    });

    if (available.includes(false)) {
      toast.error(
        "Some Items are Unavailable. Remove the Item or Refresh the Page."
      );
    }

    itemDetailsList.map((itemDetails, index) => {
      if (!available[index]) {
        validated_quantity -= itemDetails.quantity;
        validated_total_cost -= itemDetails.price * itemDetails.quantity;
      }
    });

    setValidatedQuantity(validated_quantity);
    setValidatedTotalCost(validated_total_cost);
    setAvailableOrders(available);
    if (!available.includes(true)) return;

    const highestPriceItem = itemDetailsList.reduce((max, itemDetails, index) =>
      !available[index]
        ? max
        : itemDetails.price > max.price
        ? itemDetails
        : max
    );
    setDiscountAmount(highestPriceItem.price * 0.2857);
  } catch {
    toast.error("Unknown error occurred.");
  }
  setLoading(false);
}
