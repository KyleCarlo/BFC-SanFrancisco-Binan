import { z } from "zod";
import { CartModel } from "./Cart";

export const OrderStatusModel = z.enum([
  "Incoming",
  "Processing",
  "Complete",
  "Received",
  "Rejected",
]);

export const OrderTypeModel = z.enum([
  "DineIn",
  "PickUpNow",
  "PickUpLater",
  "ParkNGo",
]);

export const ParkingLocationModel = z.enum([
  "ul",
  "ur",
  "r",
  "ll",
  "lr",
  "ll2",
  "lr2",
]);

export const OrderReceiverDetailsModel = z.object({
  name: z.string().min(1),
  contact_number: z
    .string()
    .min(1)
    .regex(/^[\d\s]+$/),
  vehicle_plate: z.string().optional(),
  vehicle_description: z.string().optional(),
  parking_location: ParkingLocationModel.optional(),
  comments: z.string().optional(),
});

export const OrderDiscountModel = z.enum(["Senior", "PWD"]);

export const OrderModel = z.object({
  id: z.string().optional(),
  created_at: z.date().optional(),
  received_at: z.date().optional(),
  customer_id: z.string().optional(),
  discount: OrderDiscountModel.optional(),
  discount_id: z.string().optional(),
  status: OrderStatusModel,
  order_type: OrderTypeModel.optional(),
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
export type OrderDiscount = z.infer<typeof OrderDiscountModel>;
export type OrderReceiverDetails = z.infer<typeof OrderReceiverDetailsModel>;
export type ParkingLocation = z.infer<typeof ParkingLocationModel>;
