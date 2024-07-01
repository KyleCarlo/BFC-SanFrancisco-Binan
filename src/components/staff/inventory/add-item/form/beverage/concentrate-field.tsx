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

export default function BeverageConcentrateField({
  form,
  index,
}: {
  form: any;
  index: number;
}) {
  return (
    <FormField
      control={form.control}
      name={`variations.${index}.concentrate`}
      render={({ field }) => (
        <FormItem>
          <Select onValueChange={field.onChange} defaultValue={"false"}>
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
