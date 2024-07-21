import { OrderStatus } from "@models/Order";
import { Button } from "@components/ui/button";
import updateOrderStatus from "@hooks/updateOrderStatus";

export default function OrderActions({
  id,
  status,
}: {
  id: string;
  status: OrderStatus;
}) {
  if (status === "Incoming")
    return (
      <div className="flex flex-col gap-2">
        <Button
          className="bg-green-300"
          onClick={() => {
            updateOrderStatus(id, "Processing");
          }}
        >
          <span className="font-semibold tracking-wide text-green-950">
            Accept
          </span>
        </Button>
        <Button variant="destructive">Reject</Button>
      </div>
    );
}
