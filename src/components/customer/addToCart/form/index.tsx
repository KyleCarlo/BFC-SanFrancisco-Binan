"use client";

import { CartItem, CartItemModel } from "@models/Cart";
import { BeverageVariation } from "@models/Menu/Beverage";
import { FoodVariation } from "@models/Menu/Food";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@components/ui/form";
import { ScrollArea, ScrollBar } from "@components/ui/scroll-area";
import { useItemTypeContext } from "@context/itemType";
import VariationsField from "./variations-field";
import SugarLevelField from "./sugarLevel-field";
import { Button } from "@components/ui/button";
import { useCartContext } from "@context/cart";
import QuantityField from "./quantity-field";
import { Dispatch, SetStateAction } from "react";
import { getComputedPrice, handleAddToCart } from "@lib/utils";

export default function AddToCartForm({
  children,
  variations,
  itemID,
  setOpen,
}: {
  children: React.ReactNode;
  variations: BeverageVariation[] | FoodVariation[];
  itemID: number;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { itemType } = useItemTypeContext();
  const { cart, setCart } = useCartContext();

  const form = useForm<CartItem>({
    resolver: zodResolver(CartItemModel),
    defaultValues: {
      itemType: itemType,
      id: itemID,
      variation_id: variations[0].id,
      quantity: 1,
      sugar_level: itemType === "beverage" ? "50%" : undefined,
    },
  });

  const computedPrice = getComputedPrice(form, variations);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => {
          if (values.quantity > 0) {
            handleAddToCart(values, cart, setCart);
          }
          setOpen(false);
          console.log(cart);
        })}
      >
        <ScrollArea className="h-[82dvh] px-4">
          {children}
          <div>
            <hr className="my-5" />
            <div className="flex flex-col gap-7">
              <VariationsField form={form} variations={variations} />
              <SugarLevelField form={form} />
            </div>
            <hr className="my-5" />
            <QuantityField form={form} />
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
        <div className="flex justify-center pt-5">
          <Button variant="secondary" type="submit" className="w-full">
            {computedPrice != 0 ? (
              <>
                <span>Add to Cart</span>
                <span className="px-2">-</span>
                <span className="text-gold">{computedPrice}</span>
              </>
            ) : (
              <>
                <span>Cancel</span>
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
