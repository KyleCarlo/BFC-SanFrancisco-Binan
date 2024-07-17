"use client";

import { Button } from "@components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";
import MOPForm from "./form";
import { useState } from "react";

export default function AddMOPDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="lg" className="text-gold">
          Add Mode of Payment
        </Button>
      </DialogTrigger>
      <DialogContent className="dark md:max-w-md">
        <DialogHeader>
          <DialogTitle>{`Add a Mode of Payment`}</DialogTitle>
        </DialogHeader>
        <MOPForm setOpen={setOpen} formType="create" />
      </DialogContent>
    </Dialog>
  );
}
