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

export default function RejectDialog({
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
          <DialogTitle>Are you Rejecting the Order?</DialogTitle>
          <DialogDescription>
            The customer will be notified that their order has been rejected.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            variant="destructive"
            onClick={() => {
              updateOrderEnd(order, "Rejected");
            }}
          >
            Reject
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
