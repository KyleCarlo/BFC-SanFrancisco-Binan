"use client";

import { Button } from "@components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";
import ItemForm from "@components/staff/inventory/form";
import { useItemTypeContext } from "@hooks/itemTypeContext";
import { capitalize } from "@lib/utils";
import { useState } from "react";

export default function AddItemDialog() {
  const { itemType } = useItemTypeContext();
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="lg" className="text-gold">
          Add Item
        </Button>
      </DialogTrigger>
      <DialogContent className="dark md:max-w-md">
        <DialogHeader>
          <DialogTitle>{`Add ${capitalize(itemType)} to Menu`}</DialogTitle>
        </DialogHeader>
        <ItemForm setOpen={setOpen} formType="create" />
      </DialogContent>
    </Dialog>
  );
}
