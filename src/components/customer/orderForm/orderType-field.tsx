"use client";

import { UseFormReturn } from "react-hook-form";
import { Order } from "@models/Order";
import { Button } from "@components/ui/button";

export default function OrderTypeField({
  form,
}: {
  form: UseFormReturn<Order>;
}) {
  return (
    <div className="grid grid-rows-2 grid-cols-2 gap-2 p-2">
      <Button
        type="button"
        variant="outline"
        onClick={() => form.setValue("order_type", "DineIn")}
        className={`${
          form.watch("order_type") === "DineIn" && "border-gold text-gold"
        }`}
      >
        Dine-In
      </Button>
      <Button
        type="button"
        variant="outline"
        onClick={() => form.setValue("order_type", "ParkNGo")}
        className={`${
          form.watch("order_type") === "ParkNGo" && "border-gold text-gold"
        }`}
      >
        Park N{"'"} Go
      </Button>
      <Button
        type="button"
        variant="outline"
        onClick={() => form.setValue("order_type", "PickUpNow")}
        className={`${
          form.watch("order_type") === "PickUpNow" && "border-gold text-gold"
        }`}
      >
        Pick Up Now
      </Button>
      <Button
        type="button"
        variant="outline"
        onClick={() => form.setValue("order_type", "PickUpLater")}
        className={`${
          form.watch("order_type") === "PickUpLater" && "border-gold text-gold"
        }`}
      >
        Pick Up Later
      </Button>
    </div>
  );
}
