import { serverGetMenuItems } from "@hooks/getMenuItems";
import { Beverage } from "@models/Menu/Beverage";
import { Food } from "@models/Menu/Food";
import AddToCartSheet from "@components/customer/addToCart/sheet";
import { CartProvider } from "@context/cart";

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
    <main className="flex items-center justify-center">
      <CartProvider>
        {beverage.map((item: Beverage) => {
          return (
            <ItemTypeProvider defaultItemType="beverage" key={item.id}>
              <AddToCartSheet item={item} key={item.id}>
                <ItemCard item={item} key={item.id} />
              </AddToCartSheet>
            </ItemTypeProvider>
          );
        })}
        {/* {food.map((item: Food) => {
        return <ItemCard item={item} key={item.id} />;
      })} */}
      </CartProvider>
    </main>
  );
}
