"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@components/ui/sheet";
import { Button } from "@components/ui/button";
import { useCartContext } from "@context/cart";
import { Beverage } from "@models/Menu/Beverage";
import { Food } from "@models/Menu/Food";
import { getItemDetails } from "@lib/customer-utils";
import CartOrderSubmission from "./cart-order";
import { useEffect } from "react";

export default function CartView({
  food,
  beverage,
}: {
  food: Food[];
  beverage: Beverage[];
}) {
  const { cart, setCart } = useCartContext();
  const { quantity, total_cost, itemDetailsList } = getItemDetails(
    food,
    beverage,
    cart
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div
          className={`h-11 fixed bg-gradient-to-t from-[--gold] w-full transition-all flex justify-center ${
            quantity > 0 ? "bottom-0" : "-bottom-14"
          }`}
        >
          <Button
            variant="outline"
            className="border-2 relative bottom-3 w-[90%] max-w-[400px]"
          >
            {quantity} item{quantity > 1 ?? "s"} - ₱{total_cost}
          </Button>
        </div>
      </SheetTrigger>
      <SheetContent className="w-full grid grid-rows-[56px_1px_1fr_1px_25px_50px]">
        <SheetHeader>
          <SheetTitle>Order Summary</SheetTitle>
          <SheetDescription>Check your order...</SheetDescription>
        </SheetHeader>
        <CartOrderSubmission
          itemDetailsList={itemDetailsList}
          quantity={quantity}
          total_cost={total_cost}
        />
      </SheetContent>
    </Sheet>
  );
}
