import { Order } from "@models/Order";

export async function serverGetOrder(
  order_id: string
): Promise<{ order?: Order; message?: string }> {
  try {
    const response = await fetch(
      `http://localhost:3000/api/order?id=${order_id}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    const { order, message } = await response.json();

    if (!response.ok) {
      return { message };
    }

    return { order: order[0] };
  } catch {
    return { message: "Unknown error occurred." };
  }
}
