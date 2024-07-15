"use client";
import { ItemDetailsList } from "@models/Cart";
import { ScrollArea } from "@components/ui/scroll-area";
import { Button } from "@components/ui/button";
import CartList from "./cart-list";
import verifyItemAvailability from "@hooks/verifyItemAvailability";
import { useEffect, useState } from "react";

export default function CartOrderSubmission({
  itemDetailsList,
  quantity,
  total_cost,
}: {
  itemDetailsList: ItemDetailsList;
  quantity: number;
  total_cost: number;
}) {
  const [validated_quantity, setValidatedQuantity] = useState(quantity);
  const [validated_total_cost, setValidatedTotalCost] = useState(total_cost);
  const [available_orders, setAvailableOrders] = useState<boolean[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    verifyItemAvailability(
      itemDetailsList,
      validated_quantity,
      validated_total_cost,
      setValidatedQuantity,
      setValidatedTotalCost,
      setAvailableOrders
    );
    setLoading(false);
  }, [itemDetailsList]);

  return (
    <>
      <hr className="-mb-2" />
      <ScrollArea className="px-3 -my-4">
        <div className="flex flex-col">
          {!loading ? (
            itemDetailsList.map((item, index) => {
              return (
                <CartList
                  key={item.id}
                  item={item}
                  available={available_orders[index]}
                />
              );
            })
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </ScrollArea>
      <hr />
      <div className="grid grid-cols-[60%_20%_20%] justify-items-center px-3">
        <span className="justify-self-end">Total</span>
        <span className="text-bold">{validated_quantity}</span>
        <span className="text-bold">₱ {validated_total_cost}</span>
      </div>
      <div className="flex justify-center">
        <Button onClick={() => {}}>Confirm Order</Button>
      </div>
    </>
  );
}
