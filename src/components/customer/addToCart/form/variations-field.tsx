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
                    className="flex items-center space-x-3 space-y-0 px-1"
                    key={variation.id}
                  >
                    <FormControl>
                      <RadioGroupItem value={variation.id.toString()} />
                    </FormControl>
                    <FormLabel className="font-normal flex justify-between items-baseline w-full">
                      <span className="flex-1 text-sm font-semibold">
                        {variation.serving}
                      </span>
                      <span className="flex-1">
                        {(variation as BeverageVariation).concentrate
                          ? "Concentrate"
                          : (variation as BeverageVariation).hot_cold}

                        {!(variation as BeverageVariation).concentrate &&
                        (
                          variation as BeverageVariation
                        ).hot_cold?.toLowerCase() === "hot"
                          ? " 🔥"
                          : (
                              variation as BeverageVariation
                            ).hot_cold?.toLowerCase() === "cold"
                          ? " ❄️"
                          : ""}
                      </span>
                      <span className="text-sm font-normal pl-2 w-14 text-nowrap">
                        ₱ {variation.price}
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
