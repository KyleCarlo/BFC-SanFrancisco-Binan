import { Voucher } from "@models/Voucher";
import { Button } from "@components/ui/button";
import Image from "next/image";
import dayjs from "@lib/dayjs";
import Link from "next/link";

export default function VoucherList({
  customer_id,
  voucher,
}: {
  customer_id: string;
  voucher: Voucher;
}) {
  return (
    <div className="p-2 border-white border-2 m-1 rounded-md grid grid-cols-[40px_1fr_60px] items-center">
      <div>
        <Image width={30} height={30} src="/bfc-logo.png" alt="Voucher" />
      </div>
      <div>
        <h1 className="text-gold text-bold tracking-wide text-sm">
          1 Drink Voucher
        </h1>
        <p className="text-xs text-italic">Claim Before: </p>
        <p className="text-xs">
          {dayjs(voucher.valid_until)
            .tz("Asia/Manila")
            .format("MMM DD YYYY hh:mm A")}
        </p>
      </div>
      <div className="justify-center">
        <Link href={`/account/${customer_id}?voucher=${voucher.id}`}>
          <Button className="w-full">Claim</Button>
        </Link>
      </div>
    </div>
  );
}
