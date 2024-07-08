import { z } from "zod";
import { ItemTypeModel } from "./Menu";

export const SugarLevelModel = z.enum(["25%", "50%", "75%", "100%"]);

export const CartItemModel = z.object({
  itemType: ItemTypeModel,
  id: z.number(),
  variation_id: z.coerce.number(),
  quantity: z.number().nonnegative(),
  sugar_level: SugarLevelModel.optional(),
});

export const CartModel = CartItemModel.array();

export type SugarLevel = z.infer<typeof SugarLevelModel>;
export type CartItem = z.infer<typeof CartItemModel>;
export type Cart = z.infer<typeof CartModel>;
