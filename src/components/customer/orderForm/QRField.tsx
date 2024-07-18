import { UseFormReturn } from "react-hook-form";
import { Order } from "@models/Order";
import { MOP } from "@models/MOP";
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
    <div className="w-full relative pt-[100%]">
      <Image
        fill={true}
        src={mop.qr_code}
        alt={`Image of ${mop.bank_name}`}
        className="w-full h-full top-0 left-0 object-cover rounded-md"
      />
    </div>
  );
}
