"use client";

import Image from "next/image";
import { inferTemperatureEmoji } from "@lib/customer-utils";
import { OrderTicket } from "@models/OrderTicket";

export default function CartList({
  item,
  available,
}: {
  item: OrderTicket;
  available: boolean;
}) {
  return (
    <>
      <div
        className={`grid grid-cols-[25%_35%_20%_20%] justify-items-center items-center ${
          !available && "opacity-40"
        }`}
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
                {item.concentrate ? "" : `${item.sugar_level} Sugar Level`}
              </p>
            </>
          )}
          <p className="text-gray-400 text-xs">
            {item.serving} - ₱{item.price}
          </p>
        </div>
        <div>
          <span className={`${!available && "line-through"}`}>
            {item.quantity}
          </span>
        </div>
        <div className={`${!available && "line-through"}`}>
          ₱ {item.quantity * item.price}
        </div>
        {!available && (
          <p className="absolute text-bolder text-red-700 tracking-widest rotate-12">
            ITEM NOT AVAILABLE
          </p>
        )}
      </div>
      <hr />
    </>
  );
}
