import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ItemTypeModel } from "../models/Menu";

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
