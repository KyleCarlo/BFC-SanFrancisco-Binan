"use client";

import { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RouteHandler({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [prevPath, setPrevPath] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (prevPath.slice(0, 7) === "/order/" && pathname === "/order") {
      router.push("/");
    }
    setPrevPath(pathname);
  }, [pathname]);

  return <>{children}</>;
}
