import { UseFormReturn } from "react-hook-form";
import { BeverageVariation, Beverage } from "@models/Menu/Beverage";
import { FoodVariation, Food } from "@models/Menu/Food";
import { CartItem, Cart } from "@models/Cart";
import { ItemType } from "@models/Menu";
import { DefaultValues } from "react-hook-form";
import { get } from "http";

export function getComputedPrice(
  form: UseFormReturn<CartItem | any | undefined>,
  variations: BeverageVariation[] | FoodVariation[]
) {
  const curr_var = variations.find(
    (variation) => Number(form.watch("variation_id")) === variation.id
  );
  if (curr_var) return (curr_var.price as number) * form.watch("quantity");
  return 0;
}

export function getCartItemQuantity(item: Beverage | Food, cart: Cart) {
  let quantity = 0;
  cart.map((cartItem) => {
    if (cartItem.id === item.id) {
      quantity += cartItem.quantity;
    }
  });

  return quantity;
}

export function getPreviousCartIndex(cart: Cart, prev_values: CartItem) {
  let prev_index = -1;
  cart.forEach((item, index) => {
    if (
      item.itemType === prev_values.itemType &&
      item.id === prev_values.id &&
      item.variation_id === prev_values.variation_id &&
      item.sugar_level === prev_values.sugar_level
    ) {
      prev_index = index;
      return;
    }
  });
  return prev_index;
}

export function updateCart(
  cart: Cart,
  values: CartItem,
  formType: "create" | "update",
  prev_value_index: number
) {
  let updatedCartIndex = -1;
  cart.forEach((item, index) => {
    if (
      item.itemType === values.itemType &&
      item.id === values.id &&
      item.variation_id === values.variation_id &&
      item.sugar_level === values.sugar_level
    ) {
      if (formType === "create" || index != prev_value_index)
        item.quantity += values.quantity;
      else item.quantity = values.quantity;
      updatedCartIndex = index;
      return;
    }
  });

  return updatedCartIndex;
}

export function handleAddToCart(
  prev_values: CartItem,
  values: CartItem,
  cart: Cart,
  setCart: React.Dispatch<React.SetStateAction<Cart>>,
  formType: "create" | "update"
) {
  let previousCartIndex =
    formType == "update" ? getPreviousCartIndex(cart, prev_values) : -1;
  let cartIndexUpdated = updateCart(cart, values, formType, previousCartIndex);

  if (cartIndexUpdated == -1) cart.push(values);

  if (cartIndexUpdated != previousCartIndex && previousCartIndex != -1) {
    cart.splice(previousCartIndex, 1);
  }

  setCart([...cart]);
}

export function handleDeleteCartItem(
  cart: Cart,
  setCart: React.Dispatch<React.SetStateAction<Cart>>,
  values: CartItem
) {
  const index = getPreviousCartIndex(cart, values);
  cart.splice(index, 1);
  setCart([...cart]);
}

export function parseDefaultCartItem(
  formType: "create" | "update",
  itemType: ItemType,
  itemID: number,
  variations: BeverageVariation[] | FoodVariation[],
  defaultCart?: CartItem
) {
  if (formType === "create")
    return {
      itemType: itemType,
      id: itemID,
      variation_id: variations[0].id,
      quantity: 1,
      sugar_level: itemType === "beverage" ? "50%" : undefined,
    } as DefaultValues<CartItem>;
  return defaultCart;
}
