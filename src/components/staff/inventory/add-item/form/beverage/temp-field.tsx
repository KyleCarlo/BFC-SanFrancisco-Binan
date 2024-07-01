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

import { capitalize } from "@lib/utils";

import { BeverageHotColdModel } from "@models/Menu/Beverage";

export default function BeverageTempField({
  form,
  index,
}: {
  form: any;
  index: number;
}) {
  return (
    <FormField
      control={form.control}
      name={`variations.${index}.hot_cold`}
      render={({ field }) => (
        <FormItem className="flex-1">
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="h-9">
                <SelectValue placeholder="Temp" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {Object.keys(BeverageHotColdModel.Values).map((temp) => {
                return (
                  <SelectItem key={temp} value={temp}>
                    {capitalize(temp)}
                  </SelectItem>
                );
              })}
              <SelectItem value="none">None</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage className="relative bottom-2" />
        </FormItem>
      )}
    />
  );
}
