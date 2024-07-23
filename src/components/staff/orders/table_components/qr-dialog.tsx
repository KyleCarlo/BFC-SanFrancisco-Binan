"use client";

import { ReactNode } from "react";
import { Button } from "@components/ui/button";
import { QrReader } from "react-qr-reader";
import { Result } from "@zxing/library";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";
import { Order } from "@models/Order";
import updateOrderEnd from "@/src/hooks/updateOrderEnd";
import { useState, useEffect } from "react";
import { set } from "zod";

export default function ActionsDialog({
  children,
  order,
}: {
  children: ReactNode;
  order: Order;
}) {
  const [open, setOpen] = useState(false);
  const [scanResult, setScanResult] = useState<string>("");
  const onResult = (result: Result | null | undefined) => {
    if (result) {
      if (result.getText() === order.id) {
        setOpen(false);
        setScanResult(result.getText());
      }
    }
  };

  useEffect(() => {
    if (scanResult === order.id) updateOrderEnd(order, "Received");
  }, [scanResult, order]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Code Check</DialogTitle>
          <DialogDescription>
            Cross check the order ID with the QR code or manually verify.
          </DialogDescription>
        </DialogHeader>
        <QrReader
          constraints={{ facingMode: "environment" }}
          onResult={onResult}
        />
        <DialogFooter>
          <Button
            onClick={() => {
              updateOrderEnd(order, "Received");
            }}
          >
            Verify
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
