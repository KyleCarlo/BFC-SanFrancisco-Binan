"use client";

import Image from "next/image";
import { inferTemperatureEmoji } from "@lib/customer-utils";
import { OrderTicketList } from "@models/OrderTicket";
import { ScrollArea } from "@components/ui/scroll-area";
import { Button } from "@components/ui/button";

export default function CartOrderSubmission({
  orderList,
  quantity,
  total_cost,
}: {
  orderList: OrderTicketList;
  quantity: number;
  total_cost: number;
}) {
  return (
    <>
      <hr className="mt-3" />
      <ScrollArea className="p-3 flex-grow h-[70dvh]">
        <div className="flex flex-col">
          {orderList.map((item) => {
            return (
              <>
                <div
                  key={item.id}
                  className="grid grid-cols-[25%_35%_20%_20%] justify-items-center items-center"
                >
                  <div className="w-full relative pt-[100%]">
                    <Image
                      fill={true}
                      src={item.image}
                      alt={`Image of ${item.name}`}
                      className="w-full h-full top-0 left-0 object-cover rounded-md"
                    />
                  </div>
                  <div className="text-left">
                    <h1 className="text-gold">{item.name}</h1>
                    {item.itemType === "beverage" && (
                      <>
                        <p className="text-gray-400 text-xs">
                          {item.hot_cold ?? "Concentrate"}{" "}
                          {inferTemperatureEmoji(
                            item?.hot_cold as "hot" | "cold",
                            item.concentrate
                          )}
                        </p>
                        <p className="text-gray-400 text-xs">
                          {item.concentrate
                            ? ""
                            : `${item.sugar_level} Sugar Level`}
                        </p>
                      </>
                    )}
                    <p className="text-gray-400 text-xs">
                      {item.serving} - ₱{item.price}
                    </p>
                  </div>
                  <div>
                    <span>{item.quantity}</span>
                  </div>
                  <div>₱ {item.quantity * item.price}</div>
                </div>
                <hr />
              </>
            );
          })}
        </div>
      </ScrollArea>
      <hr />
      <div className="grid grid-cols-[60%_20%_20%] justify-items-center px-3 py-3">
        <span className="justify-self-end">Total</span>
        <span className="text-bold">{quantity}</span>
        <span className="text-bold">₱ {total_cost}</span>
      </div>
      <div className="flex justify-center">
        <Button>Confirm Order</Button>
      </div>
    </>
  );
}
