import { ItemType, ItemTypeModel } from "@models/Menu";
import { Food, FoodVariation } from "@models/Menu/Food";
import { Beverage, BeverageVariation } from "@models/Menu/Beverage";
import { Feature } from "@models/Menu";
import { DefaultValues } from "react-hook-form";
import {
  BeverageFormSchemaModel,
  FoodFormSchemaModel,
} from "@/src/models/InventoryForm";
import { FoodModel } from "@models/Menu/Food";
import { BeverageModel } from "@models/Menu/Beverage";
import { MOP } from "@models/MOP";

export function validateItemType(itemType: string) {
  const properItemTypes = Object.keys(ItemTypeModel.Values);

  return properItemTypes.includes(itemType);
}

export function validateVariation(
  variations: BeverageVariation[] | FoodVariation[],
  itemType: ItemType
) {
  let response = {
    isValid: true,
    message: "",
  };
  variations.forEach((variation) => {
    if (itemType === "beverage") {
      if (
        (variation as BeverageVariation).concentrate &&
        (variation as BeverageVariation).hot_cold !== undefined
      ) {
        response.isValid = false;
        response.message = "Set Temperature to None if Concentrate.";
        return;
      } else if (
        !(variation as BeverageVariation).concentrate &&
        (variation as BeverageVariation).hot_cold === undefined
      ) {
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

export function parseDefaultMenuValues(defaultValues: Food | Beverage) {
  let base = (defaultValues as Beverage).base;
  let category = (defaultValues as Food).category;
  if (base) base = (base as string).toLowerCase() as Beverage["base"];
  if (category)
    category = (category as string).toLowerCase() as Food["category"];

  const parsed_variations = defaultValues.variations.map((variation) => {
    const hot_cold = (variation as BeverageVariation).hot_cold;
    const concentrate = (variation as BeverageVariation).concentrate;

    return {
      id: variation.id,
      food_id: (variation as FoodVariation).food_id,
      beverage_id: (variation as BeverageVariation).beverage_id,
      hot_cold: hot_cold ? hot_cold.toLowerCase() : "none",
      concentrate: concentrate ? "true" : "false",
      serving: variation.serving,
      price: variation.price.toString(),
      available: Number(variation.available) == 1 ? true : false,
    };
  });

  return {
    id: defaultValues.id,
    image: defaultValues.image,
    name: defaultValues.name,
    description: defaultValues.description,
    feature: defaultValues.feature as Feature,
    base,
    category,
    variations: parsed_variations,
  } as DefaultValues<Food | Beverage>;
}

export function inferFormSchema(
  itemType: ItemType,
  formType: "create" | "update"
) {
  if (formType === "create") {
    if (itemType === "beverage") {
      return BeverageFormSchemaModel;
    }
    return FoodFormSchemaModel;
  }
  if (itemType === "beverage") {
    return BeverageModel;
  }
  return FoodModel;
}

export function parseDefaultMOPValues(defaultValues?: MOP) {
  if (!defaultValues)
    return {
      id: 0,
      acct_name: "",
      bank_name: "",
      available: true,
      qr_code: "",
    };

  return {
    id: defaultValues.id,
    acct_name: defaultValues.acct_name,
    bank_name: defaultValues.bank_name,
    available: defaultValues.available,
    qr_code: defaultValues.qr_code,
  } as DefaultValues<MOP>;
}
