import { serverGetMenuItems } from "@hooks/getMenuItems";
import CartView from "@components/customer/cart-sheet";

import PopularItems from "@components/customer/menu/popular";
import NewItems from "@components/customer/menu/new";
import Items from "@components/customer/menu";

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
    <main className="pb-16">
      <PopularItems beverage={popular_beverage} food={popular_food} />
      <NewItems beverage={new_beverage} food={new_food} />
      <Items beverage={beverage} food={food} />
      <CartView food={food} beverage={beverage} />
    </main>
  );
}
