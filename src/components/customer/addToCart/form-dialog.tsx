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
import Image from "next/image";
import { useState } from "react";

export default function AddToCartSheet({
  children,
  item,
}: Readonly<{
  children: React.ReactNode;
  item: Beverage | Food;
}>) {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent className="w-full">
        <AddToCartForm
          variations={item.variations}
          itemID={item.id}
          setOpen={setOpen}
        >
          <SheetHeader>
            <div className="w-1/3 relative pt-[33%] left-1/3">
              <Image
                fill={true}
                src={item.image}
                alt={`Image of ${item.name}`}
                className="w-full h-full top-1/3 left-1/3 object-cover rounded-md"
              />
            </div>
            <SheetTitle className="text-gold">{item.name}</SheetTitle>
            <SheetDescription className="text-justify">
              {item.description}
            </SheetDescription>
          </SheetHeader>
        </AddToCartForm>
      </SheetContent>
    </Sheet>
  );
}
