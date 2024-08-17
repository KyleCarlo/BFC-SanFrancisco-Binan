import { serverGetMenuItems } from "@hooks/getMenuItems";
import { Beverage, BeverageBase } from "@models/Menu/Beverage";
import { Food } from "@models/Menu/Food";
import CartDialog from "@components/customer/addToCart/form-dialog";
import CartView from "@components/customer/cart-sheet";
import { CartDrawerProvider } from "@context/cartDrawer";

import ItemCard from "@components/customer/item-card";
import { ItemTypeProvider } from "@context/itemType";
import { getBeveragePerBase } from "@lib/customer-utils";
import { parseBeverageBase } from "@lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";

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

  const bevPerBase = getBeveragePerBase(beverage);

  return (
    <main className="pb-16">
      {(popular_beverage.length > 0 || popular_food.length > 0) && (
        <Card className="m-2 pb-4">
          <CardHeader className="pt-3 pb-2">
            <CardTitle className="text-xl text-bold text-italic tracking-wide pl-[2%]">
              ✨ Popular ✨
            </CardTitle>
            <hr />
          </CardHeader>
          <CardContent className="p-0 grid grid-cols-[repeat(auto-fit,_minmax(150px,_1fr))] min-[400px]:grid-cols-[repeat(auto-fit,_minmax(180px,_1fr))] justify-items-center items-start">
            {popular_beverage.map((item: Beverage) => {
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
            {popular_food.map((item: Food) => {
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
          </CardContent>
        </Card>
      )}
      {(new_beverage.length > 0 || new_food.length > 0) && (
        <Card className="m-2 pb-4">
          <CardHeader className="pt-3 pb-2">
            <CardTitle className="text-xl text-bold text-italic tracking-wide pl-[2%]">
              😳 New 😳
            </CardTitle>
            <hr />
          </CardHeader>
          <CardContent className="p-0 grid grid-cols-[repeat(auto-fit,_minmax(150px,_1fr))] min-[400px]:grid-cols-[repeat(auto-fit,_minmax(180px,_1fr))] justify-items-center items-start">
            {new_beverage.map((item: Beverage) => {
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
            {new_food.map((item: Food) => {
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
          </CardContent>
        </Card>
      )}
      <ItemTypeProvider defaultItemType="beverage">
        <CartDrawerProvider>
          {Object.keys(bevPerBase).map((base) => {
            const parsedBase = parseBeverageBase(base);
            return (
              <Card className="m-2 pb-4" key={base}>
                <CardHeader className="pt-3 pb-2">
                  <CardTitle className="text-xl text-bold text-italic tracking-wide pl-[2%]">
                    {parsedBase}
                  </CardTitle>
                  <hr />
                </CardHeader>
                <CardContent className="p-0 grid grid-cols-[repeat(auto-fit,_minmax(150px,_1fr))] min-[400px]:grid-cols-[repeat(auto-fit,_minmax(180px,_1fr))] justify-items-center items-start">
                  {bevPerBase[base as BeverageBase].map((item: Beverage) => {
                    return (
                      <CartDialog item={item} key={item.id}>
                        <ItemCard item={item} />
                      </CartDialog>
                    );
                  })}
                </CardContent>
              </Card>
            );
          })}
        </CartDrawerProvider>
      </ItemTypeProvider>
      <CartView food={food} beverage={beverage} />
    </main>
  );
}
