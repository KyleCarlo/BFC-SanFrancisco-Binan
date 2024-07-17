import { UseFormReturn } from "react-hook-form";
import { Order } from "@models/Order";

export default function MOPField({ form }: { form: UseFormReturn<Order> }) {
  return (
    <>
      <h1>Mode of Payment</h1>
    </>
  );
}
