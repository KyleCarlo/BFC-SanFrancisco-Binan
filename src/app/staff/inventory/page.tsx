"use client";

import { FoodTable, BeverageTable } from "@components/staff/inventory/table";
import SelectItemType from "@components/staff/inventory/select-table";
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";

import { ItemType } from "@models/Menu";
import { useState, useEffect } from "react";
import { Food } from "@models/Menu/Food";
import { Beverage } from "@models/Menu/Beverage";

import getMenuItems from "@hooks/getMenuItems";

export default function InventoryPage() {
  const [itemType, setItemType] = useState<ItemType>("beverage");
  const [items, setItems] = useState<Food[] | Beverage[] | []>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getMenuItems(itemType, setLoading, setItems);
  }, [itemType]);

  return (
    <main className="flex flex-col justify-center items-center">
      <div className="flex items-center gap-4 p-4">
        <Button variant="outline" size="lg" className="text-gold">
          Add Item
        </Button>
        <Input placeholder="Search for Item Name" />
        <SelectItemType current_selected={itemType} setItemType={setItemType} />
      </div>
      {/* {loading && <p>Loading...</p>} */}
      {!loading && itemType === "food" && <FoodTable items={items as Food[]} />}
      {!loading && itemType === "beverage" && (
        <BeverageTable items={items as Beverage[]} />
      )}
    </main>
  );
}
