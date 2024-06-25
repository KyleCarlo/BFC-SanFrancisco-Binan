import InventoryTable from "@components/staff/inventory/data-table";
import beverageColumns from "@components/staff/inventory/beverage-columns";
import foodColumns from "@components/staff/inventory/food-columns";
import { ItemType } from "@models/Menu";
import SelectItemType from "@components/staff/select-table";
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";

async function getMenuItems(itemType: ItemType) {
  const response = await fetch(
    `http://localhost:3000/api/menu?itemType=${itemType}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );
  const { items } = await response.json();
  return items;
}

export default async function InventoryPage() {
  const items = await getMenuItems("food");
  return (
    <main className="flex flex-col justify-center items-center">
      <div className="flex items-center gap-4 p-4">
        <Button variant="outline" size="lg" className="text-gold">
          Add Item
        </Button>
        <Input placeholder="Search for Item Name" />
        <SelectItemType current_selected="food" />
      </div>
      <InventoryTable columns={foodColumns} data={items} />
    </main>
  );
}
