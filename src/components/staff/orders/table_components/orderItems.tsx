"use client";

import { Button } from "@components/ui/button";

import { ScrollArea } from "@components/ui/scroll-area";
import { Cart, ItemDetailsList } from "@models/Cart";
import { getCartDetails } from "@/src/hooks/getCartDetails";
import { useEffect, useState } from "react";
import CartList from "./cart-list";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@components/ui/sheet";

export default function ItemsDialog({ items }: { items: Cart }) {
  const [open, setOpen] = useState(false);
  const [itemDetailsList, setItemDetailsList] = useState<ItemDetailsList>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (open && itemDetailsList.length === 0) {
      setTimeout(() => {
        getCartDetails(items, setItemDetailsList, setLoading);
      }, 500);
    }
  }, [open, items, itemDetailsList]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="w-full">
        <Button
          onClick={() => {
            setOpen(true);
          }}
        >
          Show
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full grid grid-rows-[min-content_1fr]">
        <SheetHeader>
          <SheetTitle>Items</SheetTitle>
          <SheetDescription>List of Order Items</SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-full">
          <div className="flex flex-col items-center">
            {!loading ? (
              itemDetailsList.map((item) => {
                return (
                  <div key={item.id} className="w-full">
                    <CartList item={item} />
                  </div>
                );
              })
            ) : (
              <div>Loading...</div>
            )}
            <h1 className="text-italic text-bold py-4 tracking-wide">
              -- End of Order --
            </h1>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
