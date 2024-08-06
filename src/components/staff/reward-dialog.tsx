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

export default function RewardDialog() {
  const [open, setOpen] = useState(false);
  const [scanResult, setScanResult] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="lg" className="text-gold">
          Customer Rewards
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Customer ID</DialogTitle>
          <DialogDescription>
            Scan the QR code or manually verify the customer ID.
          </DialogDescription>
        </DialogHeader>
        <QrReader
          constraints={{ facingMode: "environment" }}
          onResult={onResult}
          className="mt-[-45px] mb-[-40px]"
        />
        <Input
          placeholder="Enter Customer ID"
          className="w-full z-10"
          ref={inputRef}
        />
        <DialogFooter>
          <Button
            onClick={() => {
              const customerID = inputRef.current?.value;
              if (customerID && customerID.length > 0) {
                customerAvail(customerID, setOpen);
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
