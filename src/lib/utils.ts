import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Food } from "@models/Menu/Food";
import { Beverage } from "@models/Menu/Beverage";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function parseBeverageBase(base: string | undefined) {
  if (!base) return;
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
      return "Pinoy Faves";
    default:
      return base;
  }
}

export const bestSellers: Array<{
  id: number;
  name: string;
  image: string;
}> = [
  {
    id: 0,
    name: "Spanish Latte",
    image: "Spanish Latte.jpg",
  },
  {
    id: 1,
    name: "Cream Puff",
    image: "Chocolate Cream Puff.png",
  },
  {
    id: 2,
    name: "Creamy Tuna Pesto",
    image: "Creamy Tuna Pesto.jpg",
  },
];
