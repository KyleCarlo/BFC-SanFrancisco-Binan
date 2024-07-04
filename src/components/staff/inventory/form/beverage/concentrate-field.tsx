import {
  FormField,
  FormControl,
  FormItem,
  FormMessage,
} from "@components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { Beverage } from "@models/Menu/Beverage";
import { Food } from "@models/Menu/Food";

export default function BeverageConcentrateField({
  form,
  index,
}: {
  form: UseFormReturn<Food | Beverage | any | undefined>;
  index: number;
}) {
  return (
    <FormField
      control={form.control}
      name={`variations.${index}.concentrate`}
      render={({ field }) => (
        <FormItem>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value ?? "false"}
          >
            <FormControl>
              <SelectTrigger className="h-9">
                <SelectValue placeholder="Concentrate" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="true">Concentrate</SelectItem>
              <SelectItem value="false">Normal</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage className="relative bottom-2" />
        </FormItem>
      )}
    />
  );
}
