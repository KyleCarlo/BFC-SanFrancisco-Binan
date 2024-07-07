"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { ItemType, ItemTypeModel } from "@models/Menu";
import { useItemTypeContext } from "@context/itemType";

export default function SelectItemType() {
  const { itemType, setItemType } = useItemTypeContext();
  return (
    <Select
      defaultValue={itemType}
      onValueChange={(selected: ItemType) => {
        setItemType(selected);
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {Object.keys(ItemTypeModel.Values).map((item) => (
            <SelectItem key={item} value={item}>
              {item[0].toUpperCase() + item.slice(1)}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
