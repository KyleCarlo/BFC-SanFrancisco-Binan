import { ReactNode } from "react";
import NavBar from "@components/staff/navigation";

export default function StaffLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-[50px_1fr]">
      <NavBar />
      <main>{children}</main>
    </div>
  );
}
