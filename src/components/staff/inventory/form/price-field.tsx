import {
  FormField,
  FormItem,
  FormMessage,
  FormControl,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { Beverage } from "@models/Menu/Beverage";
import { Food } from "@models/Menu/Food";

export default function PriceField({
  form,
  index,
}: {
  form: UseFormReturn<Food | Beverage | any | undefined>;
  index: number;
}) {
  return (
    <FormField
      control={form.control}
      name={`variations.${index}.price`}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormControl>
            <Input {...field} className="w-full" placeholder="Price" />
          </FormControl>
          <FormMessage className="relative bottom-2" />
        </FormItem>
      )}
    />
  );
}
