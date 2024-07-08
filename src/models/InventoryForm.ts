import { z } from "zod";
import { BeverageVariationModel, BeverageModel } from "@models/Menu/Beverage";
import { FoodVariationModel, FoodModel } from "@models/Menu/Food";

export const BeverageFormSchemaModel = BeverageModel.pick({
  name: true,
  description: true,
  base: true,
  feature: true,
}).merge(
  z.object({
    variations: z.array(
      BeverageVariationModel.pick({
        serving: true,
        price: true,
        concentrate: true,
        hot_cold: true,
        available: true,
      })
    ),
  })
);

export const FoodFormSchemaModel = FoodModel.pick({
  name: true,
  description: true,
  category: true,
  feature: true,
}).merge(
  z.object({
    variations: z.array(
      FoodVariationModel.pick({ serving: true, price: true, available: true })
    ),
  })
);

export type FoodForm = z.infer<typeof FoodFormSchemaModel>;
export type BeverageForm = z.infer<typeof BeverageFormSchemaModel>;
export type Form = z.infer<
  | typeof FoodFormSchemaModel
  | typeof BeverageFormSchemaModel
  | typeof FoodModel
  | typeof BeverageModel
>;
