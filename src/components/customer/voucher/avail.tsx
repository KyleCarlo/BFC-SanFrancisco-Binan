"use client";

import { Voucher } from "@models/Voucher";
import QRDownload from "@components/customer/orderWait/QRnDL";
import socket from "@lib/socket";
import { useEffect, useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@components/ui/dialog";
import { Button } from "@components/ui/button";
import { useRouter } from "next/navigation";

export default function AvailVoucher({
  selected_voucher,
}: {
  selected_voucher: Voucher;
}) {
  const [status, setStatus] = useState<string>();

  const [open, setOpen] = useState(false);
  const routeOnClose = useRef<boolean>();
  const router = useRouter();

  useEffect(() => {
    socket.connect();
    socket.emit("join_room", selected_voucher.id);
    socket.on("rcv_voucher_confirmation", (status: string) => {
      setStatus(status);
    });

    return () => {
      socket.disconnect();
    };
  }, [selected_voucher.id]);

  useEffect(() => {
    if (status === "success") {
      setOpen(true);
      routeOnClose.current = true;
    }
  }, [status]);

  useEffect(() => {
    if (open === false && routeOnClose.current === true) {
      location.reload();
      router.push("/account");
    }
  }, [open, router]);

  return (
    <div className="flex flex-col justify-center items-center h-dvh">
      <div className="p-2 rounded-xl w-[280px] bg-[#27272A] mb-3 text-center">
        <h1>Present this QR Code to Claim</h1>
        <p className="text-xs text-gray-400">
          Voucher ID: {selected_voucher.id}
        </p>
      </div>

      <QRDownload
        value={JSON.stringify(selected_voucher)}
        filename={selected_voucher.id}
      />
      <Button
        className="w-[280px]"
        variant="outline"
        onClick={() => {
          router.push("/account");
        }}
      >
        Back to List
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-4/5 rounded-lg ">
          <DialogHeader>
            <DialogTitle className="text-gold">
              Voucher Confirmation
            </DialogTitle>
            <DialogDescription className="text-white">
              This is a confirmation that you can claim now your voucher.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                location.reload();
                router.push("/account");
              }}
            >
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
