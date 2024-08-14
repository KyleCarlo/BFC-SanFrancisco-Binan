import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function parseBeverageBase(base: string) {
  switch (base.toLowerCase()) {
    case "drip":
      return "Drip Based";
    case "espresso":
      return "Espresso Based";
    case "milk":
      return "Milk Based";
    case "auro":
      return "Auro Series";
    case "matcha":
      return "Matcha Series";
    case "pinoy":
      return "Pinoy Based";
    default:
      return base;
  }
}
