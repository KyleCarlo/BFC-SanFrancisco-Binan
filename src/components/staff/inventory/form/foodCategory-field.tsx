import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { capitalize } from "@lib/staff-utils";
import { FoodCategoryModel } from "@models/Menu/Food";
import { UseFormReturn } from "react-hook-form";
import { Beverage } from "@models/Menu/Beverage";
import { Food } from "@models/Menu/Food";

export default function FoodCategoryField({
  form,
}: {
  form: UseFormReturn<Food | Beverage | any | undefined>;
}) {
  return (
    <FormField
      control={form.control}
      name="category"
      render={({ field }) => (
        <FormItem className="flex-1">
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Food Category" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {Object.keys(FoodCategoryModel.Values).map((base) => {
                return (
                  <SelectItem key={base} value={base}>
                    {capitalize(base)}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <FormMessage className="relative bottom-1.5" />
        </FormItem>
      )}
    />
  );
}
