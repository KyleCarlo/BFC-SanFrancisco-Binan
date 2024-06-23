import InventoryTable from "@components/staff/inventory/data-table";
import beverageColumns from "@components/staff/inventory/beverage-columns";
import { ItemType } from "@models/Menu";

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
  const items = await getMenuItems("beverage");
  return (
    <main>
      <InventoryTable columns={beverageColumns} data={items} />
    </main>
  );
}
