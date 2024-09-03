import { OrderType } from "@models/Order";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/ui/popover";
import { Utensils, Clock8, CircleParking, ShoppingBag } from "lucide-react";

export default function Services({ serviceType }: { serviceType: OrderType }) {
  const IconsDisplay = {
    DineIn: <Utensils className="size-8" />,
    PickUpNow: <ShoppingBag className="size-8" />,
    ParkNGo: <CircleParking className="size-8" />,
    PickUpLater: <Clock8 className="size-8" />,
  };
  const Title = {
    DineIn: "DINE IN",
    PickUpNow: "PICK UP NOW",
    ParkNGo: `PARK N${"'"} GO`,
    PickUpLater: "PICK UP LATER",
  };

  return (
    <div className="flex flex-col items-center gap-2 max-[560px]:scale-75">
      <div className="border-2 border-black rounded-full p-4 bg-black">
        {IconsDisplay[serviceType]}
      </div>
      <h1 className="text-black text-bold text-nowrap">{Title[serviceType]}</h1>
    </div>
  );
}
