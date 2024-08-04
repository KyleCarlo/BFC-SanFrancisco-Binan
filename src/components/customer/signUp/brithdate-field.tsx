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
import { Input } from "@components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@components/ui/select";
import { toast } from "sonner";

import { Button } from "@components/ui/button";
import { useState } from "react";
import dayjs from "@lib/dayjs";

import { UseFormReturn } from "react-hook-form";
import { SignUp } from "@models/User";

export default function BirthdateField({
  form,
}: {
  form: UseFormReturn<SignUp>;
}) {
  const inputDate = form.getValues("birthday");
  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState<number | null>(
    inputDate ? dayjs(inputDate).month() : null
  );
  const [day, setDay] = useState<number | null>(
    inputDate ? dayjs(inputDate).day() : null
  );
  const [year, setYear] = useState<number | null>(
    inputDate ? dayjs(inputDate).year() : null
  );
  const currDate = dayjs().tz("Asia/Manila");
  const dayLimit = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const monthList = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="h-[44px]">
        <DialogTrigger asChild>
          <Button variant="outline" type="button" className="w-full flex">
            {form.watch("birthday")
              ? dayjs(form.getValues("birthday")).format("MMMM D, YYYY")
              : "Birthdate"}
          </Button>
        </DialogTrigger>
      </div>
      <DialogContent className="max-w-[300px] rounded-md">
        <DialogHeader>
          <DialogTitle>Birthdate</DialogTitle>
          <DialogDescription>Enter your Birthdate.</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-[95px_65px_85px] gap-1">
          <Select
            onValueChange={(value) => {
              setMonth(parseInt(value));
            }}
          >
            <SelectTrigger
              className={`h-9 ${month === null && "text-muted-foreground"}`}
            >
              <SelectValue
                placeholder={
                  month === null ? "Month" : monthList[month].slice(0, 3)
                }
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup className="h-[200px]">
                {monthList.map((month, index) => {
                  return (
                    <SelectItem key={index} value={index.toString()}>
                      {month.slice(0, 3)}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Input
            placeholder="Day"
            className="w-full appearance-none"
            type="number"
            value={day as number}
            onChange={(e) => {
              if (e.target.value == "") {
                setDay(null);
                return;
              }
              const value = parseInt(e.target.value);
              if (value > 0 && value <= 31) {
                setDay(value);
              }
            }}
          />
          <Input
            placeholder="Year"
            className="w-full appearance-none"
            type="number"
            value={year as number}
            onChange={(e) => {
              if (e.target.value == "") {
                setYear(null);
                return;
              }
              const value = parseInt(e.target.value);
              if (value > 0 && value <= currDate.year()) {
                setYear(value);
              }
            }}
          />
        </div>
        <DialogFooter>
          <Button
            onClick={() => {
              if (
                month == null ||
                day == null ||
                year == null ||
                year > currDate.year() ||
                year < 1900
              ) {
                toast.warning("Invalid Birth Date.");
                return;
              }
              let max_day = dayLimit[month];
              if (dayjs(`${year}`).isLeapYear() && month === 1) {
                max_day = 29;
              }
              if (day > max_day) {
                toast.warning("Invalid Birth Date.");
                return;
              }
              form.setValue(
                "birthday",
                dayjs(`${year}-${month + 1}-${day}`)
                  .tz("Asia/Manila")
                  .toDate()
              );
              setOpen(false);
            }}
            type="button"
            className="xs"
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
