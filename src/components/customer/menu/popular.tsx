"use client";

import { Beverage } from "@models/Menu/Beverage";
import { Food } from "@models/Menu/Food";
import CartDialog from "@components/customer/addToCart/form-dialog";
import { CartDrawerProvider } from "@context/cartDrawer";
import { useOrderFilterContext } from "@context/orderFilter";

import ItemCard from "@components/customer/item-card";
import { ItemTypeProvider } from "@context/itemType";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { useState, useEffect } from "react";

export default function PopularItems({
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
  }, [orderFilter]);

  return (
    <>
      {(beverageFiltered.length > 0 || foodFiltered.length > 0) && (
        <Card className="m-2 pb-4">
          <CardHeader className="pt-3 pb-2">
            <CardTitle className="text-xl text-bold text-italic tracking-wide pl-[2%]">
              ✨ Popular ✨
            </CardTitle>
            <hr />
          </CardHeader>
          <CardContent className="p-0 grid grid-cols-[repeat(auto-fit,_minmax(150px,_1fr))] min-[400px]:grid-cols-[repeat(auto-fit,_minmax(180px,_1fr))] justify-items-center items-start">
            {beverageFiltered.map((item: Beverage) => {
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
            {foodFiltered.map((item: Food) => {
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
    </>
  );
}
