import { z } from "zod";
import { FeatureModel } from "./index";

export const FoodCategoryModel = z.enum(["pastry", "cake", "pasta", "snacks"]);

export type FoodCategory = z.infer<typeof FoodCategoryModel>;

export const FoodVariationModel = z.object({
  id: z.number(),
  food_id: z.number(),
  price: z.coerce
    .number({
      required_error: "Price is required",
      invalid_type_error: "Price must be a number",
    })
    .int()
    .positive()
    .min(1, { message: "Price cannot be 0" })
    .or(z.literal("")),
  serving: z.string().min(1).max(20).or(z.literal("")),
  available: z.boolean(),
});

export const FoodModel = z.object({
  id: z.number(),
  name: z.string().min(1).max(30),
  image: z.string().min(1).max(30),
  description: z.string().min(1).max(255),
  category: FoodCategoryModel,
  feature: FeatureModel,
  variations: FoodVariationModel.array(),
});

export type FoodVariation = z.infer<typeof FoodVariationModel>;
export type Food = z.infer<typeof FoodModel>;
