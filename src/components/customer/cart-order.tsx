"use client";

import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@components/ui/sheet";
import { ItemDetailsList, Cart, ItemDetails } from "@models/Cart";
import { ScrollArea } from "@components/ui/scroll-area";
import { Button } from "@components/ui/button";
import OrderForm from "./orderForm";
import CartList from "@components/customer/cart-list";
import verifyItemAvailability from "@hooks/verifyItemAvailability";
import { useEffect, useState, useRef } from "react";
import { toast } from "sonner";
import { getAllAvailableItems } from "@lib/customer-utils";
import { Info } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/ui/popover";
import { OrderDiscount } from "@models/Order";

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
  const [discountType, setDiscountType] = useState<OrderDiscount>();
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pauseButton, setPauseButton] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    verifyItemAvailability(
      itemDetailsList,
      validated_quantity,
      validated_total_cost,
      setValidatedQuantity,
      setValidatedTotalCost,
      setAvailableOrders,
      setDiscountAmount,
      setLoading
    );
  }, [itemDetailsList]);

  return (
    <>
      <SheetHeader>
        <div className="relative flex justify-center w-full">
          <SheetTitle
            className={`transition-all duration-500 ${
              !orderConfirmed ? "opacity-100" : "opacity-0"
            }`}
          >
            Order Summary
          </SheetTitle>
          <SheetTitle
            className={`absolute w-full text-center transition-all duration-500 ${
              !orderConfirmed ? "opacity-0" : "opacity-100"
            }`}
          >
            Checkout
          </SheetTitle>
        </div>
        <div className="relative flex justify-center">
          <SheetDescription
            className={`transition-all duration-500 ${
              !orderConfirmed ? "opacity-100" : "opacity-0"
            }`}
          >
            Check your order...
          </SheetDescription>
          <SheetDescription
            className={`absolute text-center w-full transition-all duration-500 ${
              !orderConfirmed ? "opacity-0" : "opacity-100"
            }`}
          >
            Fill out the form to complete your order.
          </SheetDescription>
        </div>
      </SheetHeader>
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
            discountType={discountType}
            discountAmount={discountAmount}
            setPauseButton={setPauseButton}
          />
        </div>
      </div>
      <hr />
      <div className="grid grid-cols-[40%_20%_20%_20%] justify-items-center px-3">
        <span className="flex gap-2 items-center">
          <Popover>
            <PopoverTrigger>
              <Info className="text-[--gray]" />
            </PopoverTrigger>
            <PopoverContent side="top" className="w-[180px] p-3">
              <p className="text-justify">
                Discount will apply to 1 order with highest price.
              </p>
            </PopoverContent>
          </Popover>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger>
              <Button variant="secondary">{discountType ?? "Discount"}</Button>
            </PopoverTrigger>
            <PopoverContent
              side="top"
              className="max-w-min text-nowrap flex gap-2"
            >
              <Button
                variant="secondary"
                onClick={() => {
                  if (discountType === "Senior") setDiscountType(undefined);
                  else setDiscountType("Senior");
                  setOpen(false);
                }}
              >
                {discountType === "Senior" ? "None" : "Senior"}
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  if (discountType === "PWD") setDiscountType(undefined);
                  else setDiscountType("PWD");
                  setOpen(false);
                }}
              >
                {discountType === "PWD" ? "None" : "PWD"}
              </Button>
            </PopoverContent>
          </Popover>
        </span>
        <span className="justify-self-end">Less</span>
        <span className="text-bold"></span>
        <span
          className={`text-bold justify-self-end ${
            discountType !== undefined && "text-gold"
          }`}
        >
          {discountType !== undefined ? `-${discountAmount.toFixed(2)}` : "0"}
        </span>
      </div>
      <div className="grid grid-cols-[60%_20%_20%] justify-items-center px-3">
        <span className="justify-self-end">Total</span>
        <span className="text-bold">{validated_quantity}</span>
        <div
          className={`flex flex-col ${
            discountType !== undefined && "relative bottom-3 leading-none"
          }`}
        >
          <span
            className={`text-bold text-nowrap ${
              discountType !== undefined &&
              "line-through text-xs text-end text-[--gray]"
            }`}
          >
            ₱ {validated_total_cost.toFixed(2)}
          </span>
          {discountType !== undefined && (
            <span className="text-bold text-nowrap">
              ₱ {(validated_total_cost - discountAmount).toFixed(2)}
            </span>
          )}
        </div>
      </div>
      <div className="flex justify-center">
        <Button
          onClick={() => {
            if (pauseButton) toast.warning("Please Wait...");
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
                if (!pauseButton)
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
          {!orderConfirmed
            ? "Confirm Order"
            : !pauseButton
            ? "Send Order"
            : "Please Wait..."}
        </Button>
      </div>
    </>
  );
}
