import { ColumnDef } from "@tanstack/react-table";
import { Beverage, BeverageVariation } from "@models/Menu/Beverage";
import { Checkbox } from "@components/ui/checkbox";
import { MdDelete } from "react-icons/md";
import Availibility from "./availability-switch";
import onDelete from "@hooks/deleteMenuItems";
import { toast } from "sonner";

const beverageColumns: ColumnDef<Beverage>[] = [
  {
    id: "actions",
    header: ({ table }) => {
      return (
        <div className="flex justify-center">
          <MdDelete
            className="text-gold hover:cursor-pointer"
            size={20}
            onClick={() => {
              const variation_ids: number[] = [];
              const ids = table.getSelectedRowModel().rows.map((row) => {
                row.original.variations.map((variation) => {
                  variation_ids.push(variation.id);
                });
                return row.original.id;
              });
              if (ids.length > 0) {
                onDelete(ids, variation_ids, "beverage");
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
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "base",
    header: "Base",
  },
  {
    accessorKey: "feature",
    header: "Feature",
  },
  {
    accessorKey: "variations",
    header: "Serving",
    cell: ({ row }) => {
      const variations: BeverageVariation[] = row.getValue("variations");
      return (
        <div>
          {variations.map((variation, index) => {
            return (
              <div
                key={index}
                className="whitespace-nowrap flex h-8 items-center justify-center"
              >
                {variation.serving}
              </div>
            );
          })}
        </div>
      );
    },
  },
  {
    accessorKey: "variations_2",
    header: "Price",
    cell: ({ row }) => {
      const variations: BeverageVariation[] = row.getValue("variations");

      return (
        <div>
          {variations.map((variation, index) => {
            return (
              <div
                key={index}
                className="whitespace-nowrap flex h-8 items-center justify-center"
              >
                ₱{variation.price}
              </div>
            );
          })}
        </div>
      );
    },
  },
  {
    accessorKey: "variations_3",
    header: "Type",
    cell: ({ row }) => {
      const variations: BeverageVariation[] = row.getValue("variations");
      return (
        <div>
          {variations.map((variation, index) => {
            if (variation.concentrate) {
              return (
                <div
                  key={index}
                  className="whitespace-nowrap flex h-8 items-center justify-center"
                >
                  Concentrate
                </div>
              );
            }
            return (
              <div
                key={index}
                className="whitespace-nowrap flex h-8 items-center justify-center"
              >
                {variation.hot_cold}
              </div>
            );
          })}
        </div>
      );
    },
  },
  {
    id: "actions",
    accessorKey: "variations_4",
    header: "Available",
    cell: function Cell({ row }) {
      const variations: BeverageVariation[] = row.getValue("variations");

      return (
        <div>
          {variations.map((variation, index) => {
            return (
              <div key={index} className="flex h-8 items-center justify-center">
                <Availibility variation={variation} itemType="beverage" />
              </div>
            );
          })}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: () => {
      return (
        <div>
          <button className="border-2 border-gold rounded-xl text-gold px-4 py-2">
            Edit
          </button>
        </div>
      );
    },
  },
];

export default beverageColumns;
