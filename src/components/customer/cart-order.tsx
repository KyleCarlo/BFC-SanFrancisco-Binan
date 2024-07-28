"use client";
import { ItemDetailsList, Cart } from "@models/Cart";
import { ScrollArea } from "@components/ui/scroll-area";
import { Button } from "@components/ui/button";
import OrderForm from "./orderForm";
import CartList from "@components/customer/cart-list";
import verifyItemAvailability from "@hooks/verifyItemAvailability";
import { useEffect, useState, useRef } from "react";
import { toast } from "sonner";
import { getAllAvailableItems } from "@/src/lib/customer-utils";

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
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    verifyItemAvailability(
      itemDetailsList,
      validated_quantity,
      validated_total_cost,
      setValidatedQuantity,
      setValidatedTotalCost,
      setAvailableOrders,
      setLoading
    );
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
            formRef={formRef}
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
            if (
              !orderConfirmed &&
              !loading &&
              validated_quantity > 0 &&
              validated_total_cost > 0
            ) {
              const cart = localStorage.getItem("cart");
              if (cart) {
                const parsedCart = JSON.parse(cart) as Cart;
                const newCart = getAllAvailableItems(
                  parsedCart,
                  available_orders
                );
                localStorage.setItem("cart", JSON.stringify(newCart));

                if (parsedCart.length > 0) {
                  setOrderConfirmed(true);
                }
              }
            } else if (orderConfirmed) {
              if (formRef.current) {
                formRef.current.dispatchEvent(
                  new Event("submit", { cancelable: true, bubbles: true })
                );
              }
            }

            if (validated_quantity <= 0 || validated_total_cost <= 0) {
              toast.warning("Invalid Cart. Please Check Your Cart.");
            }
          }}
        >
          {!orderConfirmed ? "Confirm Order" : "Send Order"}
        </Button>
      </div>
    </>
  );
}
