import { ColumnDef } from "@tanstack/react-table";
import { Food, FoodVariation } from "@models/Menu/Food";
import Availibility from "./availability-switch";

const foodColumns: ColumnDef<Food>[] = [
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
                className="whitespace-nowrap flex h-8 items-center"
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
                className="whitespace-nowrap flex h-8 items-center"
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
