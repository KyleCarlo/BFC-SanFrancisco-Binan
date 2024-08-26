import { Button } from "@components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";
import {
  SquareParking,
  MoveDown,
  MoveUp,
  CornerLeftDown,
  CornerUpLeft,
  MoveLeft,
} from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { Order } from "@models/Order";
import { ParkingLocation } from "@models/Order";
import Image from "next/image";

export default function ParkingField({
  form,
  disableButtons = false,
  location,
}: {
  form?: UseFormReturn<Order>;
  disableButtons?: boolean;
  location?: ParkingLocation;
}) {
  const parkLoc = form
    ? form.watch("receiver_details.parking_location")
    : location;
  return (
    <Dialog>
      <DialogTrigger asChild>
        {form?.watch("receiver_details.parking_location") !== undefined ? (
          <Button variant="outline" className="w-full mt-1 mb-2">
            Parking Location ✅
          </Button>
        ) : (
          <Button variant="outline" className="w-full mt-1 mb-2 h-14">
            Click Here to Select Your <br /> Parking Location
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="w-4/5 max-w-md rounded-lg">
        <DialogHeader>
          <DialogTitle>{!form && "Customer"} Parking Location</DialogTitle>
          <DialogDescription className="relative">
            {form && (
              <span className="underline decoration-red-300 underline-offset-4">
                Select the <SquareParking className="inline text-[--gold]" />{" "}
                below to your corresponding parking location.
              </span>
            )}
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-[40px_1fr_20px_1fr_40px] grid-rows-[50px_1fr_1fr_20px_1fr_10px_25px] border-b border-white">
          {/* TITUS BUILDING */}
          <div className="border border-white col-start-2 col-span-3 row-start-1 row-span-2 flex justify-end items-end">
            <div className="border-white border w-1/3 h-2/3 m-2 rounded-lg flex flex-col justify-center items-center">
              <Image height={15} width={15} alt="BFC" src="/bfc-logo.png" />
              <Image height={20} width={100} alt="" src="/bfc-name.png" />
            </div>
          </div>
          {/* RIGHT SIDE PARKING */}
          <div
            className={`border border-white row-start-1 row-span-2 ${
              !disableButtons && "cursor-pointer"
            } flex items-center justify-center p-1 col-start-5 ${
              parkLoc === "r" || location === "r" ? "bg-[--gold]" : ""
            }`}
            onClick={() => {
              if (!disableButtons && form)
                form.setValue("receiver_details.parking_location", "r");
            }}
          >
            <SquareParking
              className={`${
                parkLoc === "r" || location === "r" ? "text-black" : ""
              }`}
            />
          </div>
          {/* LOWER LEFT */}
          <div
            className={`border border-white row-start-3 ${
              !disableButtons && "cursor-pointer"
            } flex justify-center p-1 col-start-2 ${
              parkLoc === "ll" || location === "ll" ? "bg-[--gold]" : ""
            }`}
            onClick={() => {
              if (!disableButtons && form)
                form.setValue("receiver_details.parking_location", "ll");
            }}
          >
            <SquareParking
              className={`${
                parkLoc === "ll" || location === "ll" ? "text-black" : ""
              }`}
            />
          </div>
          {/* LOWER MID */}
          <div className="row-start-3 border-white bg-[--gray] col-start-3" />
          {/* LOWER RIGHT */}
          <div
            className={`border border-white row-start-3 col-start-4 ${
              !disableButtons && "cursor-pointer"
            } flex justify-center p-1 ${
              parkLoc === "lr" || location === "lr" ? "bg-[--gold]" : ""
            }`}
            onClick={() => {
              if (!disableButtons && form)
                form.setValue("receiver_details.parking_location", "lr");
            }}
          >
            <SquareParking
              className={`${
                parkLoc === "lr" || location === "lr" ? "text-black" : ""
              }`}
            />
          </div>
          <div className="col-start-1 row-start-4 flex justify-center items-center">
            <CornerLeftDown className="relative top-2 left-1 text-green-400" />
          </div>
          <div className="col-start-2 row-start-4 flex justify-center items-center min-w-min">
            <MoveLeft className="text-green-400" />
          </div>
          <div className="col-start-3 row-start-4 flex justify-center items-center min-w-min">
            <MoveLeft className="text-green-400" />
          </div>
          <div className="col-start-4 row-start-4 flex justify-center items-center min-w-min">
            <MoveLeft className="text-green-400" />
          </div>
          <div className="col-start-5 row-start-4 flex justify-center items-center">
            <CornerUpLeft className="relative top-1 right-2 text-green-400" />
          </div>
          {/* EXIT */}
          <p className="row-start-5 col-start-1 text-xs flex justify-center items-center border rounded-md">
            Exit
          </p>
          {/* LOWER LEFT2 */}
          <div
            className={`border border-white row-start-5 ${
              !disableButtons && "cursor-pointer"
            } flex justify-center p-1 col-start-2 ${
              parkLoc === "ll2" ? "bg-[--gold]" : ""
            }`}
            onClick={() => {
              if (!disableButtons && form)
                form.setValue("receiver_details.parking_location", "ll2");
            }}
          >
            <SquareParking
              className={`${parkLoc === "ll2" ? "text-black" : ""}`}
            />
          </div>
          {/* LOWER MID2 */}
          <div className="row-start-5 bg-[--gray] col-start-3 border-white" />
          {/* LOWER RIGHT2 */}
          <div
            className={`border border-white row-start-5 col-start-4 ${
              !disableButtons && "cursor-pointer"
            } flex justify-center p-1 ${
              parkLoc === "lr2" || location === "lr2" ? "bg-[--gold]" : ""
            }`}
            onClick={() => {
              if (!disableButtons && form)
                form.setValue("receiver_details.parking_location", "lr2");
            }}
          >
            <SquareParking
              className={`${
                parkLoc === "lr2" || location === "lr2" ? "text-black" : ""
              }`}
            />
          </div>
          {/* ENTRANCE */}
          <p className="row-start-5 col-start-5 text-xs flex justify-center items-center border rounded-md">
            Entr
          </p>
          <div className="row-start-7 col-start-1 flex justify-center items-center">
            <MoveDown className="relative bottom-3 text-green-400" />
          </div>
          {/* ROAD */}
          <div className="col-start-2 row-start-7 col-span-3 border-t border-white relative overflow-hidden">
            <p className="absolute bottom-0 opacity-50 tracking-[10px] text-nowrap">
              - - - - - - - - - - - - -
            </p>
            <p className="text-center">San Francisco Rd.</p>
          </div>
          <div className="row-start-7 col-start-5 flex justify-center items-center">
            <MoveUp className="relative bottom-3 text-green-400" />
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
