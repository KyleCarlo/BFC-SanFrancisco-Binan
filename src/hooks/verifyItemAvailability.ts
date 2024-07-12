import { OrderTicketList } from "@models/OrderTicket";
import { toast } from "sonner";
import { getIDofVariations } from "@lib/customer-utils";
import { Dispatch, SetStateAction } from "react";

export default async function verifyItemAvailability(
  orderList: OrderTicketList,
  validated_quantity: number,
  validated_total_cost: number,
  setValidatedQuantity: Dispatch<SetStateAction<number>>,
  setValidatedTotalCost: Dispatch<SetStateAction<number>>,
  setAvailableOrders: Dispatch<SetStateAction<boolean[]>>
) {
  try {
    const { food, beverage } = getIDofVariations(orderList);

    const response = await fetch(`/api/menu/check/availability`, {
      method: "POST",
      body: JSON.stringify({ food, beverage }),
    });
    const { available_beverage, available_food } = await response.json();

    const available: boolean[] = [];
    orderList.map((order) => {
      const { variation_id, itemType } = order;
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

    orderList.map((order, index) => {
      if (!available[index]) {
        validated_quantity -= order.quantity;
        validated_total_cost -= order.price * order.quantity;
      }
    });

    setValidatedQuantity(validated_quantity);
    setValidatedTotalCost(validated_total_cost);
    setAvailableOrders(available);
  } catch {
    toast.error("Unknown error occurred.");
  }
}
