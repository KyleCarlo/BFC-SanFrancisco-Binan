import { Beverage } from "@/src/models/Menu/Beverage";
import { Food } from "@/src/models/Menu/Food";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import { UseFormReturn } from "react-hook-form";

export default function NameField({
  form,
}: {
  form: UseFormReturn<Food | Beverage | any | undefined>;
}) {
  return (
    <FormField
      control={form.control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Item Name</FormLabel>
          <FormControl>
            <Input {...field} className="w-full relative bottom-1.5" />
          </FormControl>
          <FormMessage className="relative bottom-2.5" />
        </FormItem>
      )}
    />
  );
}
