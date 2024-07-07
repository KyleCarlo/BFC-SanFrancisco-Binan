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

export async function serverGetMenuItems() {
  try {
    const response_1 = await fetch(
      `http:localhost:3000/api/menu?itemType=beverage`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    const { items: beverage, message: message_1 } = await response_1.json();
    if (!response_1.ok) {
      return { message: message_1 };
    }

    const response_2 = await fetch(
      `http:localhost:3000/api/menu?itemType=food`,
      {
        method: "GET",
      }
    );

    const { items: food, message: message_2 } = await response_2.json();
    if (!response_2.ok) {
      return { message: message_2 };
    }

    const popular_food = food.filter(
      (item: Food) => item.feature === "popular"
    );
    const popular_beverage = beverage.filter(
      (item: Beverage) => item.feature === "popular"
    );
    const new_food = food.filter((item: Food) => item.feature === "new");
    const new_beverage = beverage.filter(
      (item: Beverage) => item.feature === "new"
    );

    return {
      beverage,
      food,
      popular_food,
      popular_beverage,
      new_food,
      new_beverage,
    };
  } catch {
    return { message: "Unknown error occurred." };
  }
}
