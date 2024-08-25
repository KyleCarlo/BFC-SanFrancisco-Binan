"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Order, OrderModel } from "@models/Order";
import { Form } from "@components/ui/form";
import OrderTypeField from "./orderType-field";
import ScheduleField from "./schedule-field";
import MOPField from "./mop-field";
import PaymentChangeField from "./change-field";
import PersonalDetailsField from "./pID-field";
import { Cart } from "@models/Cart";
import { MOP } from "@models/MOP";
import {
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { customerUppy } from "@lib/uppy-config";
import QRField from "./QRField";
import UploadDialog from "./upload-field";
import getMOPs from "@hooks/getMOPs";
import { ScrollArea } from "@components/ui/scroll-area";
import { useRouter } from "next/navigation";
import socket from "@lib/socket";
import { OrderDiscount } from "@models/Order";
import addOrder from "@hooks/addOrder";

export default function OrderForm({
  formRef,
  validated_quantity,
  validated_total_cost,
  discountType,
  discountAmount,
  setPauseButton,
}: {
  formRef: RefObject<HTMLFormElement>;
  validated_quantity: number;
  validated_total_cost: number;
  discountType: OrderDiscount | undefined;
  discountAmount: number;
  setPauseButton: Dispatch<SetStateAction<boolean>>;
}) {
  const [mops, setMops] = useState<MOP[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [uppy_receipt] = useState(customerUppy());
  const [discountUploaded, setDiscountUploaded] = useState(false);
  const [receiptUploaded, setReceiptUploaded] = useState(false);
  const [uppy_discount] = useState(customerUppy());
  const router = useRouter();

  useEffect(() => {
    getMOPs(setMops, setLoading);
    uppy_receipt.clearUploadedFiles();
  }, []);

  useEffect(() => {
    uppy_discount.on("files-added", () => {
      setDiscountUploaded(true);
    });
    uppy_discount.on("file-removed", () => {
      setDiscountUploaded(false);
    });

    return () => {
      uppy_discount.off("files-added", () => {});
      uppy_discount.off("file-removed", () => {});
    };
  });

  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });
    socket.on("connect_error", (error) => {
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
      total_price: validated_total_cost,
      total_num: validated_quantity,
      mop: "",
    },
  });

  return (
    <Form {...form}>
      <form
        ref={formRef}
        onSubmit={form.handleSubmit((values) => {
          values.total_price = validated_total_cost;
          values.total_num = validated_quantity;
          if (discountType) {
            values.discount = discountType;
            values.total_price -= discountAmount;
          }
          addOrder(
            values,
            uppy_receipt,
            uppy_discount,
            router,
            isConnected,
            error,
            setDiscountUploaded,
            setReceiptUploaded,
            setPauseButton
          );
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
            {discountType && (
              <UploadDialog
                uppy={uppy_discount}
                triggerMessage={`Upload ${discountType} ID ${
                  discountUploaded ? "✅" : ""
                }`}
                title={`${discountType} ID`}
                description={`Upload your ${discountType} ID here.`}
                className="col-span-2 mx-2"
              />
            )}
          </div>
          {loading && <div>Loading...</div>}
          {!loading && form.watch("mop") && form.watch("mop") !== "Cash" && (
            <>
              <hr />
              <QRField
                form={form}
                mops={mops}
                uppy={uppy_receipt}
                receiptUploaded={receiptUploaded}
                setReceiptUploaded={setReceiptUploaded}
              />
            </>
          )}
          {!loading && form.watch("mop") && form.watch("mop") === "Cash" && (
            <>
              <hr />
              <PaymentChangeField form={form} />
            </>
          )}
          <hr />
          <h1 className="-mb-2 text-bold mt-1">Contact Info</h1>
          <PersonalDetailsField form={form} />
        </ScrollArea>
      </form>
    </Form>
  );
}
