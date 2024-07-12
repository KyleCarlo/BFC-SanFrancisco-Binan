"use client";

import Image from "next/image";
import { inferTemperatureEmoji } from "@lib/customer-utils";
import { OrderTicket } from "@models/OrderTicket";

export default function CartList({ item }: { item: OrderTicket }) {
  return (
    <>
      <div className="grid grid-cols-[25%_35%_20%_20%] justify-items-center items-center">
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
                {item.concentrate ? "" : `${item.sugar_level} Sugar Level`}
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
}
