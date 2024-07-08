"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@components/ui/sheet";
import AddToCartForm from "./form";
import { Beverage } from "@models/Menu/Beverage";
import { Food } from "@models/Menu/Food";

export default function AddToCartSheet({
  children,
  item,
}: Readonly<{
  children: React.ReactNode;
  item: Beverage | Food;
}>) {
  return (
    <Sheet>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-gold">{item.name}</SheetTitle>
          <SheetDescription className="text-justify">
            {item.description}
          </SheetDescription>
        </SheetHeader>
        <AddToCartForm variations={item.variations} itemID={item.id} />
      </SheetContent>
    </Sheet>
  );
}
