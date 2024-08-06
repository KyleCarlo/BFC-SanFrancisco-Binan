"use client";

import { UseFormReturn } from "react-hook-form";
import { Order } from "@models/Order";
import { Button } from "@components/ui/button";

export default function OrderTypeField({
  form,
  pickUpLater,
}: {
  form: UseFormReturn<Order>;
  pickUpLater: boolean;
}) {
  return (
    <div className="grid grid-rows-1 grid-cols-2 gap-2 p-2">
      {/* <Button
        type="button"
        variant="outline"
        onClick={() => form.setValue("order_type", "DineIn")}
        className={`${
          form.watch("order_type") === "DineIn" && "border-gold text-gold"
        }`}
      >
        Dine-In
      </Button> */}
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
        disabled={!pickUpLater}
        onClick={() => form.setValue("order_type", "PickUpLater")}
        className={`${
          form.watch("order_type") === "PickUpLater" && "border-gold text-gold"
        }`}
      >
        Pick Up Later
      </Button>
      <Button
        type="button"
        variant="outline"
        onClick={() => form.setValue("order_type", "ParkNGo")}
        className={`col-span-2 ${
          form.watch("order_type") === "ParkNGo" && "border-gold text-gold"
        }`}
      >
        Park N{"'"} Go
      </Button>
    </div>
  );
}
