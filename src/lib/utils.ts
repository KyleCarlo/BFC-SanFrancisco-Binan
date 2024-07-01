import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ItemType, ItemTypeModel } from "@models/Menu";
import { BeverageVariation } from "@models/Menu/Beverage";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function validateItemType(itemType: string) {
  const properItemTypes = Object.keys(ItemTypeModel.Values);

  return properItemTypes.includes(itemType);
}

export function validateVariation(
  variations: BeverageVariation[],
  itemType: ItemType
) {
  let response = {
    isValid: true,
    message: "",
  };
  variations.forEach((variation) => {
    if (itemType === "beverage") {
      if (variation.concentrate && variation.hot_cold !== undefined) {
        response.isValid = false;
        response.message = "Set Temperature to None if Concentrate.";
        return;
      } else if (!variation.concentrate && variation.hot_cold === undefined) {
        response.isValid = false;
        response.message = "Set Temperature if Not Concentrate.";
        return;
      }
    }

    if (variation.serving === "") {
      response.isValid = false;
      response.message = "Serving is required";
      return;
    }

    if (variation.price === "") {
      response.isValid = false;
      response.message = "Price is required";
      return;
    }
  });
  return response;
}
