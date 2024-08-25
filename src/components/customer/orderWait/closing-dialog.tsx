"use client";

import Link from "next/link";
import { Button } from "@components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@components/ui/dialog";

export default function ClosingDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Leave</Button>
      </DialogTrigger>
      <DialogContent className="w-4/5 rounded-lg">
        <DialogHeader>
          <DialogTitle>Did you save the QR Code?</DialogTitle>
          <DialogDescription>
            You might lose track of the order if you leave without saving the
            QR.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex max-sm:gap-2 ">
          <Link href="/" className="max-sm:w-full">
            <Button variant="destructive" className="w-full">
              Leave
            </Button>
          </Link>
          <DialogClose className="max-sm:w-full">
            <Button variant="secondary" className="w-full">
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
