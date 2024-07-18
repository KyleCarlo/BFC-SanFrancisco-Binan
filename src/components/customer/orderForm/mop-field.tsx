"use client";

import { UseFormReturn } from "react-hook-form";
import { Order } from "@models/Order";
import { useState, useEffect } from "react";
import { MOP } from "@models/MOP";
import { FormField, FormItem, FormControl } from "@components/ui/form";
import getMOPs from "@/src/hooks/getMOPs";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";

export default function MOPField({
  form,
  mops,
}: {
  form: UseFormReturn<Order>;
  mops: MOP[];
}) {
  if (
    form.watch("order_type") === "PickUpLater" &&
    form.watch("mop") === "Cash"
  ) {
    form.setValue("mop", mops[0].bank_name);
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
              <SelectTrigger className={form.watch("mop") && "border-gold"}>
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
