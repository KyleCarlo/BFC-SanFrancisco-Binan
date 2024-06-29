import { FeatureModel } from "./index";
import { z } from "zod";

export const BeverageBaseModel = z.enum(["drip", "espresso", "tea"]);
export const BeverageHotColdModel = z.enum(["hot", "cold"]);

export type BeverageBase = z.infer<typeof BeverageBaseModel>;
export type BeverageHotCold = z.infer<typeof BeverageHotColdModel>;

export const BeverageVariationModel = z.object({
  id: z.number(),
  beverage_id: z.number(),
  serving: z.string(),
  price: z.number(),
  concentrate: z.boolean(),
  hot_cold: BeverageHotColdModel.optional(),
  available: z.boolean(),
});

export const BeverageModel = z.object({
  id: z.number(),
  name: z.string().min(1).max(20),
  image: z.string().min(1).max(255),
  description: z.string().min(1).max(255),
  base: BeverageBaseModel,
  feature: FeatureModel,
  variations: BeverageVariationModel.array(),
});

export type BeverageVariation = z.infer<typeof BeverageVariationModel>;
export type Beverage = z.infer<typeof BeverageModel>;
