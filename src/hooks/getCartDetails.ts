import { Cart, ItemDetailsList } from "@models/Cart";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

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

export async function getCartDetails(
  cart: Cart,
  setItemDetailsList: Dispatch<SetStateAction<ItemDetailsList>>,
  setLoading: Dispatch<SetStateAction<boolean>>
) {
  setLoading(true);
  try {
    const response = await fetch(`/api/cart`, {
      method: "POST",
      body: JSON.stringify(cart),
    });

    const {
      itemDetails,
      message,
    }: {
      itemDetails: ItemDetailsList;
      message: string;
    } = await response.json();

    if (!response.ok) {
      setLoading(false);
      setItemDetailsList([]);
      return toast.error(message);
    }

    setItemDetailsList(itemDetails);
    setLoading(false);
  } catch {
    setLoading(false);
    setItemDetailsList([]);
    return toast.error("Unknown error occurred.");
  }
}
