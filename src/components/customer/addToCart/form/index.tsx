"use client";

import { CartItem, CartItemModel } from "@models/Cart";
import { BeverageVariation } from "@models/Menu/Beverage";
import { FoodVariation } from "@models/Menu/Food";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@components/ui/form";
import { useItemTypeContext } from "@context/itemType";
import VariationsField from "./variations-field";
import SugarLevelField from "./sugarLevel-field";
import { Button } from "@components/ui/button";
import { useCartContext } from "@context/cart";

export default function AddToCartForm({
  variations,
  itemID,
}: {
  variations: BeverageVariation[] | FoodVariation[];
  itemID: number;
}) {
  const { itemType } = useItemTypeContext();
  const { cart, setCart } = useCartContext();

  const form = useForm<CartItem>({
    resolver: zodResolver(CartItemModel),
    defaultValues: {
      itemType: itemType,
      id: itemID,
      variation_id: variations[0].id,
      quantity: 0,
      sugar_level: itemType === "beverage" ? "50%" : undefined,
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => {
          setCart([...cart, values]);
        })}
      >
        <hr className="my-5" />
        <div className="flex flex-col gap-7">
          <VariationsField form={form} variations={variations} />
          <SugarLevelField form={form} />
        </div>
        <hr className="my-5" />
        <Button type="submit">Make Another</Button>
      </form>
    </Form>
  );
}
