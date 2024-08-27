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
import { ItemInventoryProvider } from "@context/itemInventory";

export default function InventoryPage() {
  const [itemType, setItemType] = useState<ItemType>("beverage");
  const [items, setItems] = useState<Array<Food | Beverage>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string | null>(null);

  useEffect(() => {
    getMenuItems(itemType, setLoading, setItems);
  }, [itemType]);

  return (
    <main className="flex flex-col justify-center items-center">
      <ItemTypeContext.Provider value={{ itemType, setItemType }}>
        <ItemInventoryProvider
          itemInventory={items}
          setItemInventory={setItems}
        >
          <div className="flex items-center gap-4 p-4">
            <AddItemDialog />
            <Input
              placeholder="Search for Item Name"
              onChange={(e) => {
                const search = e.target.value;
                if (search === "") setSearch(null);
                else setSearch(search);
              }}
            />
            <SelectItemType />
          </div>
          <div className="w-full px-4">
            {loading && <p>Loading...</p>}
            {!loading && itemType === "food" && (
              <FoodTable items={items as Food[]} search={search} />
            )}
            {!loading && itemType === "beverage" && (
              <BeverageTable items={items as Beverage[]} search={search} />
            )}
          </div>
        </ItemInventoryProvider>
      </ItemTypeContext.Provider>
    </main>
  );
}
