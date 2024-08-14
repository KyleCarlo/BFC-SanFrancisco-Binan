import { FeatureModel } from "./index";
import { z } from "zod";

export const BeverageBaseModel = z.enum([
  "drip",
  "espresso",
  "milk",
  "auro",
  "matcha",
  "pinoy",
]);
export const BeverageHotColdModel = z.enum(["hot", "cold"]);

export type BeverageBase = z.infer<typeof BeverageBaseModel>;
export type BeverageHotCold = z.infer<typeof BeverageHotColdModel>;

export const BeverageVariationModel = z.object({
  id: z.number(),
  beverage_id: z.number(),
  serving: z.string().min(1).max(20).or(z.literal("")),
  price: z.coerce
    .number({
      required_error: "Price is required",
      invalid_type_error: "Price must be a number",
    })
    .positive()
    .min(1, { message: "Price cannot be 0" })
    .or(z.literal("")),
  concentrate: z.preprocess((input) => {
    if (input === "true") return true;
    return false;
  }, z.boolean()),
  hot_cold: z.preprocess((input) => {
    if (input === "none") return undefined;
    return input;
  }, BeverageHotColdModel.optional()),
  available: z.boolean(),
});

export const BeverageModel = z.object({
  id: z.number(),
  name: z
    .string()
    .regex(/^(?!.*[?/]).*$/, "String must not contain '?' or '/'")
    .min(1)
    .max(30),
  image: z.string().min(1).max(400),
  description: z.string().min(1).max(255),
  base: BeverageBaseModel,
  feature: FeatureModel,
  variations: BeverageVariationModel.array(),
});

export type BeverageVariation = z.infer<typeof BeverageVariationModel>;
export type Beverage = z.infer<typeof BeverageModel>;
