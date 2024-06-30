import { Button } from "@components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";
import AddItemForm from "./form";
import { useItemTypeContext } from "@hooks/itemTypeContext";
import { capitalize } from "@lib/utils";

export default function AddItemDialog() {
  const { itemType } = useItemTypeContext();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="lg" className="text-gold">
          Add Item
        </Button>
      </DialogTrigger>
      <DialogContent className="dark md:max-w-md">
        <DialogHeader>
          <DialogTitle>{`Add ${capitalize(itemType)} to Menu`}</DialogTitle>
        </DialogHeader>
        <AddItemForm />
      </DialogContent>
    </Dialog>
  );
}
