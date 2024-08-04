"use client";

import { createContext, useContext, Dispatch, SetStateAction } from "react";
import { useState, useEffect, ReactNode } from "react";
import { Food } from "@models/Menu/Food";
import { Beverage } from "@models/Menu/Beverage";
import { ItemType } from "@models/Menu";

export const ItemInventoryContext = createContext<{
  itemInventory: Array<Food | Beverage>;
  setItemInventory: Dispatch<SetStateAction<Array<Food | Beverage>>>;
} | null>(null);

export function useItemInventoryContext() {
  const itemInventory = useContext(ItemInventoryContext);

  if (!itemInventory) {
    throw new Error(
      "useItemInventoryContext must be used within ItemInventoryProvider"
    );
  }

  return itemInventory;
}

export function ItemInventoryProvider({
  children,
  itemInventory,
  setItemInventory,
}: {
  children: ReactNode;
  itemInventory: Array<Food | Beverage>;
  setItemInventory: Dispatch<SetStateAction<Array<Food | Beverage>>>;
}) {
  return (
    <ItemInventoryContext.Provider value={{ itemInventory, setItemInventory }}>
      {children}
    </ItemInventoryContext.Provider>
  );
}
