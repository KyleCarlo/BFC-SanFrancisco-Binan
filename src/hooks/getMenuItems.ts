import { SetStateAction } from "react";
import { ItemType } from "@models/Menu";
import { Food } from "@models/Menu/Food";
import { Beverage } from "@models/Menu/Beverage";
import { toast } from "sonner";

export async function getMenuItems(
  itemType: ItemType,
  setLoading: React.Dispatch<SetStateAction<boolean>>,
  setItems: React.Dispatch<SetStateAction<Array<Food | Beverage>>>
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
  } catch {
    setItems([]);
    toast.error("Unknown error occurred.");
  }
  setLoading(false);
}

export async function serverGetMenuItems() {
  try {
    const response_1 = await fetch(
      `http://localhost:3000/api/menu?itemType=beverage`,
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
      `http://localhost:3000/api/menu?itemType=food`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    const { items: food, message: message_2 } = await response_2.json();
    if (!response_2.ok) {
      return { message: message_2 };
    }

    const food_ids: number[] = [];
    const beverage_ids: number[] = [];
    const popular_food: Food[] = [];
    const popular_beverage: Beverage[] = [];
    const new_food: Food[] = [];
    const new_beverage: Beverage[] = [];
    const unavailable_food: number[] = [];
    const unavailable_beverage: number[] = [];

    food.forEach((item: Food) => {
      food_ids.push(item.id);
      switch (item.feature) {
        case "Popular":
          popular_food.push(item);
          break;
        case "New":
          new_food.push(item);
          break;
      }

      item.variations.forEach((variation) => {
        if (!variation.available) unavailable_food.push(variation.id);
      });
    });

    beverage.forEach((item: Beverage) => {
      beverage_ids.push(item.id);
      switch (item.feature) {
        case "Popular":
          popular_beverage.push(item);
          break;
        case "New":
          new_beverage.push(item);
          break;
      }

      item.variations.forEach((variation) => {
        if (!variation.available) unavailable_beverage.push(variation.id);
      });
    });

    return {
      beverage_ids,
      food_ids,
      beverage,
      food,
      popular_food,
      popular_beverage,
      new_food,
      new_beverage,
      unavailable_food,
      unavailable_beverage,
    };
  } catch {
    return { message: "Unknown error occurred." };
  }
}
