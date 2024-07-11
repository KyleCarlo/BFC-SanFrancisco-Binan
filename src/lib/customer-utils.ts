import { UseFormReturn } from "react-hook-form";
import { BeverageVariation, Beverage } from "@models/Menu/Beverage";
import { FoodVariation, Food } from "@models/Menu/Food";
import { CartItem, Cart } from "@models/Cart";
import { ItemType } from "@models/Menu";
import { DefaultValues } from "react-hook-form";

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

export function getCartItemQuantity(
  item: Beverage | Food,
  cart: Cart,
  itemType: ItemType
) {
  let quantity = 0;
  cart.map((cartItem) => {
    if (cartItem.id === item.id && cartItem.itemType === itemType) {
      quantity += cartItem.quantity;
    }
  });

  return quantity;
}

export function getCartItemIndex(cart: Cart, cartItem: CartItem) {
  let _index = -1;
  cart.forEach((item, index) => {
    if (
      item.itemType === cartItem.itemType &&
      item.id === cartItem.id &&
      item.variation_id === cartItem.variation_id &&
      item.sugar_level === cartItem.sugar_level
    ) {
      _index = index;
      return;
    }
  });
  return _index;
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
    formType == "update" ? getCartItemIndex(cart, prev_values) : -1;
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
  const index = getCartItemIndex(cart, values);
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

export function getCartTotal(food: Food[], beverage: Beverage[], cart: Cart) {
  let total_cost = 0;
  let quantity = 0;

  cart.forEach((item) => {
    if (item.itemType === "beverage") {
      const beverageItem = beverage.find(
        (bev) =>
          bev.id === item.id &&
          bev.variations.find((v) => v.id === item.variation_id)
      );
      if (beverageItem) {
        quantity += item.quantity;
        total_cost +=
          item.quantity * (beverageItem.variations[0].price as number);
      } else {
        throw Error("Please try to reload the page and reorder again.");
      }
    } else {
      const foodItem = food.find(
        (fd) =>
          fd.id === item.id &&
          fd.variations.find((v) => v.id === item.variation_id)
      );
      if (foodItem) {
        quantity += item.quantity;
        total_cost += item.quantity * (foodItem.variations[0].price as number);
      } else {
        throw Error("Please try to reload the page and reorder again.");
      }
    }
  });

  return { total_cost, quantity };
}
