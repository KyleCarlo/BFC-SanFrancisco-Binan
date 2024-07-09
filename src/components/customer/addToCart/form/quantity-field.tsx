"use client";

import { useState, useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { CartItem } from "@models/Cart";
import { toast } from "sonner";

export default function QuantityField({
  form,
}: {
  form: UseFormReturn<CartItem | any | undefined>;
}) {
  const [quantity, setQuantity] = useState(form.getValues("quantity"));

  useEffect(() => {
    form.setValue("quantity", quantity);
  }, [quantity, form]);

  return (
    <div className="flex w-full justify-center gap-5">
      <div
        className={`text-bold border-2 w-7 text-center rounded-lg ${
          quantity === 0
            ? "text-gray-600 border-gray-600 cursor-not-allowed"
            : "border-white cursor-pointer"
        }`}
        onClick={() => {
          if (quantity > 0) setQuantity(quantity - 1);
        }}
      >
        -
      </div>
      <div className="text-bold w-8 text-center">{quantity}</div>
      <div
        className="text-bold border-2 border-white w-7 text-center rounded-lg cursor-pointer"
        onClick={() => {
          if (quantity < 30) {
            setQuantity(quantity + 1);
          } else {
            toast.warning(
              "Maximum quantity reached! Please make a separate order."
            );
          }
        }}
      >
        +
      </div>
    </div>
  );
}
