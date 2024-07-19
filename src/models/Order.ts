import { z } from "zod";
import { CartModel } from "./Cart";

export const OrderStatusModel = z.enum([
  "Incoming",
  "Processing",
  "Complete",
  "Received",
  "Cancelled",
]);

export const OrderTypeModel = z.enum([
  "DineIn",
  "PickUpNow",
  "PickUpLater",
  "ParkNGo",
]);

export const OrderReceiverDetailsModel = z.object({
  name: z.string().min(1),
  contact_number: z.string().min(1),
  vehicle_plate: z.string().optional(),
  vehicle_color: z.string().optional(),
});

export const OrderModel = z.object({
  id: z.string().optional(),
  created_at: z.date().optional(),
  received_at: z.date().optional(),
  customer_id: z.number().optional(),
  status: OrderStatusModel,
  order_type: OrderTypeModel,
  scheduled: z.date().optional(),
  payment_pic: z.string().optional(),
  receiver_details: OrderReceiverDetailsModel,
  mop: z.string(),
  items: CartModel,
  total_price: z.number(),
  total_num: z.number(),
});

export type Order = z.infer<typeof OrderModel>;
export type OrderStatus = z.infer<typeof OrderStatusModel>;
export type OrderType = z.infer<typeof OrderTypeModel>;
export type OrderReceiverDetails = z.infer<typeof OrderReceiverDetailsModel>;
