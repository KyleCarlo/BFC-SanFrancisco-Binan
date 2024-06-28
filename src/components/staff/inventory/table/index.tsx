import InventoryTable from "./data-table";
import beverageColumns from "./beverage-columns";
import foodColumns from "./food-columns";
import { Food } from "@models/Menu/Food";
import { Beverage } from "@models/Menu/Beverage";

export function FoodTable({ items }: { items: Food[] }) {
  return <InventoryTable columns={foodColumns} data={items} />;
}

export function BeverageTable({ items }: { items: Beverage[] }) {
  return <InventoryTable columns={beverageColumns} data={items} />;
}
