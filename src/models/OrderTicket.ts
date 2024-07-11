import { z } from "zod";
import { CartItemModel } from "./Cart";

export const OrderTicketModel = CartItemModel.extend({
  name: z.string(),
  image: z.string(),
  price: z.number(),
  serving: z.string(),
  hot_cold: z.string().optional(),
  concentrate: z.boolean().optional(),
});
export const OrderTicketListModel = OrderTicketModel.array();

export type OrderTicket = z.infer<typeof OrderTicketModel>;
export type OrderTicketList = z.infer<typeof OrderTicketListModel>;
