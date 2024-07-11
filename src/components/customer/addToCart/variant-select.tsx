"use client";

import { CartItem } from "@models/Cart";
import { Beverage, BeverageVariation } from "@models/Menu/Beverage";
import { Food } from "@models/Menu/Food";
import { useItemTypeContext } from "@context/itemType";
import AddToCartSheet from "./form-sheet";
import { inferTemperatureEmoji } from "@lib/customer-utils";

export default function VariantSelect({
  item,
  cartItem,
}: {
  item: Beverage | Food;
  cartItem: CartItem;
}) {
  const { itemType } = useItemTypeContext();
  const variation = item.variations.find(
    (variation) => variation.id === cartItem.variation_id
  );

  const price = cartItem.quantity * (variation?.price as number);

  return (
    <AddToCartSheet
      item={item}
      fullWidth={true}
      defaultCartItem={cartItem}
      formType="update"
    >
      <div className="px-2 py-2 cursor-pointer">
        <div className="grid grid-cols-[1fr_80px_80px]">
          <div className="flex flex-col items-start">
            <h1>
              {`${variation?.serving} ${
                (variation as BeverageVariation).hot_cold ?? ""
              } ${inferTemperatureEmoji(
                (variation as BeverageVariation).hot_cold,
                (variation as BeverageVariation).concentrate
              )}`}
            </h1>
            {itemType === "beverage" &&
              ((variation as BeverageVariation).concentrate == true ? (
                <p className="text-xs text-gray-400">Concentrate</p>
              ) : (
                <p className="text-xs text-gray-400">
                  {cartItem.sugar_level} Sugar Level
                </p>
              ))}
            <p className="text-xs text-gray-400">
              Unit Price: {variation?.price}
            </p>
          </div>
          <p className="justify-self-center flex items-center justify-center">
            <span className="w-7 h-7 rounded-full flex items-center justify-center border border-gold text-xs">
              {cartItem.quantity}
            </span>
          </p>
          <p className=" text-nowrap w-16 justify-self-end flex items-center justify-start text-sm">
            ₱ {price}
          </p>
        </div>
      </div>
    </AddToCartSheet>
  );
}
