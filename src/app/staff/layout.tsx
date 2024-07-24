"use client";
import { ReactNode } from "react";
import NavBar from "@components/staff/navigation";
import { usePathname } from "next/navigation";

export default function StaffLayout({ children }: { children: ReactNode }) {
  const path = usePathname();

  if (path === "/staff/sign-in") {
    return <>{children}</>;
  }

  return (
    <div className="grid grid-cols-[minmax(40px,_4%)_1fr]">
      <NavBar />
      <main className="overflow-hidden">{children}</main>
    </div>
  );
}
