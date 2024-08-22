"use client";

import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  ReactNode,
} from "react";

export const OrderFilterContext = createContext<{
  orderFilter: string | undefined;
  setOrderFilter: Dispatch<SetStateAction<string | undefined>>;
} | null>(null);

export const useOrderFilterContext = () => {
  const orderFilter = useContext(OrderFilterContext);

  if (!orderFilter) {
    throw new Error(
      "useOrderFilterContext must be used within OrderFilterProvider"
    );
  }

  return orderFilter;
};

export const OrderFilterProvider = ({ children }: { children: ReactNode }) => {
  const [orderFilter, setOrderFilter] = useState<string | undefined>();

  return (
    <OrderFilterContext.Provider value={{ orderFilter, setOrderFilter }}>
      {children}
    </OrderFilterContext.Provider>
  );
};
