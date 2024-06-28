import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { ItemType } from "@models/Menu";
import itemList from "@lib/itemList";

export default function SelectItemType({
  current_selected,
  setItemType,
}: {
  current_selected: ItemType;
  setItemType: React.Dispatch<React.SetStateAction<ItemType>>;
}) {
  return (
    <Select
      defaultValue={current_selected}
      onValueChange={(selected: ItemType) => {
        setItemType(selected);
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {itemList.map((item) => (
            <SelectItem key={item} value={item}>
              {item[0].toUpperCase() + item.slice(1)}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}