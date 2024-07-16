import { z } from "zod";
import { CartModel } from "./Cart";

export const OrderStatus = z.enum([
  "Incoming",
  "Processing",
  "Complete",
  "Received",
  "Cancelled",
]);
export const OrderType = z.enum([
  "Delivery",
  "PickUpNow",
  "PickUpLater",
  "ParkNGo",
]);

export const Order = z.object({
  id: z.string(),
  created_at: z.date(),
  received_at: z.date(),
  user_id: z.number(),
  status: OrderStatus,
  order_type: OrderType,
  mop: z.string(),
  items: CartModel,
  total_price: z.number(),
  total_num: z.number(),
});
