"use client";

import { Button } from "@components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@components/ui/dialog";
import { Result } from "@zxing/library";
import { useState, useEffect, useRef } from "react";
import { QrReader } from "react-qr-reader";
import { Input } from "@components/ui/input";
import customerAvail from "@hooks/customerAvail";
import { toast } from "sonner";
import socket from "@lib/socket";

export default function RewardsDialog() {
  const [open, setOpen] = useState(false);
  const [scanResult, setScanResult] = useState<string>("");
  const inputIDRef = useRef<HTMLInputElement>(null);
  const inputVoucherIDRef = useRef<HTMLInputElement>(null);
  const onResult = (result: Result | null | undefined) => {
    if (result) {
      if (result.getText()) {
        setScanResult(result.getText());
      } else {
        toast.error("Invalid QR Code");
      }
    }
  };

  useEffect(() => {
    if (scanResult && scanResult.length > 0) {
      customerAvail(scanResult, setOpen, true);
    }
  }, [scanResult]);

  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="lg" className="text-gold">
          Rewards Avail
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Voucher Claiming</DialogTitle>
          <DialogDescription>
            Scan the QR code or manually verify the voucher and customer ID.
          </DialogDescription>
        </DialogHeader>
        <QrReader
          constraints={{ facingMode: "environment" }}
          onResult={onResult}
          className="mt-[-45px] mb-[-40px]"
        />
        <Input
          placeholder="Enter Voucher ID"
          className="w-full z-10 mb-[-10px]"
          ref={inputVoucherIDRef}
        />
        <Input
          placeholder="Enter Customer ID"
          className="w-full z-10"
          ref={inputIDRef}
        />
        <DialogFooter>
          <Button
            onClick={() => {
              const customerID = inputIDRef.current?.value;
              const voucherID = inputVoucherIDRef.current?.value;
              if (
                customerID &&
                voucherID &&
                customerID.length > 0 &&
                voucherID.length > 0
              ) {
                const voucher_details = JSON.stringify({
                  id: voucherID,
                  customer_id: customerID,
                });
                customerAvail(voucher_details, setOpen);
              }
            }}
          >
            Verify
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
