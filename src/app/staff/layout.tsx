"use client";
import { ReactNode } from "react";
import NavBar from "@components/staff/navigation";
import { OrderCountProvider } from "@context/orderCount";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import socket from "@lib/socket";

export default function StaffLayout({ children }: { children: ReactNode }) {
  const path = usePathname();
  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  if (path === "/staff/sign-in") {
    return <>{children}</>;
  }

  return (
    <div className="grid grid-cols-[minmax(40px,_4%)_1fr]">
      <OrderCountProvider>
        <NavBar />
        <main className="overflow-hidden">{children}</main>
      </OrderCountProvider>
    </div>
  );
}
