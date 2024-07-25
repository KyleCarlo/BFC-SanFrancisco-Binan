"use client";

import { UseFormReturn } from "react-hook-form";
import { Order } from "@models/Order";
import { MOP } from "@models/MOP";
import { Uploader } from "@components/uploader";
import { Button } from "@components/ui/button";
import Image from "next/image";
import Uppy from "@uppy/core";
import html2canvas from "html2canvas";

export default function QRField({
  form,
  mops,
  uppy,
}: {
  form: UseFormReturn<Order>;
  mops: MOP[];
  uppy: Uppy<Record<string, unknown>, Record<string, unknown>>;
}) {
  if (form.watch("mop") === "Cash") {
    return;
  }
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
      <h1 className="pt-2 pb-1">Upload Receipt</h1>
      <div className="flex justify-center">
        <Uploader uppy={uppy} width={250} height={125} />
      </div>
    </div>
  );
}
