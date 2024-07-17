"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Order, OrderModel } from "@models/Order";
import { Form } from "@components/ui/form";
import OrderTypeField from "./orderType-field";
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
        <MOPField form={form} />
      </form>
    </Form>
  );
}
