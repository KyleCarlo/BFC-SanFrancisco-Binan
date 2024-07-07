import { serverGetMenuItems } from "@hooks/getMenuItems";
import { Beverage } from "@models/Menu/Beverage";
import { Food } from "@models/Menu/Food";
import AddToCartSheet from "@components/customer/addToCart-sheet";

import ItemCard from "@components/customer/item-card";

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
      {beverage.map((item: Beverage) => {
        return (
          <AddToCartSheet key={item.id}>
            <ItemCard item={item} key={item.id} />
          </AddToCartSheet>
        );
      })}
      {/* {food.map((item: Food) => {
        return <ItemCard item={item} key={item.id} />;
      })} */}
    </main>
  );
}
