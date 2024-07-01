import {
  FormField,
  FormItem,
  FormMessage,
  FormControl,
} from "@components/ui/form";
import { Input } from "@components/ui/input";

export default function PriceField({
  form,
  index,
}: {
  form: any;
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
