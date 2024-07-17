"use client";

import { ColumnDef } from "@tanstack/react-table";
import Availability from "./availability-switch";
import { Trash2 } from "lucide-react";
import { Checkbox } from "@components/ui/checkbox";
import { MOP } from "@models/MOP";
import { toast } from "sonner";
import onDelete from "@hooks/deleteMOP";
import EditMOPDialog from "./editMOP-dialog";

const MOPColumns: ColumnDef<MOP>[] = [
  {
    id: "actions",
    header: ({ table }) => {
      return (
        <div className="flex justify-center">
          <Trash2
            className="text-gold hover:cursor-pointer"
            size={20}
            onClick={() => {
              const imageNames: string[] = [];
              const ids = table.getSelectedRowModel().rows.map((row) => {
                const image = row.original.qr_code
                  .split("/")
                  .pop()
                  ?.split("?")[0];
                imageNames.push(image as string);
                return row.original.id;
              });
              if (ids.length > 0) {
                onDelete(ids, imageNames);
              } else {
                toast.warning("Please select a row to delete.");
              }
            }}
          />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <Checkbox
          className="relative top-0.5 right-1"
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            row.toggleSelected(!!value);
          }}
        />
      );
    },
  },
  {
    accessorKey: "bank_name",
    header: "Bank Name",
  },
  {
    accessorKey: "available",
    header: "Available",
    cell: ({ row }) => {
      return <Availability MOP={row.original} />;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <EditMOPDialog row={row} />;
    },
  },
];

export default MOPColumns;
