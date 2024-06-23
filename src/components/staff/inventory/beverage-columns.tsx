"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Beverage, BeverageVariation } from "@models/Menu/Beverage";

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
      console.log(variations);
      return (
        <div>
          {variations.map((variation, index) => {
            return <div key={index}>{variation.serving}</div>;
          })}
        </div>
      );
    },
  },
  {
    accessorKey: "variations",
    header: "Price",
    cell: ({ row }) => {
      const variations: BeverageVariation[] = row.getValue("variations");

      return (
        <div>
          {variations.map((variation, index) => {
            return <div key={index}>₱{variation.price}</div>;
          })}
        </div>
      );
    },
  },
  {
    accessorKey: "variations",
    header: "Type",
    cell: ({ row }) => {
      const variations: BeverageVariation[] = row.getValue("variations");
      return (
        <div>
          {variations.map((variation, index) => {
            if (variation.concentrate) {
              return <div key={index}>Concentrate</div>;
            }
            return <div key={index}>{variation.hot_cold}</div>;
          })}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: () => {
      return (
        <button className="border-2 border-gold rounded-xl text-gold px-4 py-2">
          Edit
        </button>
      );
    },
  },
];

export default beverageColumns;
