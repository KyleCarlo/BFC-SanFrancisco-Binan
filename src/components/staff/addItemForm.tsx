import { ItemType } from "@models/ItemType";

export default function AddItemForm({ itemType }: { itemType: ItemType }) {
  if (itemType == ItemType.Food) {
    return <div>food</div>;
  } else if (itemType == ItemType.Beverage) {
    return <div>beverage</div>;
  }
}
