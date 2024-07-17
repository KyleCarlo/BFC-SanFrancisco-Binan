"use client";
import { ItemDetailsList } from "@models/Cart";
import { ScrollArea } from "@components/ui/scroll-area";
import { Button } from "@components/ui/button";
import OrderForm from "./orderForm";
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
  const [orderConfirmed, setOrderConfirmed] = useState(false);
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
      <div className="-my-4 overflow-hidden flex justify-center relative">
        <ScrollArea
          className={`px-3 flex-grow h-full absolute  transition-all duration-500 ${
            orderConfirmed ? "right-[100%]" : "right-[0%]"
          }`}
        >
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
        <div
          className={`w-full h-full overflow-hiddens absolute transition-all duration-500 ${
            orderConfirmed ? "left-[0%]" : "left-[100%]"
          }`}
        >
          <OrderForm
            validated_quantity={validated_quantity}
            validated_total_cost={validated_total_cost}
          />
        </div>
      </div>
      <hr />
      <div className="grid grid-cols-[60%_20%_20%] justify-items-center px-3">
        <span className="justify-self-end">Total</span>
        <span className="text-bold">{validated_quantity}</span>
        <span className="text-bold">₱ {validated_total_cost}</span>
      </div>
      <div className="flex justify-center">
        <Button
          onClick={() => {
            if (!orderConfirmed) {
              const cart = localStorage.getItem("cart");
              if (cart) {
                const parsedCart = JSON.parse(cart);
                parsedCart.filter((index: number) => available_orders[index]);
                console.log(parsedCart);
                localStorage.setItem("cart", JSON.stringify(parsedCart));

                if (parsedCart.length > 0) {
                  setOrderConfirmed(true);
                }
              }
            }
          }}
        >
          {!orderConfirmed ? "Confirm Order" : "Send Order"}
        </Button>
      </div>
    </>
  );
}
