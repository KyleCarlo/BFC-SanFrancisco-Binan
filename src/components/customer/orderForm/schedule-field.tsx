"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";
import TimePicker from "./timepicker";

import { Button } from "@components/ui/button";
import { useState } from "react";
import dayjs from "@lib/dayjs";
import { toast } from "sonner";

import { UseFormReturn } from "react-hook-form";
import { Order } from "@models/Order";

export default function ScheduleField({
  form,
}: {
  form: UseFormReturn<Order>;
}) {
  const [open, setOpen] = useState(false);
  const [baseTime, setBaseTime] = useState(dayjs().tz("Asia/Manila"));
  const [currentHour, setCurrentHour] = useState(
    baseTime.add(21, "minute").hour() % 12
  );
  const [currentMinute, setCurrentMinute] = useState(
    baseTime.add(21, "minute").minute()
  );
  const [AMPM, setAMPM] = useState<"AM" | "PM">(
    baseTime.format("A") as "AM" | "PM"
  );
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {" "}
      <DialogTrigger
        asChild
        disabled={form.watch("order_type") !== "PickUpLater"}
      >
        <Button
          variant="outline"
          className={`w-full h-full ${
            form.watch("scheduled") && "border-gold"
          }`}
        >
          {form.watch("scheduled")
            ? dayjs(form.getValues("scheduled") as Date)
                .tz("Asia/Manila")
                .format("h:mm A")
            : "Schedule"}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[300px] rounded-md">
        <DialogHeader>
          <DialogTitle>Schedule Pick Up</DialogTitle>
          <DialogDescription>
            Earliest time to pickup is{" "}
            {baseTime.add(21, "minute").format("h:mm A")}
          </DialogDescription>
        </DialogHeader>
        <TimePicker
          baseTime={baseTime}
          currentHour={currentHour}
          currentMinute={currentMinute}
          AMPM={AMPM}
          setBaseTime={setBaseTime}
          setCurrentHour={setCurrentHour}
          setCurrentMinute={setCurrentMinute}
          setAMPM={setAMPM}
        />
        <DialogFooter>
          <Button
            onClick={() => {
              const inputTime = dayjs(
                `${
                  dayjs()
                    .tz("Asia/Manila")
                    .format("YYYY-MM-DD HH:mm:ss")
                    .split(" ")[0]
                } ${currentHour}:${currentMinute} ${AMPM}`
              ).tz("Asia/Manila");

              if (inputTime > baseTime.add(20, "minute")) {
                form.setValue("scheduled", inputTime.toDate());
                setOpen(false);
              } else {
                toast.warning(
                  "Schedule time Must be at least 20 minutes from now."
                );
              }
            }}
            type="submit"
            className="xs"
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
