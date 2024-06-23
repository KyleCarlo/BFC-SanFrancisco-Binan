"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Food, FoodVariation } from "@models/Menu/Food";

const foodColumns: ColumnDef<Food>[] = [
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
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "variations",
    header: "Serving",
    cell: ({ row }) => {
      const variations: FoodVariation[] = row.getValue("variations");

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
      const variations: FoodVariation[] = row.getValue("variations");

      return (
        <div>
          {variations.map((variation, index) => {
            return <div key={index}>₱{variation.price}</div>;
          })}
        </div>
      );
    },
  },
];

export default foodColumns;
