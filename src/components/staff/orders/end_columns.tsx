import { ColumnDef } from "@tanstack/react-table";
import { Order } from "@models/Order";
import dayjs from "@lib/dayjs";
import IDDialog from "./table_components/id";
import ProofOfPayment from "./table_components/pop";
import { Badge } from "@components/ui/badge";
import ItemsDialog from "./table_components/orderItems";

const endColumns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header: "Receiver",
    cell: ({ row }) => {
      return (
        <IDDialog
          id={row.original.id as string}
          receiver={row.original.receiver_details}
        />
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Order Time",
    cell: ({ row }) => {
      const date = dayjs(row.original.created_at).format("MM-DD hh:mm A");
      return <span>{date}</span>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const colors = {
        Incoming: "text-gold",
        Processing: "text-blue-500",
        Complete: "text-green-400",
        Received: "text-green-400",
        Rejected: "text-red-600",
      };

      if (
        row.original.status === "Rejected" ||
        row.original.status === "Received"
      ) {
        return (
          <Badge
            variant={
              row.original.status === "Rejected" ? "destructive" : "default"
            }
            className={`${
              row.original.status === "Received" && "bg-green-400"
            }`}
          >
            {row.original.status}
          </Badge>
        );
      }
      return (
        <span className={`${colors[row.original.status]}`}>
          {row.original.status}
        </span>
      );
    },
  },
  {
    accessorKey: "order_type",
    header: "Type",
  },
  {
    accessorKey: "items",
    header: "Items",
    cell: ({ row }) => {
      const items = row.original.items;
      return <ItemsDialog items={items} />;
    },
  },
  {
    accessorKey: "scheduled",
    header: "PickUp Sched",
    cell: ({ row }) => {
      if (row.original.order_type === "PickUpLater") {
        const date = dayjs(row.original.scheduled).format("MM-DD hh:mm A");
        return <span className="text-gold">{date}</span>;
      } else {
        return <span>-</span>;
      }
    },
  },
  {
    accessorKey: "total_price",
    header: "Total",
    cell: ({ row }) => {
      return <span>₱{row.original.total_price}</span>;
    },
  },
  {
    accessorKey: "mop",
    header: "MOP",
    cell: ({ row }) => {
      return <span>{row.original.mop}</span>;
    },
  },
  {
    accessorKey: "payment_pic",
    header: "POP",
    cell: ({ row }) => {
      if (row.original.mop === "Cash") {
        return <span>-</span>;
      } else {
        return <ProofOfPayment image={row.original.payment_pic as string} />;
      }
    },
  },
  {
    accessorKey: "total_num",
    header: "Count",
  },
  {
    accessorKey: "received_at",
    header: "Received Time",
    cell: ({ row }) => {
      if (
        row.original.status === "Received" ||
        row.original.status === "Rejected"
      ) {
        if (row.original.received_at) {
          const date = dayjs(row.original.received_at)
            .tz("Asia/Manila")
            .format("MM-DD hh:mm A");
          return <span>{date}</span>;
        }
      }
    },
  },
];

export default endColumns;
