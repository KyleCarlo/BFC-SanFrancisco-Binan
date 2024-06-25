"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Food, FoodVariation } from "@models/Menu/Food";
import { Switch } from "@components/ui/switch";
import { useState } from "react";

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
    accessorKey: "variations",
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
    header: "Available",
    cell: function Cell({ row }) {
      const variations: FoodVariation[] = row.getValue("variations");
      const [svariations, setSVariation] = useState(variations);

      return (
        <div>
          {svariations.map((variation, index) => {
            return (
              <div key={index} className="flex h-8 items-center justify-center">
                <Switch
                  checked={variation.available}
                  onCheckedChange={() => {
                    const newVariations = svariations.map((v, i) => {
                      if (i === index) {
                        return {
                          ...v,
                          available: !v.available,
                        };
                      }
                      return v;
                    });
                    setSVariation(newVariations);
                  }}
                />
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
