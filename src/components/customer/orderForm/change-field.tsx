import { UseFormReturn } from "react-hook-form";
import { Order } from "@models/Order";
import {
  FormField,
  FormItem,
  FormControl,
  FormLabel,
} from "@components/ui/form";
import { Input } from "@components/ui/input";

export default function PaymentChangeField({
  form,
}: {
  form: UseFormReturn<Order>;
}) {
  return (
    <FormField
      control={form.control}
      name="payment_change"
      render={({ field }) => {
        return (
          <FormItem className="grid grid-cols-[0px_1fr] items-center px-2 py-1">
            <FormLabel className="pl-2 text-nowrap">Change For</FormLabel>
            <FormControl>
              <Input
                {...field}
                type="number"
                className="pl-[90px] w-full relative bottom-1"
                autoComplete="false"
                placeholder="How Much"
              />
            </FormControl>
          </FormItem>
        );
      }}
    />
  );
}
