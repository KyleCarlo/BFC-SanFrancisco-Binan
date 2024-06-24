"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Beverage, BeverageVariation } from "@models/Menu/Beverage";
import { Switch } from "@components/ui/switch";
import { useState } from "react";

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
              <div key={index} className="flex h-8 items-center">
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
      const variations: BeverageVariation[] = row.getValue("variations");

      return (
        <div>
          {variations.map((variation, index) => {
            return (
              <div key={index} className="flex h-8 items-center">
                ₱{variation.price}
              </div>
            );
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
              return (
                <div key={index} className="flex h-8 items-center">
                  Concentrate
                </div>
              );
            }
            return (
              <div key={index} className="flex h-8 items-center">
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
    header: "Available",
    cell: function Cell({ row }) {
      const variations: BeverageVariation[] = row.getValue("variations");
      const [svariations, setSVariation] = useState(variations);

      return (
        <div>
          {svariations.map((variation, index) => {
            return (
              <div key={index} className="flex h-8 items-center justify-center">
                <Switch
                  checked={variation.available}
                  onCheckedChange={() => {
                    variation.available = !variation.available;
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

export default beverageColumns;
