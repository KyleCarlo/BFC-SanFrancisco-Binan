import { SetStateAction } from "react";
import { ItemType } from "@models/Menu";
import { Food } from "@models/Menu/Food";
import { Beverage } from "@models/Menu/Beverage";

const getMenuItems = async (
  itemType: ItemType,
  setLoading: React.Dispatch<SetStateAction<boolean>>,
  setItems: React.Dispatch<SetStateAction<[] | Food[] | Beverage[]>>
) => {
  setLoading(true);
  try {
    const response = await fetch(
      `http://localhost:3000/api/menu?itemType=${itemType}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const { items } = await response.json();
    setItems(items);
    setLoading(false);
  } catch (error) {
    setItems([]);
    setLoading(false);
    alert(error);
    // implement a toast notification here
  }
};

export default getMenuItems;
