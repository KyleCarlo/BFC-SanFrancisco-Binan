import { UseFormReturn } from "react-hook-form";
import { Order } from "@models/Order";
import { MOP } from "@models/MOP";
import { Uploader } from "@components/uploader";
import { customerUppy } from "@lib/uppy-config";
import Image from "next/image";

export default function QRField({
  form,
  mops,
}: {
  form: UseFormReturn<Order>;
  mops: MOP[];
}) {
  if (form.watch("mop") === "Cash") {
    return;
  }
  const mop = mops.filter((mop) => mop.bank_name === form.watch("mop"))[0];
  return (
    <div className="text-center">
      <h1 className="py-1">Scan the QR for Payment</h1>
      <div className="w-full relative pt-[100%] border-2 rounded-md">
        <Image
          fill={true}
          src={mop.qr_code}
          alt={`Image of ${mop.bank_name}`}
          className="w-full h-full top-0 left-0 object-cover rounded-md"
        />
      </div>
      <h1 className="pt-2 pb-1">Upload Receipt</h1>
      <div className="flex justify-center">
        <Uploader uppy={customerUppy} width={250} height={125} />
      </div>
    </div>
  );
}
