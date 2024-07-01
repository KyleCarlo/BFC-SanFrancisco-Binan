import {
  FormField,
  FormItem,
  FormMessage,
  FormControl,
} from "@components/ui/form";
import { Input } from "@components/ui/input";

export default function ServingField({
  form,
  index,
}: {
  form: any;
  index: number;
}) {
  return (
    <FormField
      control={form.control}
      name={`variations.${index}.serving`}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormControl>
            <Input {...field} className="w-full" placeholder="Serving" />
          </FormControl>
          <FormMessage className="relative bottom-2" />
        </FormItem>
      )}
    />
  );
}
