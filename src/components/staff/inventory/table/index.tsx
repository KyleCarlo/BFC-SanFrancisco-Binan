import InventoryTable from "@components/ui/data-table";
import beverageColumns from "./beverage-columns";
import foodColumns from "./food-columns";
import { Food } from "@models/Menu/Food";
import { Beverage } from "@models/Menu/Beverage";

export function FoodTable({
  items,
  search,
}: {
  items: Food[];
  search: string | null;
}) {
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(search || "")
  );
  return <InventoryTable columns={foodColumns} data={filteredItems} />;
}

export function BeverageTable({
  items,
  search,
}: {
  items: Beverage[];
  search: string | null;
}) {
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(search || "")
  );
  return <InventoryTable columns={beverageColumns} data={filteredItems} />;
}
