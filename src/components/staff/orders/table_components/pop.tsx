import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";
import { Button } from "@components/ui/button";
import Image from "next/image";

export default function ProofOfPayment({ image }: { image: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Show</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Proof of Payment</DialogTitle>
          <DialogDescription>
            Please Cross-Check the Reference Number.
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
