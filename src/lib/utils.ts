import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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
    name: "Vietnamese",
    image: "Vietnamese-Style.jpg",
  },
  {
    id: 3,
    name: "Creamy Tuna Pesto",
    image: "Creamy Tuna Pesto.jpg",
  },
  {
    id: 4,
    name: "Caramel Macchiato",
    image: "Caramel Macchiato.jpg",
  },
  { id: 5, name: "Lasagna", image: "Lasagna.png" },
  {
    id: 6,
    name: "Matcha Latte",
    image: "Matcha Latte.jpg",
  },
  {
    id: 7,
    name: "Biscoff Cake",
    image: "Biscoff cake.jpg",
  },
];
