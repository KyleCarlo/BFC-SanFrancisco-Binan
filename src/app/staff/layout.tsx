import { ReactNode } from "react";
import NavBar from "@components/staff/navigation";

export default function StaffLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-[minmax(40px,_4%)_1fr]">
      <NavBar />
      <main className="overflow-hidden">{children}</main>
    </div>
  );
}
