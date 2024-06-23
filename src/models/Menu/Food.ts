export enum FoodCategory {
  Pastry,
  Cake,
  Pasta,
  Snacks,
}

export interface Food {
  id: number;
  name: string;
  description: string;
  category: FoodCategory;
  variations: FoodVariation[];
}

export interface FoodVariation {
  id: number;
  food_id: number;
  serving: string;
  price: number;
}
