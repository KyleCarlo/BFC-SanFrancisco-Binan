import { Voucher } from "../models/Voucher";

export async function serverGetVouchers(id: string) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/customer/voucher?id=${id}`,
      {
        method: "GET",
        cache: "no-store",
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
