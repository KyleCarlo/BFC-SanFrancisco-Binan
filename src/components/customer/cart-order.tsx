"use client";
import { OrderTicketList } from "@models/OrderTicket";
import { ScrollArea } from "@components/ui/scroll-area";
import { Button } from "@components/ui/button";
import CartList from "./cart-list";
import verifyItemAvailability from "@hooks/verifyItemAvailability";
import { useEffect, useState } from "react";

export default function CartOrderSubmission({
  orderList,
  quantity,
  total_cost,
}: {
  orderList: OrderTicketList;
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
      orderList,
      validated_quantity,
      validated_total_cost,
      setValidatedQuantity,
      setValidatedTotalCost,
      setAvailableOrders
    );
    setLoading(false);
  }, [orderList]);

  return (
    <>
      <hr className="mt-3" />
      <ScrollArea className="p-3 flex-grow h-[70dvh]">
        <div className="flex flex-col">
          {!loading ? (
            orderList.map((item, index) => {
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
      <div className="grid grid-cols-[60%_20%_20%] justify-items-center px-3 py-3">
        <span className="justify-self-end">Total</span>
        <span className="text-bold">{validated_quantity}</span>
        <span className="text-bold">₱ {validated_total_cost}</span>
      </div>
      <div className="flex justify-center">
        <Button>Confirm Order</Button>
      </div>
    </>
  );
}
