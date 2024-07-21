import { Cart, ItemDetailsList } from "@models/Cart";

export async function serverGetCartDetails(cart: Cart) {
  try {
    const response = await fetch(`http://localhost:3000/api/cart`, {
      method: "POST",
      body: JSON.stringify(cart),
      cache: "no-store",
    });

    const {
      itemDetails,
      message,
    }: {
      itemDetails: ItemDetailsList;
      message: string;
    } = await response.json();

    if (!response.ok) {
      return { message };
    }

    return { itemDetails };
  } catch {
    return { message: "Unknown error occurred." };
  }
}
