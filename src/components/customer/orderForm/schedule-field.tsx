"use client";

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

export default function ScheduleField() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full h-full">
          Schedule
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[300px] rounded-md">
        <DialogHeader>
          <DialogTitle>Schedule Pick Up</DialogTitle>
        </DialogHeader>
        <div>test</div>
        <DialogFooter>
          <Button type="submit" className="xs">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
