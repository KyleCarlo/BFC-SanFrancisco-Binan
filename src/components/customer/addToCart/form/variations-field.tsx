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
  return (
    <FormField
      control={form.control}
      name="variation_id"
      render={({ field }) => (
        <FormItem className="flex-1">
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value.toString()}
              className="flex flex-col space-y-1"
            >
              {variations.map((variation) => {
                return (
                  <FormItem
                    className="flex items-center space-x-3 space-y-0 px-1 py-2"
                    key={variation.id}
                  >
                    <FormControl>
                      <RadioGroupItem value={variation.id.toString()} />
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
