import { ItemType } from "../models/Menu";
import { createContext, useContext, Dispatch, SetStateAction } from "react";

export const ItemTypeContext = createContext<{
  itemType: ItemType;
  setItemType: Dispatch<SetStateAction<ItemType>>;
} | null>(null);

export function useItemTypeContext() {
  const itemType = useContext(ItemTypeContext);

  if (!itemType) {
    throw new Error("useItemTypeContext must be used within ItemTypeProvider");
  }

  return itemType;
}
