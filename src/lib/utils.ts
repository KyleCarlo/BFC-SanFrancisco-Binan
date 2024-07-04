import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ItemType, ItemTypeModel } from "@models/Menu";
import { Food } from "@models/Menu/Food";
import { Beverage } from "@models/Menu/Beverage";
import { BeverageVariation } from "@models/Menu/Beverage";
import { DefaultValues } from "react-hook-form";

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
    console.log(variation.concentrate, variation.hot_cold);
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
      response.message = "Serving Size is Required.";
      return;
    }

    if (variation.price === "") {
      response.isValid = false;
      response.message = "Price is Required.";
      return;
    }
  });
  return response;
}

export function parseDefaultValues(defaultValues: Food | Beverage) {
  let base = (defaultValues as Beverage).base;
  let category = (defaultValues as Food).category;
  if (base) base = (base as string).toLowerCase() as Beverage["base"];
  if (category)
    category = (category as string).toLowerCase() as Food["category"];

  const parsed_variations = defaultValues.variations.map((variation) => {
    const hot_cold = (variation as BeverageVariation).hot_cold;
    const concentrate = (variation as BeverageVariation).concentrate;

    return {
      hot_cold: hot_cold ? hot_cold.toLowerCase() : "none",
      concentrate: concentrate ? "true" : "false",
      serving: variation.serving,
      price: variation.price.toString(),
      available: Number(variation.available) == 1 ? true : false,
    };
  });

  return {
    name: defaultValues.name,
    description: defaultValues.description,
    feature: defaultValues.feature.toLowerCase() as Beverage["feature"],
    base,
    category,
    variations: parsed_variations,
  } as DefaultValues<Food | Beverage>;
}
