"use client";

import { Input } from "@components/ui/input";
import { useOrderFilterContext } from "@context/orderFilter";

export default function SearchBar() {
  const { setOrderFilter } = useOrderFilterContext();
  return (
    <Input
      placeholder="Search..."
      className="max-w-lg"
      onChange={(e) => {
        const value = e.target.value;
        if (value === "") {
          setOrderFilter(undefined);
          return;
        }
        setOrderFilter(value);
      }}
    />
  );
}
