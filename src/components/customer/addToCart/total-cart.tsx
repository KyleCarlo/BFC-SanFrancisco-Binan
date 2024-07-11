"use client";
import { Button } from "@components/ui/button";
import { useCartContext } from "@context/cart";
import { Beverage } from "@models/Menu/Beverage";
import { Food } from "@models/Menu/Food";
import { getCartTotal } from "@lib/customer-utils";
import Link from "next/link";

export default function TotalCart({
  food,
  beverage,
}: {
  food: Food[];
  beverage: Beverage[];
}) {
  const { cart } = useCartContext();
  const { quantity, total_cost } = getCartTotal(food, beverage, cart);
  return (
    <div
      className={`h-11 fixed bg-gradient-to-t from-[--gold] min-w-full transition-all ${
        quantity > 0 ? "bottom-0" : "-bottom-14"
      }`}
    >
      <Link href="/order/cart" className="flex items-center justify-center ">
        <Button
          variant="outline"
          className="border-2 relative bottom-3 w-[90%]"
        >
          {quantity} items - ₱{total_cost}
        </Button>
      </Link>
    </div>
  );
}
