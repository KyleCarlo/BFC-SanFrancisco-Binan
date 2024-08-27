import { type OrderType } from "@models/Order";
import { Badge } from "@components/ui/badge";
import { Car, Clock3, Coffee, Utensils } from "lucide-react";

export default function OrderTypeComponent({ type }: { type: OrderType }) {
  const colors = {
    DineIn: "bg-blue-400",
    ParkNGo: "bg-red-400",
    PickUpNow: "bg-[--gold]",
    PickUpLater: "bg-blue-400",
  };
  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      <Badge className={colors[type]}>{type}</Badge>
      {type === "DineIn" && <Utensils className="text-green-400" />}
      {type === "ParkNGo" && <Car className="text-red-400" />}
      {type === "PickUpNow" && (
        <div>
          <Coffee className="text-[--gold]" />
        </div>
      )}
      {type === "PickUpLater" && <Clock3 className="text-blue-400" />}
    </div>
  );
}
