import { CopyIcon } from "@radix-ui/react-icons";

import { Button } from "@components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";
import AddItemForm from "./add-form";

export default function AddItemDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="lg" className="text-gold">
          Add Item
        </Button>
      </DialogTrigger>
      <DialogContent className="dark sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Item to Menu</DialogTitle>
        </DialogHeader>
        <AddItemForm />
      </DialogContent>
    </Dialog>
  );
}