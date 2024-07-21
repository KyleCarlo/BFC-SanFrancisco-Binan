import { Order, OrderStatus } from "@models/Order";
import { Button } from "@components/ui/button";
import updateOrderStatus from "@hooks/updateOrderStatus";
import updateOrderEnd from "@hooks/updateOrderEnd";

export default function OrderActions({
  status,
  order,
}: {
  status: OrderStatus;
  order: Order;
}) {
  if (status === "Incoming")
    return (
      <div className="flex flex-col gap-2">
        <Button
          className="bg-green-300"
          onClick={() => {
            updateOrderStatus(order.id as string, "Processing");
          }}
        >
          <span className="font-semibold tracking-wide text-green-950">
            Accept
          </span>
        </Button>
        <Button variant="destructive">Reject</Button>
      </div>
    );

  if (status === "Processing")
    return (
      <Button
        className="bg-green-300"
        onClick={() => {
          updateOrderStatus(order.id as string, "Complete");
        }}
      >
        <span className="font-semibold tracking-wide text-green-950">
          Complete
        </span>
      </Button>
    );

  if (status === "Complete")
    return (
      <div className="flex flex-col gap-2">
        <Button
          className="bg-green-300"
          onClick={() => {
            alert("clicked");
            updateOrderEnd(order as Order, "Received");
          }}
        >
          <span className="font-semibold tracking-wide text-green-950">
            Received
          </span>
        </Button>
        <Button
          variant="destructive"
          onClick={() => {
            alert("clicked");
            updateOrderEnd(order as Order, "Rejected");
          }}
        >
          Reject
        </Button>
      </div>
    );
}
