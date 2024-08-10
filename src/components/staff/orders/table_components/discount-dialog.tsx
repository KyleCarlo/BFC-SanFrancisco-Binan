import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@components/ui/dialog";
import { Button } from "@components/ui/button";
import Image from "next/image";
import { OrderDiscount } from "@models/Order";

export default function DiscountDialog({
  image,
  discountType,
}: {
  image: string;
  discountType: OrderDiscount;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-xs p-2">
          {discountType} ID
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{discountType} ID</DialogTitle>
          <DialogDescription>
            Please Verify the {discountType} ID.
          </DialogDescription>
        </DialogHeader>
        <div className="w-full relative pt-[100%]">
          <Image
            fill={true}
            src={image}
            alt="Proof of Payment"
            className="w-full h-full top-0 left-0 object-cover rounded-md"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
