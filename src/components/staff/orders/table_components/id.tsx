import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";
import { Button } from "@components/ui/button";
import { OrderReceiverDetails, OrderType } from "@models/Order";
import ParkingField from "@components/parking-field";

export default function IDDialog({
  id,
  receiver,
  order_type,
}: {
  id: string;
  receiver: OrderReceiverDetails;
  order_type: OrderType;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Show</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Customer Details</DialogTitle>
          <DialogDescription>
            Identification of the Customer who made this Order.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-[1fr_13px_4fr] gap-y-2 items-center">
          <p className="text-gold">Order ID</p>
          <p>|</p>
          <p>{id}</p>
          <p className="text-gold">Name</p>
          <p>|</p>
          <p>{receiver.name}</p>
          <p className="text-gold">Contact</p>
          <p>|</p>
          <p>{receiver.contact_number}</p>
          {receiver.vehicle_plate && (
            <>
              <p className="text-gold">Vehicle Plate</p>
              <p>|</p>
              <p>{receiver.vehicle_plate}</p>
            </>
          )}
          {receiver.vehicle_description && (
            <>
              <p className="text-gold">Vehicle Color</p>
              <p>|</p>
              <p>{receiver.vehicle_description}</p>
            </>
          )}
          {order_type === "ParkNGo" && (
            <div className="col-span-3">
              <ParkingField
                location={receiver.parking_location}
                disableButtons={true}
              />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
