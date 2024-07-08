"use client";

import { ItemType } from "@models/Menu";
import {
  useState,
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";

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

export function ItemTypeProvider({
  children,
  defaultItemType,
}: {
  children: React.ReactNode;
  defaultItemType?: ItemType;
}) {
  const [itemType, setItemType] = useState<ItemType>(
    defaultItemType ?? "beverage"
  );

  return (
    <ItemTypeContext.Provider value={{ itemType, setItemType }}>
      {children}
    </ItemTypeContext.Provider>
  );
}
