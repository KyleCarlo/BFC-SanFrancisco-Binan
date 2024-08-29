"use client";

import { UseFormReturn } from "react-hook-form";
import { CartItem, RoastType } from "@models/Cart";
import { useState, useEffect } from "react";
import CoffeeBean from "@components/bean";

export default function RoastField({
  form,
}: {
  form: UseFormReturn<CartItem | any | undefined>;
}) {
  const [roast, setRoast] = useState<RoastType>(form.getValues("roast"));
  useEffect(() => {
    form.setValue("roast", roast);
  }, [roast, form]);

  return (
    <div className="flex justify-evenly items-center -mt-2">
      <h1 className="text-bold text-xs text-nowrap pt-1 relative bottom-1">
        ROAST
      </h1>
      <div
        className={`flex flex-col items-center gap-1 cursor-pointer rounded-md p-2 w-[60px] transition-all border border-white border-opacity-0 hover:border-opacity-50 ${
          roast === "medium" && "border-opacity-100"
        }`}
        onClick={() => {
          setRoast("medium");
        }}
      >
        <CoffeeBean color="#986339" size={30} />
        <p className="text-xs">Medium</p>
      </div>
      <div
        className={`flex flex-col items-center gap-1 cursor-pointer rounded-md p-2 w-[60px] transition-all border border-white border-opacity-0 hover:border-opacity-50 ${
          roast === "dark" && "border-opacity-100"
        }`}
        onClick={() => {
          setRoast("dark");
        }}
      >
        <CoffeeBean color="#5B4642" size={30} />
        <p className="text-xs">Dark</p>
      </div>
    </div>
  );
}
