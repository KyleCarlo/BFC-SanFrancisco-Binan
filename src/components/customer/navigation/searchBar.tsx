"use client";

import { Input } from "@components/ui/input";
import { useOrderFilterContext } from "@context/orderFilter";
import { usePathname } from "next/navigation";

export default function SearchBar() {
  const { setOrderFilter } = useOrderFilterContext();
  const pathname = usePathname();
  if (pathname === "/order")
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
  return null;
}
