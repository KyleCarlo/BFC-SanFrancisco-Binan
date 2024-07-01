import { ColumnDef } from "@tanstack/react-table";
import { Food, FoodVariation } from "@models/Menu/Food";
import Availibility from "./availability-switch";
import { Checkbox } from "@components/ui/checkbox";
import { MdDelete } from "react-icons/md";
import onDelete from "@hooks/deleteMenuItems";
import { toast } from "sonner";

const foodColumns: ColumnDef<Food>[] = [
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
                onDelete(ids, variation_ids, "food");
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
    accessorKey: "feature",
    header: "Feature",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "variations",
    header: "Serving",
    cell: ({ row }) => {
      const variations: FoodVariation[] = row.getValue("variations");
      return (
        <div className="flex flex-col">
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
      const variations: FoodVariation[] = row.getValue("variations");

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
    id: "actions",
    accessorKey: "variations_3",
    header: "Available",
    cell: function Cell({ row }) {
      const variations: FoodVariation[] = row.getValue("variations");

      return (
        <div>
          {variations.map((variation, index) => {
            return (
              <div key={index} className="flex h-8 items-center justify-center">
                <Availibility variation={variation} itemType="food" />
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

export default foodColumns;
