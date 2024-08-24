import { ReactNode } from "react";
import NavBar from "@components/customer/navigation";

export default function AccountLayout({ children }: { children: ReactNode }) {
  return (
    <main>
      <NavBar />
      <div>{children}</div>
    </main>
  );
}
