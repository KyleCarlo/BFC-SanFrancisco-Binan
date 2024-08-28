"use client";

import { Beverage, BeverageBase } from "@models/Menu/Beverage";
import { Food } from "@models/Menu/Food";
import CartDialog from "@components/customer/addToCart/form-dialog";
import { CartDrawerProvider } from "@context/cartDrawer";
import { useOrderFilterContext } from "@context/orderFilter";

import ItemCard from "@components/customer/item-card";
import { ItemTypeProvider } from "@context/itemType";
import { getBeveragePerBase, getFoodPerCategory } from "@lib/customer-utils";
import { parseBeverageBase, capitalize } from "@lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { useEffect, useState } from "react";

export default function Items({
  beverage,
  food,
}: Readonly<{
  beverage: Beverage[];
  food: Food[];
}>) {
  const [beverageFiltered, setBeverageFiltered] =
    useState<Beverage[]>(beverage);
  const [foodFiltered, setFoodFiltered] = useState<Food[]>(food);
  const { orderFilter } = useOrderFilterContext();

  useEffect(() => {
    if (orderFilter === undefined) {
      setBeverageFiltered(beverage);
      setFoodFiltered(food);
      return;
    }

    const beverageFiltered = beverage.filter((item) =>
      item.name.toLowerCase().includes(orderFilter.toLowerCase())
    );
    const foodFiltered = food.filter((item) =>
      item.name.toLowerCase().includes(orderFilter.toLowerCase())
    );

    setBeverageFiltered(beverageFiltered);
    setFoodFiltered(foodFiltered);
  }, [orderFilter, beverage, food]);

  const bevPerBase = getBeveragePerBase(beverageFiltered);
  const foodPerCategory = getFoodPerCategory(foodFiltered);

  if (beverageFiltered.length === 0 && foodFiltered.length === 0) {
    return (
      <div className="flex items-center justify-center h-dvh absolute top-0 w-full px-16">
        <h1 className="text-xl text-bold text-italic text-center">
          We cannot find what you are looking for. 😢
        </h1>
      </div>
    );
  }

  return (
    <>
      <ItemTypeProvider defaultItemType="beverage">
        {Object.keys(bevPerBase).map((base) => {
          const parsedBase = parseBeverageBase(base);
          if (bevPerBase[base as BeverageBase].length === 0) return null;

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
                    <CartDrawerProvider key={item.id}>
                      <CartDialog item={item}>
                        <ItemCard item={item} />
                      </CartDialog>
                    </CartDrawerProvider>
                  );
                })}
              </CardContent>
            </Card>
          );
        })}
      </ItemTypeProvider>
      <ItemTypeProvider defaultItemType="food">
        {Object.keys(foodPerCategory).map((category) => {
          if (foodPerCategory[category].length === 0) return null;
          return (
            <Card className="m-2 pb-4" key={category}>
              <CardHeader className="pt-3 pb-2">
                <CardTitle className="text-xl text-bold text-italic tracking-wide pl-[2%]">
                  {capitalize(category)}
                </CardTitle>
                <hr />
              </CardHeader>
              <CardContent className="p-0 grid grid-cols-[repeat(auto-fit,_minmax(150px,_1fr))] min-[400px]:grid-cols-[repeat(auto-fit,_minmax(180px,_1fr))] justify-items-center items-start">
                {foodPerCategory[category].map((item: Food) => {
                  return (
                    <CartDrawerProvider key={item.id}>
                      <CartDialog item={item}>
                        <ItemCard item={item} />
                      </CartDialog>
                    </CartDrawerProvider>
                  );
                })}
              </CardContent>
            </Card>
          );
        })}
      </ItemTypeProvider>
    </>
  );
}
