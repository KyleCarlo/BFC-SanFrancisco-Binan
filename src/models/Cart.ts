import { z } from "zod";
import { ItemTypeModel } from "./Menu";

export const SugarLevelModel = z.enum(["25%", "50%", "75%", "100%"]);
export const RoastTypeModel = z.enum(["medium", "dark"]);

export const CartItemModel = z.object({
  itemType: ItemTypeModel,
  id: z.number(),
  variation_id: z.coerce.number(),
  quantity: z.number().nonnegative(),
  sugar_level: SugarLevelModel.optional(),
  roast: RoastTypeModel.optional(),
});

export const ItemDetailsModel = CartItemModel.extend({
  name: z.string(),
  image: z.string(),
  price: z.number(),
  serving: z.string(),
  hot_cold: z.string().optional(),
  concentrate: z.boolean().optional(),
});

export const ItemDetailsListModel = ItemDetailsModel.array();

export const CartModel = CartItemModel.array();

export type SugarLevel = z.infer<typeof SugarLevelModel>;
export type RoastType = z.infer<typeof RoastTypeModel>;
export type CartItem = z.infer<typeof CartItemModel>;
export type Cart = z.infer<typeof CartModel>;
export type ItemDetails = z.infer<typeof ItemDetailsModel>;
export type ItemDetailsList = z.infer<typeof ItemDetailsListModel>;
