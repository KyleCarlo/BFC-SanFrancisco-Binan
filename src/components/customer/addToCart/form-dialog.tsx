"use client";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@components/ui/drawer";

import { Button } from "@components/ui/button";

import { Beverage } from "@models/Menu/Beverage";
import { Food } from "@models/Menu/Food";
import { useCartContext } from "@context/cart";
import { useCartDrawerContext } from "@context/cartDrawer";
import { useItemTypeContext } from "@context/itemType";
import AddToCartSheet from "./form-sheet";
import VariantSelect from "./variant-select";
import { ScrollArea, ScrollBar } from "@components/ui/scroll-area";

export default function CartDialog({
  children,
  item,
}: Readonly<{
  children: React.ReactNode;
  item: Beverage | Food;
}>) {
  const { cart } = useCartContext();
  const { itemType } = useItemTypeContext();
  const { open, setOpen } = useCartDrawerContext();
  const itemsInCart = cart.filter(
    (cartItem) => cartItem.id === item.id && cartItem.itemType === itemType
  );

  if (itemsInCart.length === 0)
    return (
      <AddToCartSheet item={item} formType={"create"}>
        {children}
      </AddToCartSheet>
    );

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger>{children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-gold">{item.name}</DrawerTitle>
          <DrawerDescription>Select Item to Edit</DrawerDescription>
        </DrawerHeader>
        <ScrollArea>
          <hr />
          <div className="max-h-[50dvh] px-4">
            {itemsInCart.map((cartItem) => {
              return (
                <>
                  <VariantSelect
                    item={item}
                    cartItem={cartItem}
                    key={cartItem.id}
                  />
                  <hr />
                </>
              );
            })}
          </div>
          <ScrollBar />
        </ScrollArea>
        <DrawerFooter>
          <AddToCartSheet item={item} formType="create">
            <Button>Make Another</Button>
          </AddToCartSheet>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
