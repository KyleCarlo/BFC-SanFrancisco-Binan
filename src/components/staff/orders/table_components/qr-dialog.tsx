import { ReactNode } from "react";
import { Button } from "@components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";
import { Order } from "@models/Order";
import updateOrderEnd from "@/src/hooks/updateOrderEnd";

export default function ActionsDialog({
  children,
  order,
}: {
  children: ReactNode;
  order: Order;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Code Check</DialogTitle>
          <DialogDescription>
            Cross check the order ID with the QR code or manually verify.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            onClick={() => {
              updateOrderEnd(order, "Received");
            }}
          >
            Verify
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
