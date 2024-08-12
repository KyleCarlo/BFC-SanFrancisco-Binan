import { Voucher } from "@models/Voucher";
import { cookies } from "next/headers";

export async function serverGetVouchers(id: string) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/customer/voucher?id=${id}`,
      {
        method: "GET",
        cache: "no-store",
        headers: { cookie: cookies().toString() },
      }
    );

    const { vouchers, message }: { vouchers: Voucher[]; message: string } =
      await response.json();

    if (!response.ok) {
      return { message };
    }

    return { vouchers };
  } catch {
    return { message: "Unknown Error Occured." };
  }
}
