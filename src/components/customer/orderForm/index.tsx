"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Order, OrderModel } from "@models/Order";
import { Form } from "@components/ui/form";
import OrderTypeField from "./orderType-field";
import ScheduleField from "./schedule-field";
import MOPField from "./mop-field";
import { PersonalDetailsField } from "./pID-field";
import { Cart } from "@models/Cart";
import { MOP } from "@models/MOP";
import { RefObject, useEffect, useState } from "react";
import { customerUppy } from "@lib/uppy-config";
import QRField from "./QRField";
import getMOPs from "@hooks/getMOPs";
import { ScrollArea } from "@components/ui/scroll-area";
import addOrder from "@hooks/addOrder";
import { useRouter } from "next/navigation";
import socket from "@lib/socket";

export default function OrderForm({
  formRef,
  validated_quantity,
  validated_total_cost,
}: {
  formRef: RefObject<HTMLFormElement>;
  validated_quantity: number;
  validated_total_cost: number;
}) {
  const [mops, setMops] = useState<MOP[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [uppy] = useState(customerUppy);
  const router = useRouter();

  useEffect(() => {
    getMOPs(setMops, setLoading);
    uppy.clearUploadedFiles();
  }, []);

  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
      setIsConnected(true);
    });
    socket.on("connect_error", (error) => {
      console.log("connect_error", error.message);
      setIsConnected(false);
      setError(`${error.message}. Try to Refresh the Page.`);
    });
    return () => {
      socket.off("connect");
      socket.off("connect_error");
    };
  }, []);

  useEffect(() => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      form.setValue("items", JSON.parse(cart) as Cart);
    }
  });

  const form = useForm<Order>({
    resolver: zodResolver(OrderModel),
    defaultValues: {
      status: "Incoming",
      total_num: validated_quantity,
      total_price: validated_total_cost,
      mop: "",
    },
  });

  return (
    <Form {...form}>
      <form
        ref={formRef}
        onSubmit={form.handleSubmit((values) => {
          addOrder(values, uppy, router, isConnected, error);
        })}
        className="h-full"
      >
        <ScrollArea className="h-full px-3">
          <OrderTypeField form={form} pickUpLater={mops.length > 0} />
          <hr />
          <div className="grid grid-cols-2 gap-2 py-2">
            <div className="pl-2">
              <MOPField form={form} mops={mops} />
            </div>
            <div className="pr-2">
              <ScheduleField form={form} />
            </div>
          </div>
          <hr />
          {loading && <div>Loading...</div>}
          {!loading && form.watch("mop") && (
            <QRField form={form} mops={mops} uppy={uppy} />
          )}
          <hr />
          <h1 className="-mb-2 text-bold mt-1">Contact Info</h1>
          <PersonalDetailsField form={form} />
        </ScrollArea>
      </form>
    </Form>
  );
}
