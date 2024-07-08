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
                    className="flex items-center space-x-3 space-y-0 px-4"
                    key={variation.id}
                  >
                    <FormControl>
                      <RadioGroupItem value={variation.id.toString()} />
                    </FormControl>
                    <FormLabel className="font-normal flex justify-between w-full">
                      <span className="text-sm font-semibold">
                        {variation.serving}
                      </span>
                      <span className="text-sm font-normal w-12 text-nowrap">
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
