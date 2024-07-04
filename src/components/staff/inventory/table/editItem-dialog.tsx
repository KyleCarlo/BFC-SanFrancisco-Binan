"use client";

import { Beverage } from "@models/Menu/Beverage";
import { Food } from "@models/Menu/Food";
import { Button } from "@components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";
import { Row } from "@tanstack/react-table";
import { useState } from "react";
import ItemForm from "@components/staff/inventory/form";

export default function EditItemDialog({
  row,
}: {
  row: Row<Food> | Row<Beverage>;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="lg" className="text-gold">
          Edit Item
        </Button>
      </DialogTrigger>
      <DialogContent className="dark md:max-w-md">
        <DialogHeader>
          <DialogTitle>{`Edit ${row.getValue("name")}`}</DialogTitle>
        </DialogHeader>
        <ItemForm
          setOpen={setOpen}
          inputValues={row.original}
          formType="update"
        />
      </DialogContent>
    </Dialog>
  );
}
