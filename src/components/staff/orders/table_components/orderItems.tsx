"use client";

import { Button } from "@components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";
import { ScrollArea } from "@components/ui/scroll-area";
import { Cart, ItemDetailsList } from "@models/Cart";
import { getCartDetails } from "@/src/hooks/getCartDetails";
import { useEffect, useState } from "react";

export default function ItemsDialog({ items }: { items: Cart }) {
  const [itemDetailsList, setItemDetailsList] = useState<ItemDetailsList>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getCartDetails(items, setItemDetailsList, setLoading);
  }, [items]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Show</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Items</DialogTitle>
          <DialogDescription>List of Order Items</DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[250px]">
          <div className="flex flex-col items-center">
            {!loading ? (
              itemDetailsList.map((item) => {
                return <div key={item.id} className="w-full"></div>;
              })
            ) : (
              <div>Loading...</div>
            )}
          </div>
        </ScrollArea>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
