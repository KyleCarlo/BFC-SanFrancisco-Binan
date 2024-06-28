import { z } from "zod";
import { FeatureModel } from "./index";

export const FoodCategoryModel = z.enum(["pastry", "cake", "pasta", "snacks"]);

export type FoodCategory = z.infer<typeof FoodCategoryModel>;

export const FoodVariationModel = z.object({
  id: z.number(),
  food_id: z.number(),
  price: z.number(),
  serving: z.string(),
  available: z.boolean(),
});

export const FoodModel = z.object({
  id: z.number(),
  name: z.string(),
  image: z.string(),
  description: z.string(),
  category: FoodCategoryModel,
  feature: FeatureModel,
  variations: FoodVariationModel.array(),
});

export type FoodVariation = z.infer<typeof FoodVariationModel>;
export type Food = z.infer<typeof FoodModel>;
