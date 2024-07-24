import { serverGetMenuItems } from "@hooks/getMenuItems";
import { Beverage } from "@models/Menu/Beverage";
import { Food } from "@models/Menu/Food";
import CartDialog from "@components/customer/addToCart/form-dialog";
import CartView from "@components/customer/cart-sheet";
import { CartDrawerProvider } from "@context/cartDrawer";

import ItemCard from "@components/customer/item-card";
import { ItemTypeProvider } from "@context/itemType";

export default async function OrderPage() {
  const {
    beverage,
    food,
    new_beverage,
    new_food,
    popular_beverage,
    popular_food,
    message,
  } = await serverGetMenuItems();

  if (!beverage || !food) {
    return (
      <main>
        <p>{message}</p>
      </main>
    );
  }
  return (
    <main className="grid grid-cols-[repeat(auto-fit,_minmax(160px,_1fr))] justify-items-center m-2">
      {beverage.map((item: Beverage) => {
        return (
          <ItemTypeProvider defaultItemType="beverage" key={item.id}>
            <CartDrawerProvider>
              <CartDialog item={item}>
                <ItemCard item={item} />
              </CartDialog>
            </CartDrawerProvider>
          </ItemTypeProvider>
        );
      })}
      {food.map((item: Food) => {
        return (
          <ItemTypeProvider defaultItemType="food" key={item.id}>
            <CartDrawerProvider>
              <CartDialog item={item}>
                <ItemCard item={item} />
              </CartDialog>
            </CartDrawerProvider>
          </ItemTypeProvider>
        );
      })}
      <CartView food={food} beverage={beverage} />
    </main>
  );
}
