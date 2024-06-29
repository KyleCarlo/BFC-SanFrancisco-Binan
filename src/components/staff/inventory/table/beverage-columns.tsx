import { ColumnDef } from "@tanstack/react-table";
import { Beverage, BeverageVariation } from "@models/Menu/Beverage";
import Availibility from "./availability-switch";

const beverageColumns: ColumnDef<Beverage>[] = [
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
