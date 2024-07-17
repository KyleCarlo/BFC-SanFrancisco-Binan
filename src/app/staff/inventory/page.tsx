"use client";

import { FoodTable, BeverageTable } from "@components/staff/inventory/table";
import SelectItemType from "@components/staff/inventory/select-itemType";
import { Input } from "@components/ui/input";
import AddItemDialog from "@components/staff/inventory/addItem-dialog";

import { ItemType } from "@models/Menu";
import { useState, useEffect } from "react";
import { Food } from "@models/Menu/Food";
import { Beverage } from "@models/Menu/Beverage";
import { getMenuItems } from "@hooks/getMenuItems";
import { ItemTypeContext } from "@context/itemType";

export default function InventoryPage() {
  const [itemType, setItemType] = useState<ItemType>("beverage");
  const [items, setItems] = useState<Food[] | Beverage[] | []>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getMenuItems(itemType, setLoading, setItems);
  }, [itemType]);

  return (
    <main className="flex flex-col justify-center items-center">
      <ItemTypeContext.Provider value={{ itemType, setItemType }}>
        <div className="flex items-center gap-4 p-4">
          <AddItemDialog />
          <Input placeholder="Search for Item Name" />
          <SelectItemType />
        </div>
        <div className="w-full px-4">
          {loading && <p>Loading...</p>}
          {!loading && itemType === "food" && (
            <FoodTable items={items as Food[]} />
          )}
          {!loading && itemType === "beverage" && (
            <BeverageTable items={items as Beverage[]} />
          )}
        </div>
      </ItemTypeContext.Provider>
    </main>
  );
}
