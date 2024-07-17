"use client";

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
import { MOP } from "@models/MOP";
import MOPForm from "../form";

export default function EditMOPDialog({ row }: { row: Row<MOP> }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="lg" className="text-gold">
          Edit MOP
        </Button>
      </DialogTrigger>
      <DialogContent className="dark md:max-w-md">
        <DialogHeader>
          <DialogTitle>{`Edit ${row.getValue("bank_name")}`}</DialogTitle>
        </DialogHeader>
        <MOPForm
          setOpen={setOpen}
          formType="update"
          defaultValues={row.original}
        />
      </DialogContent>
    </Dialog>
  );
}
