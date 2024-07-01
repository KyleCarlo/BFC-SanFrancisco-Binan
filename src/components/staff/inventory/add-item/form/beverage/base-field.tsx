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
import { capitalize } from "@lib/utils";
import { BeverageBaseModel } from "@models/Menu/Beverage";

export default function BeverageBaseField(form: any) {
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
