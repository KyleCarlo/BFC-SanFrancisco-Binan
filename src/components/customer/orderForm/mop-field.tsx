"use client";

import { UseFormReturn } from "react-hook-form";
import { Order } from "@models/Order";
import { useState, useEffect } from "react";
import { MOP } from "@models/MOP";
import {
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
  FormControl,
} from "@components/ui/form";
import getMOPs from "@/src/hooks/getMOPs";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";

export default function MOPField({ form }: { form: UseFormReturn<Order> }) {
  const [mops, setMops] = useState<MOP[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getMOPs(setMops, setLoading);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (
    form.watch("order_type") === "PickUpLater" &&
    form.watch("mop") === "Cash"
  ) {
    form.setValue("mop", (mops as MOP[])[0].bank_name);
  }

  return (
    <FormField
      control={form.control}
      name="mop"
      render={({ field }) => (
        <FormItem>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            value={form.getValues("mop")}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue
                  placeholder="Payment Mode"
                  defaultValue={field.value}
                />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {form.watch("order_type") !== "PickUpLater" && (
                <SelectItem value="Cash">Cash</SelectItem>
              )}
              {mops?.map((mop) => {
                return (
                  <SelectItem key={mop.id} value={mop.bank_name}>
                    {mop.bank_name}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
}
