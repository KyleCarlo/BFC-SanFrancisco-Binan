import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@components/ui/form";
import { Textarea } from "@components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { Beverage } from "@models/Menu/Beverage";
import { Food } from "@models/Menu/Food";

export default function Description({
  form,
}: {
  form: UseFormReturn<Food | Beverage | any | undefined>;
}) {
  return (
    <FormField
      control={form.control}
      name="description"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Description</FormLabel>
          <FormControl>
            <Textarea
              placeholder="Create a description for the item."
              className="resize-none relative bottom-1.5"
              {...field}
            />
          </FormControl>
          <FormMessage className="relative bottom-2.5" />
        </FormItem>
      )}
    />
  );
}
