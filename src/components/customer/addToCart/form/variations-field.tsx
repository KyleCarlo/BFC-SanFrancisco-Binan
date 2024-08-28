"use client";

import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "@components/ui/form";
import { CartItem } from "@models/Cart";
import { UseFormReturn } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@components/ui/radio-group";
import { BeverageVariation } from "@models/Menu/Beverage";
import { FoodVariation } from "@models/Menu/Food";
import { inferTemperatureEmoji } from "@lib/customer-utils";

export default function VariationsField({
  form,
  variations,
}: {
  form: UseFormReturn<CartItem | any | undefined>;
  variations: BeverageVariation[] | FoodVariation[];
}) {
  const defaultValue = variations
    .find((variation) => variation.available)
    ?.id.toString();

  return (
    <FormField
      control={form.control}
      name="variation_id"
      render={({ field }) => (
        <FormItem className="flex-1">
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={defaultValue}
              className="flex flex-col space-y-1"
            >
              {variations.map((variation) => {
                return (
                  <div className="relative" key={variation.id}>
                    {!variation.available && (
                      <>
                        <p className="z-10 absolute text-red-700 w-full top-[calc(50%-0.8rem)] text-bold tracking-[5px] text-center opacity-50">
                          Not Available
                        </p>
                        <hr className="absolute w-[90%] top-1/2 border-white opacity-50" />
                      </>
                    )}
                    <FormItem
                      className={`flex items-center space-x-3 space-y-0 px-1 py-2 ${
                        !variation.available && "opacity-50"
                      }`}
                    >
                      <FormControl>
                        <RadioGroupItem
                          value={variation.id.toString()}
                          disabled={!variation.available}
                        />
                      </FormControl>
                      <FormLabel className="font-normal flex justify-between items-center w-full">
                        <span className="flex-1 text-sm font-semibold pr-2">
                          {variation.serving}
                        </span>
                        <span className="w-24">
                          {(variation as BeverageVariation).concentrate
                            ? "Concentrate"
                            : (variation as BeverageVariation).hot_cold}

                          {inferTemperatureEmoji(
                            (variation as BeverageVariation).hot_cold,
                            (variation as BeverageVariation).concentrate
                          )}
                        </span>
                        <span className="text-sm font-normal flex-1 text-nowrap flex justify-end">
                          <div className="w-[80px]">₱ {variation.price}</div>
                        </span>
                      </FormLabel>
                    </FormItem>
                  </div>
                );
              })}
            </RadioGroup>
          </FormControl>
          <FormMessage className="relative bottom-1.5" />
        </FormItem>
      )}
    />
  );
}
