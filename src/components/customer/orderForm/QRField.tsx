"use client";

import { UseFormReturn } from "react-hook-form";
import { Order } from "@models/Order";
import { MOP } from "@models/MOP";
import { Button } from "@components/ui/button";
import UploadDialog from "./upload-field";
import Image from "next/image";
import Uppy from "@uppy/core";
import html2canvas from "html2canvas";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function QRField({
  form,
  mops,
  uppy,
  receiptUploaded,
  setReceiptUploaded,
}: {
  form: UseFormReturn<Order>;
  mops: MOP[];
  uppy: Uppy<Record<string, unknown>, Record<string, unknown>>;
  receiptUploaded: boolean;
  setReceiptUploaded: Dispatch<SetStateAction<boolean>>;
}) {
  if (form.watch("mop") === "Cash") {
    return;
  }
  useEffect(() => {
    uppy.on("files-added", () => {
      setReceiptUploaded(true);
    });
    uppy.on("file-removed", () => {
      setReceiptUploaded(false);
    });

    return () => {
      uppy.off("files-added", () => {});
      uppy.off("file-removed", () => {});
    };
  });

  const mop = mops.filter((mop) => mop.bank_name === form.watch("mop"))[0];
  return (
    <div className="text-center mb-2">
      <h1 className="py-1">Scan the QR for Payment</h1>
      <div className="w-full relative pt-[100%] border-2 rounded-md">
        <Image
          id="qr-code"
          fill={true}
          src={mop.qr_code}
          alt={`Image of ${mop.bank_name}`}
          className="w-full h-full top-0 left-0 object-cover rounded-md"
        />
      </div>
      <Button
        className="mt-2 w-full"
        type="button"
        onClick={async () => {
          const element = document.getElementById("qr-code");
          if (element) {
            const canvas = await html2canvas(element);
            const data = canvas.toDataURL("image/jpg");
            const link = document.createElement("a");

            link.href = data;
            link.download = `${form.watch("mop")}.jpg`;

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }
        }}
      >
        Download QR Code
      </Button>
      <UploadDialog
        uppy={uppy}
        triggerMessage={`Upload Proof of Payment ${
          receiptUploaded ? "✅" : ""
        }`}
        description="Upload your proof of payment here."
        title="Proof of Payment"
        className="w-full mt-2"
      />
    </div>
  );
}
