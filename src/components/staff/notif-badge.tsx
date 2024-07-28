import { OrderStatus } from "@models/Order";
import { Badge } from "@components/ui/badge";

export default function NotifBadge({
  count,
  status,
}: {
  count: number;
  status: OrderStatus;
}) {
  const statusColors = {
    Incoming: "bg-[--gold] text-black hover:bg-white",
    Processing: "bg-blue-400 text-black hover:bg-white",
    Complete: "bg-green-400 text-black hover:bg-white",
    Received: "",
    Rejected: "",
  };
  return (
    <span className="text-white text-xs relative z-30">
      <Badge className={`p-0 ${statusColors[status]}`} variant="destructive">
        {count}
      </Badge>
    </span>
  );
}
