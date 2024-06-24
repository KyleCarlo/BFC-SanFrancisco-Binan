import { Feature } from "./index";

export type BeverageBase = "drip" | "espresso" | "tea";

export type BeverageHotCold = "hot" | "cold";

export interface Beverage {
  id: number;
  name: string;
  description: string;
  base: BeverageBase;
  feature: Feature;
  variations: BeverageVariation[];
}

export interface BeverageVariation {
  id: number;
  beverage_id: number;
  serving: string;
  price: number;
  concentrate: Boolean;
  hot_cold?: BeverageHotCold;
  available: Boolean;
}
