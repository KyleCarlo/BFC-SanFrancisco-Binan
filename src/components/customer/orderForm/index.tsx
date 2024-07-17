"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Order, OrderModel } from "@models/Order";
import { Form } from "@components/ui/form";
import OrderTypeField from "./orderType-field";
import ScheduleField from "./schedule-field";
import MOPField from "./mop-field";

export default function OrderForm({
  validated_quantity,
  validated_total_cost,
}: {
  validated_quantity: number;
  validated_total_cost: number;
}) {
  const form = useForm<Order>({
    resolver: zodResolver(OrderModel),
    defaultValues: {
      total_num: validated_quantity,
      total_price: validated_total_cost,
    },
  });
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => {
          console.log(values);
        })}
      >
        <OrderTypeField form={form} />
        <hr />
        <div className="grid grid-cols-2 gap-2 py-2">
          <div className="pl-2">
            <MOPField form={form} />
          </div>
          <div className="pr-2">
            <ScheduleField />
          </div>
        </div>
        <hr />
      </form>
    </Form>
  );
}
