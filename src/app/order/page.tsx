import { serverGetMenuItems } from "@hooks/getMenuItems";
import { Beverage } from "@models/Menu/Beverage";
import { Food } from "@models/Menu/Food";
import CartDialog from "@components/customer/addToCart/form-dialog";
import TotalCart from "@components/customer/addToCart/total-cart";
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
    <main className="flex items-center justify-center flex-wrap">
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
      <TotalCart food={food} beverage={beverage} />
    </main>
  );
}
