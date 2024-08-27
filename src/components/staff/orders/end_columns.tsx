import { ColumnDef } from "@tanstack/react-table";
import { Order, OrderType } from "@models/Order";
import dayjs from "@lib/dayjs";
import IDDialog from "./table_components/id";
import ProofOfPayment from "./table_components/pop";
import { Badge } from "@components/ui/badge";
import ItemsDialog from "./table_components/orderItems";
import OrderTypeComponent from "./table_components/orderType";
import DiscountDialog from "./table_components/discount-dialog";

const endColumns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header: "Receiver",
    cell: ({ row }) => {
      return (
        <IDDialog
          id={row.original.id as string}
          receiver={row.original.receiver_details}
          order_type={row.original.order_type as OrderType}
        />
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Order Time",
    cell: ({ row }) => {
      const date = dayjs(row.original.created_at).tz("Asia/Manila");
      return (
        <div className="flex flex-col gap-2">
          <p>{date.format("MMM DD")}</p>
          <p>{date.format("hh:mm A")}</p>
        </div>
      );
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
    cell: ({ row }) => {
      const type = row.original.order_type;
      return <OrderTypeComponent type={type as OrderType} />;
    },
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
        const date = dayjs(row.original.scheduled).tz("Asia/Manila");
        return (
          <div className="flex flex-col gap-2 border rounded-md p-2 border-blue-400">
            <p>{date.format("MMM DD")}</p>
            <p className="text-bold tracking-wider">{date.format("hh:mm A")}</p>
          </div>
        );
      } else {
        return <span>-</span>;
      }
    },
  },
  {
    accessorKey: "total_price",
    header: "Total",
    cell: ({ row }) => {
      return (
        <div className="flex flex-col gap-2 justify-center items-center">
          <span>₱{row.original.total_price.toFixed(2)}</span>
          {row.original.discount && (
            <DiscountDialog
              image={row.original.discount_id as string}
              discountType={row.original.discount}
            />
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "mop",
    header: "MOP",
    cell: ({ row }) => {
      const mop = row.original.mop;
      return (
        <>
          <p>
            {mop} {mop === "Cash" ? "💵" : ""}
          </p>
          {mop === "Cash" && (
            <p className="text-gold">
              Change for {row.original.payment_change}
            </p>
          )}
        </>
      );
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
          const date = dayjs(row.original.received_at).tz("Asia/Manila");
          return (
            <div className="flex flex-col gap-2">
              <p>{date.format("MMM DD")}</p>
              <p>{date.format("hh:mm A")}</p>
            </div>
          );
        }
      }
    },
  },
];

export default endColumns;
