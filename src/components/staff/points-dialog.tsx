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
import { toast } from "sonner";
import addCustomerPoints from "@hooks/addCustomerPoints";

export default function PointsDialog() {
  const [open, setOpen] = useState(false);
  const [scanResult, setScanResult] = useState<string>("");
  const inputIDRef = useRef<HTMLInputElement>(null);
  const inputBevPriceRef = useRef<HTMLInputElement>(null);
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
      if (!inputBevPriceRef.current?.value) {
        toast.error("Please Enter Beverage Price. Reloading...");
        setTimeout(() => {
          location.reload();
        }, 1500);
      } else {
        let parsedPrice: number;
        try {
          parsedPrice = Number(inputBevPriceRef.current.value);
          if (isNaN(parsedPrice)) {
            toast.error("Invalid Beverage Price");
          } else {
            addCustomerPoints(parsedPrice, scanResult, setOpen, true);
          }
        } catch {
          toast.error("Invalid Beverage Price");
        }
      }
    }
  }, [scanResult]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="lg" className="text-gold">
          Customer Points
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Customer Points</DialogTitle>
          <DialogDescription>
            Scan the QR code or manually add the points and customer ID.
          </DialogDescription>
        </DialogHeader>
        <QrReader
          constraints={{ facingMode: "environment" }}
          onResult={onResult}
          className="mt-[-45px] mb-[-40px]"
        />
        <Input
          placeholder="Enter Beverage Price"
          className="w-full z-10 mb-[-10px]"
          ref={inputBevPriceRef}
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
              const beveragePrice = inputBevPriceRef.current?.value;
              if (
                customerID &&
                beveragePrice &&
                customerID.length > 0 &&
                beveragePrice.length > 0
              ) {
                let parsedPrice: number;
                try {
                  parsedPrice = Number(beveragePrice);
                } catch {
                  return toast.error("Invalid Beverage Price");
                }
                if (isNaN(parsedPrice)) {
                  return toast.error("Invalid Beverage Price");
                }
                addCustomerPoints(parsedPrice, customerID, setOpen);
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
