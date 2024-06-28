import { z } from "zod";

export const ItemTypeModel = z.enum(["food", "beverage"]);
export const FeatureModel = z.enum(["none", "popular", "new"]);

export type ItemType = z.infer<typeof ItemTypeModel>;
export type Feature = z.infer<typeof FeatureModel>;
