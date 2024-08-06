import { Customer } from "@models/User";
import { cookies } from "next/headers";

export async function serverGetCustomer(id: string) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/customer?id=${id}`,
      {
        method: "GET",
        cache: "no-store",
        headers: { cookie: cookies().toString() },
      }
    );

    const { customer, message }: { customer: Customer; message: string } =
      await response.json();

    if (!response.ok) {
      return { message };
    }

    return { customer };
  } catch {
    return { message: "Unknown Error Occured." };
  }
}
