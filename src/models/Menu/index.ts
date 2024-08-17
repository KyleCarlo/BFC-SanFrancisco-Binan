import { z } from "zod";

export const ItemTypeModel = z.enum(["food", "beverage"]);
export const FeatureModel = z.enum(["None", "Popular", "New"]);

export type ItemType = z.infer<typeof ItemTypeModel>;
export type Feature = z.infer<typeof FeatureModel>;
