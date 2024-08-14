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
import { parseBeverageBase } from "@lib/utils";
import { BeverageBaseModel } from "@models/Menu/Beverage";
import { UseFormReturn } from "react-hook-form";
import { Beverage } from "@models/Menu/Beverage";
import { Food } from "@models/Menu/Food";

export default function BeverageBaseField({
  form,
}: {
  form: UseFormReturn<Food | Beverage | any | undefined>;
}) {
  return (
    <FormField
      control={form.control}
      name="base"
      render={({ field }) => (
        <FormItem className="flex-1">
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Beverage Base" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {Object.keys(BeverageBaseModel.Values).map((base) => {
                return (
                  <SelectItem key={base} value={base}>
                    {parseBeverageBase(base)}
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
